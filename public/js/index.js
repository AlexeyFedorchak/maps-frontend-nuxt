// CSRF Token
// const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const MAP_BOX_TOKEN = 'pk.eyJ1IjoicGljdHVyZXRoZXN0YXJzIiwiYSI6ImNrdmh5aG1qazg3OWIybnM3cnFtb3N0eDkifQ.gogB_qXK_jblN5CJ_GBPPw';
// Mapbox GL JS Setup
mapboxgl.accessToken = MAP_BOX_TOKEN;
let map;

// const designsData = @json($designs);
const designsData = window.mapDesignsData || [];
const designsMap = new Map(designsData.map(d => [d.id, d]));

// DOM Elements
const locationStep = document.getElementById('locationStep');
const designStep = document.getElementById('designStep');
const chooseStep = document.getElementById('chooseStep');
const locationContent = document.getElementById('locationContent');
const designContent = document.getElementById('designContent');
const chooseContent = document.getElementById('chooseContent');
const locationSearch = document.getElementById('locationSearch');
const searchResults = document.getElementById('searchResults');
const designOptions = document.querySelectorAll('.design-option');
const layoutOptions = document.querySelectorAll('.layout-option');
const continueBtn = document.getElementById('continueBtn');
const downloadBtn = document.getElementById('downloadBtn');

function initializeInteractiveMap() {

    try {
        map = new mapboxgl.Map({
            container: 'interactiveMap',
            style: 'mapbox://styles/picturethestars/cla9hyw9400x615mgdh6maidi',
            center: [-0.128, 51.507],
            zoom: 11,
            interactive: true
        });

        map.on('load', () => {
            map.showCollisionBoxes = true;

            const initialLayoutOption = document.querySelector('.layout-option.selected');
            if (initialLayoutOption) {
                const initialShape = initialLayoutOption.getAttribute('data-shape');
                // updateMapFrame(initialShape);

                map.resize();

            }

            if (colorSelector && colorSelector.getSelectedStyle) {
                const initialStyle = colorSelector.getSelectedStyle();
                applyColorSchemeToMap(initialStyle);
            }

            hideAlLabels();
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('moveend', () => {
            const center = map.getCenter();
            const lat = center.lat.toFixed(3);
            const lng = Math.abs(center.lng).toFixed(3);
            const ns = center.lat >= 0 ? 'N' : 'S';
            const ew = center.lng >= 0 ? 'E' : 'W';
            const coordinatesText = `${lat}°${ns} ${lng}°${ew}`;

            document.querySelector('.map-coordinates').textContent = coordinatesText;

        });

        map.on('error', (e) => {
            console.error('❌ Map loading error:', e);
        });

    } catch (error) {
        console.error('❌ Failed to initialize map:', error);
    }
}

let currentStep = 1; // Start at Location step
let searchTimeout = null;

let currentLocation = {
    name: 'London, UK',
    coords: [-0.128, 51.507],
    zoom: 12
};

document.addEventListener('DOMContentLoaded', function() {

    locationSearch.addEventListener('input', handleLocationSearch);

    // Hide search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#locationContent')) {
            searchResults.style.display = 'none';
        }
    });

    const initialLayoutOption = document.querySelector('.layout-option.selected');
    if (initialLayoutOption) {
        const initialShape = initialLayoutOption.getAttribute('data-shape');
        // updateMapFrame(initialShape);
    }
});

function handleLocationSearch(e) {
    const query = e.target.value.trim();

    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }

    searchTimeout = setTimeout(() => {
        searchLocations(query);
    }, 300);
}

// Search locations
async function searchLocations(query) {
    try {
        const response = await fetch('/search-locations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken,
                'Accept': 'application/json'
            },
            body: JSON.stringify({ query: query })
        });

        const data = await response.json();
        if (data.success) {
            displaySearchResults(data.features);
        }
    } catch (error) {
        console.error('Error searching locations:', error);
    }
}

// Display search results
function displaySearchResults(features) {
    searchResults.innerHTML = '';

    if (features.length === 0) {
        searchResults.innerHTML = '<div style="padding: 12px 16px;">No results found</div>';
        searchResults.style.display = 'block';
        return;
    }

    features.forEach(feature => {
        const resultItem = document.createElement('div');
        resultItem.style.cssText = 'padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f0f0f0;';
        resultItem.addEventListener('mouseover', () => resultItem.style.backgroundColor = '#f8f8f8');
        resultItem.addEventListener('mouseout', () => resultItem.style.backgroundColor = 'white');

        const placeName = feature.place_name.split(',')[0];
        const fullName = feature.place_name;

        resultItem.innerHTML = `
                    <div style="font-weight: 500; color: #333; margin-bottom: 2px;">${placeName}</div>
                    <div style="font-size: 12px; color: #666;">${fullName}</div>
                `;

        resultItem.addEventListener('click', () => {
            selectLocation(placeName, feature.center);
        });

        searchResults.appendChild(resultItem);
    });

    searchResults.style.display = 'block';
}

// Select location
function selectLocation(name, coords) {
    currentLocation = {
        name: name,
        coords: coords,
        zoom: 12
    };

    locationSearch.value = name;
    searchResults.style.display = 'none';

    // Update map details
    document.querySelector('.map-title').textContent = name;
    const lat = coords[1].toFixed(3);
    const lng = Math.abs(coords[0]).toFixed(3);
    const ns = coords[1] >= 0 ? 'N' : 'S';
    const ew = coords[0] >= 0 ? 'E' : 'W';
    document.querySelector('.map-coordinates').textContent = `${lat}°${ns} ${lng}°${ew}`;

    if (map) {
        map.flyTo({
            center: coords,
            zoom: 12,
            duration: 2000
        });
    }
}

// Design Selection
designOptions.forEach(option => {
    option.addEventListener('click', function() {
        designOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');

        const designId = this.getAttribute('data-design-id');

        applyDesignToMap(designId);
        updateLayoutPreviews();
    });
});

function updateLayoutPreviews() {
    const selectedDesignDiv = document.querySelector('.design-option.selected');
    if (!selectedDesignDiv) return;

    const selectedDesignId = parseInt(selectedDesignDiv.getAttribute('data-design-id'), 10);
    const selectedDesignData = designsMap.get(selectedDesignId);

    if (!selectedDesignData || !selectedDesignData.compatible_layouts) return;

    const compatibleLayoutsData = selectedDesignData.compatible_layouts;
    const compatibleLayoutsMap = new Map(compatibleLayoutsData.map(l => [l.id, l.preview]));


    // 2. Iterate over all layout options to update their images
    layoutOptions.forEach(option => {
        const layoutId = parseInt(option.getAttribute('data-layout-id'), 10);
        const previewImage = option.querySelector('.layout-preview img');

        if (compatibleLayoutsMap.has(layoutId)) {
            // Update the preview image source if it exists
            if (previewImage) {
                previewImage.src = compatibleLayoutsMap.get(layoutId);
            }
        }
    });
}

//Layout Selection
layoutOptions.forEach(option => {
    option.addEventListener('click', function() {
        layoutOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');

        const shape = this.getAttribute('data-shape');
        const mapContainer = document.getElementById('interactiveMap');
        const mapFrame = document.querySelector('.map-frame');

        mapContainer.classList.remove('rectangle-layout', 'circle-layout', 'full-page-layout', 'horizontal-layout');
        mapFrame.classList.remove('rectangle-container', 'circle-container', 'full-page-container', 'horizontal-container');

        if (shape === 'circle') {
            mapContainer.classList.add('circle-layout');
            mapFrame.classList.add('circle-container');
        } else if (shape === 'tall') {
            mapContainer.classList.add('full-page-layout');
            mapFrame.classList.add('full-page-container');
        } else if (shape === 'horizontal') {
            mapContainer.classList.add('horizontal-layout');
            mapFrame.classList.add('horizontal-container');
        } else {
            mapContainer.classList.add('rectangle-layout');
            mapFrame.classList.add('rectangle-container');
        }

        if (map) {
            setTimeout(() => {
                map.resize();
            }, 300);
        }
    });
});

function updateMapLayout(shape) {
    const mapContainer = document.getElementById('interactiveMap');
    const mapDetails = document.querySelector('.map-details');

    const mapFrame = document.querySelector('.map-frame');
    mapFrame.className = 'map-frame'; // Скидаємо всі класи макетів
    mapFrame.classList.add(`${shape}-container`);

    if (shape === 'full-page') {
        mapDetails.style.display = 'none';
        mapContainer.style.height = '100%';
    } else {
        mapDetails.style.display = 'flex';
        mapContainer.style.height = 'calc(100% - 32px)';
    }

    if (map) {
        setTimeout(() => map.resize(), 50);
    }
}

// Helper functions
function getCurrentDesignId() {
    const selected = document.querySelector('.design-option.selected');
    return selected ? selected.getAttribute('data-design-id') : '1';
}

function getCurrentLayoutId() {
    const selected = document.querySelector('.layout-option.selected');
    return selected ? selected.getAttribute('data-layout-id') : '1';
}

// Continue to next step
function continueToNext() {
    if (currentStep === 1) {
        // Move to DESIGN step
        currentStep = 2;
        locationStep.classList.remove('active');
        locationStep.classList.add('completed');
        designStep.classList.add('active');

        locationContent.style.display = 'none';
        designContent.style.display = 'block';
        updateNavigation();
    } else if (currentStep === 2) {
        // Move to CHOOSE step
        currentStep = 3;
        designStep.classList.remove('active');
        designStep.classList.add('completed');
        chooseStep.classList.add('active');

        designContent.style.display = 'none';
        chooseContent.style.display = 'block';
        updateNavigation();
    } else {
        alert('Order completed!');
    }
}

// Go back to previous step
function goBack() {
    if (currentStep === 2) {
        // Move back to LOCATION step
        currentStep = 1;
        designStep.classList.remove('active');
        locationStep.classList.remove('completed');
        locationStep.classList.add('active');

        designContent.style.display = 'none';
        locationContent.style.display = 'block';
        updateNavigation();
    } else if (currentStep === 3) {
        // Move back to DESIGN step
        currentStep = 2;
        chooseStep.classList.remove('active');
        designStep.classList.remove('completed');
        designStep.classList.add('active');

        chooseContent.style.display = 'none';
        designContent.style.display = 'block';
        updateNavigation();
    }
}

// Update navigation buttons based on current step
function updateNavigation() {
    const navigation = document.querySelector('.navigation');

    if (currentStep === 1) {
        navigation.innerHTML = `
            <button class="btn-nav btn-continue border-radius-full uppercase" type="button" id="continueBtn">
                Choose Location
            </button>
        `;
    } else if (currentStep === 2) {
        navigation.innerHTML = `
            <button class="btn-nav btn-back border-radius-full uppercase" type="button" id="backBtn">
                Back
            </button>
            <button class="btn-nav btn-continue border-radius-full uppercase" type="button" id="continueBtn">
                Continue
            </button>
        `;
    } else {
        navigation.innerHTML = `
            <button class="btn-nav btn-back border-radius-full uppercase" type="button" id="backBtn">
                Back
            </button>
            <button class="btn-nav btn-continue border-radius-full uppercase" type="button" id="downloadBtn">
                Continue
            </button>
        `;
    }
}

// Download map as PDF
async function downloadMapPDF() {
    try {
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.textContent = 'DOWNLOADING...';
        downloadBtn.disabled = true;

        if (!map) {
            alert('Map not ready for download. Please wait for the map to load.');
            return;
        }

        const locationName = currentLocation.name || 'Unknown Location';
        const coordinates = currentLocation.coords || [0, 0];
        const lat = coordinates[1].toFixed(3);
        const lng = Math.abs(coordinates[0]).toFixed(3);
        const ns = coordinates[1] >= 0 ? 'N' : 'S';
        const ew = coordinates[0] >= 0 ? 'E' : 'W';
        const coordsText = `${lat}°${ns} ${lng}°${ew}`;


        const currentDesignName = document.querySelector('.design-option.selected .design-name')?.textContent || 'Modern';
        const currentColorName = colorSelector ? colorSelector.getSelectedStyle().name : 'Ocean Blue';

        const mapImageUrl = await generateStaticMapUrl({
            coordinates,
            zoom: currentLocation.zoom || 12,
            designId: getCurrentDesignId(),
            layoutId: getCurrentLayoutId(),
            colorStyle: colorSelector ? colorSelector.getSelectedStyle() : null
        });


        const downloadHtml = createDownloadHTML({
            mapImageUrl,
            locationName,
            coordsText,
            currentDesignName,
            currentColorName
        });


        const blob = new Blob([downloadHtml], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;


        const safeLocationName = locationName.replace(/[^a-zA-Z0-9]/g, '_');
        a.download = `${safeLocationName}_${currentDesignName}_${currentColorName}_map.html`;

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        alert(`Map of ${locationName} downloaded successfully!\nDesign: ${currentDesignName}\nColor: ${currentColorName}`);

    } catch (error) {
        alert('Error downloading map. Please try again.');
    } finally {
        const downloadBtn = document.getElementById('downloadBtn');
        if (downloadBtn) {
            downloadBtn.textContent = 'DOWNLOAD';
            downloadBtn.disabled = false;
        }
    }
}


async function generateStaticMapUrl({ coordinates, zoom, designId, layoutId, colorStyle }) {
    const mapboxToken = MAP_BOX_TOKEN;

    const designToStyleMapping = {
        '1': 'picturethestars/cla9hyw9400x615mgdh6maidi', // Modern
        '2': 'picturethestars/cla9hyyxo000214ny7xj3vejr', // Asphalt
        '3': 'picturethestars/cla9hz69s003t14saymfoel6l', // Nautical
        '4': 'picturethestars/cla9hz4fg006515qwu1z4kjh9', // Pantone
        '5': 'picturethestars/cla9hz0z000x715mgxs7g6m7d', // Ocean
        '6': 'picturethestars/cla9hz2si000r14ohss4vu28q', // Abstract
        '7': 'mapbox/light-v11',      // Nära
        '8': 'mapbox/satellite-streets-v12', // Gaia
        '9': 'mapbox/streets-v12',    // Playroom
        '10': 'mapbox/outdoors-v12',  // Sky
        '11': 'mapbox/light-v11',     // Humble
        '12': 'mapbox/light-v11'      // Customize
    };

    const layoutToSizeMapping = {
        '1': '800x1000', // Photo (rectangle)
        '2': '800x800',  // Circle
        '3': '1000x600', // Plaque (horizontal)
        '4': '800x1200'  // Full Page (tall)
    };

    let selectedStyle = designToStyleMapping[designId] || 'picturethestars/cla9hyw9400x615mgdh6maidi';
    let size = layoutToSizeMapping[layoutId] || '800x1000';

    const coordsString = `${coordinates[0]},${coordinates[1]}`;

    const staticMapUrl = `https://api.mapbox.com/styles/v1/${selectedStyle}/static/${coordsString},${zoom}/${size}@2x?access_token=${mapboxToken}`;

    return staticMapUrl;
}


function createDownloadHTML({ mapImageUrl, locationName, coordsText, currentDesignName, currentColorName }) {
    const currentLayoutId = getCurrentLayoutId();


    let containerStyle = '';
    let imageStyle = '';

    switch(currentLayoutId) {
        case '2': // Circle
            containerStyle = 'width: 500px; height: 500px; margin: 30px auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); display: flex; flex-direction: column; align-items: center;';
            imageStyle = 'width: 440px; height: 440px; border-radius: 50%; object-fit: cover;';
            break;
        case '3': // Plaque (horizontal)
            containerStyle = 'width: 700px; height: 450px; margin: 30px auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); position: relative;';
            imageStyle = 'width: 100%; height: 390px; object-fit: cover; border-radius: 8px;';
            break;
        case '4': // Full Page (tall)
            containerStyle = 'width: 500px; height: 700px; margin: 30px auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);';
            imageStyle = 'width: 100%; height: 100%; object-fit: cover; border-radius: 8px;';
            break;
        default: // Photo (rectangle)
            containerStyle = 'width: 500px; height: 650px; margin: 30px auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); display: flex; flex-direction: column;';
            imageStyle = 'width: 100%; height: 580px; object-fit: cover; border-radius: 8px;';
    }
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${locationName} - Custom Map</title>
    <style>
        body {
            margin: 0;
            padding: 40px;
            font-family: 'Lato', 'Inter', Arial, sans-serif;
            text-align: center;
            background: #f5f5f5;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
        }
        .logo {
            font-size: 24px;
            font-weight: 700;
            color: #222;
            letter-spacing: 1px;
            margin-bottom: 20px;
        }
        .logo span {
            color: #6c7a89;
        }
        .location-title {
            font-size: 28px;
            font-weight: bold;
            margin: 20px 0 5px 0;
            color: #333;
        }
        .coordinates {
            font-size: 16px;
            color: #666;
            margin-bottom: 20px;
        }
        .map-container {
            ${containerStyle}
        }
        .map-image {
            ${imageStyle}
        }
        .map-details {
            ${currentLayoutId === '2' ? 'margin-top: 15px; text-align: center;' : currentLayoutId === '3' ? 'position: absolute; bottom: 10px; left: 20px; background: rgba(255,255,255,0.9); padding: 5px 10px; border-radius: 4px;' : currentLayoutId === '4' ? 'display: none;' : 'margin-top: 10px; display: flex; justify-content: space-between; align-items: center;'}
        }
        .map-title {
            font-size: ${currentLayoutId === '1' ? '12px' : '10px'};
            font-weight: 600;
            color: #333;
        }
        .map-coordinates {
            font-size: ${currentLayoutId === '1' ? '11px' : '9px'};
            color: #666;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #999;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">MADE<span>PRINTS</span></div>
        <div class="location-title">${locationName}</div>
        <div class="coordinates">${coordsText}</div>

        <div class="map-container">
            <img src="${mapImageUrl}" alt="Map of ${locationName}" class="map-image">
            ${currentLayoutId !== '4' ? `
            <div class="map-details">
                <div class="map-title">${locationName}</div>
                <div class="map-coordinates">${coordsText}</div>
            </div>
            ` : ''}
        </div>

        <div class="footer">
            Generated by Made Prints
        </div>
    </div>
</body>
</html>`;
}

function hideAlLabels() {
    const layers = map.getStyle().layers;

    layers.forEach((layer) => {
        if (layer.type === 'symbol') {
            map.setLayoutProperty(layer.id, 'visibility', 'none');
        }
    });
}

// AJAX Functions
// Initialize Color Selector
let colorSelector;

function applyColorFilter(imageElement, colorStyle) {

    return;

    const filterMapping = {
        'marble': 'brightness(1.2) contrast(0.8) saturate(0.3)',
        'blue': 'hue-rotate(200deg) saturate(1.3) brightness(0.9)',
        'vintage': 'sepia(0.6) contrast(1.1) brightness(0.9)',
        'forest': 'hue-rotate(90deg) saturate(1.4) brightness(0.8)',
        'navy': 'hue-rotate(220deg) saturate(1.2) brightness(0.6)',
        'mint': 'hue-rotate(160deg) saturate(0.8) brightness(1.1)',
        'charcoal': 'grayscale(0.8) contrast(1.3) brightness(0.7)',
        'wine': 'hue-rotate(320deg) saturate(1.5) brightness(0.8)',
        'sky': 'hue-rotate(200deg) saturate(0.7) brightness(1.2)',
        'cream': 'sepia(0.3) brightness(1.1) saturate(0.9)',
        'sage': 'hue-rotate(100deg) saturate(0.9) brightness(0.95)',
        'rust': 'hue-rotate(30deg) saturate(1.4) brightness(0.9)',
        'seafoam': 'hue-rotate(180deg) saturate(1.1) brightness(1.0)',
        'coral': 'hue-rotate(350deg) saturate(1.3) brightness(1.0)',
        'sunset': 'hue-rotate(20deg) saturate(1.6) brightness(0.95)',
        'teal': 'hue-rotate(180deg) saturate(1.2) brightness(0.9)'
    };

    const colorId = colorStyle.id || 'marble';
    const filter = filterMapping[colorId] || 'none';

    imageElement.style.transition = 'filter 0.5s ease-in-out';
    imageElement.style.filter = filter;


    const debugUrl = document.getElementById('debugMapUrl');
    if (debugUrl) {
        const currentContent = debugUrl.innerHTML;
        debugUrl.innerHTML = currentContent + `<br><small>CSS Filter applied: <code style="font-size: 10px;">${filter}</code></small>`;
    }
}


function applyColorSchemeToMap(colorStyle) {
    return;

    if (!map || !map.isStyleLoaded()) {
        setTimeout(() => applyColorSchemeToMap(colorStyle), 500);
        return;
    }

    try {

        if (map.getLayer('water')) {
            map.setPaintProperty('water', 'fill-color', colorStyle.colors.water);
        }


        if (map.getLayer('landuse')) {
            map.setPaintProperty('landuse', 'fill-color', colorStyle.colors.land);
        }


        const roadLayers = ['road-primary', 'road-secondary', 'road-street', 'road-highway', 'road'];
        roadLayers.forEach(layerId => {
            if (map.getLayer(layerId)) {
                map.setPaintProperty(layerId, 'line-color', colorStyle.colors.roads);
            }
        });


        const textLayers = ['place-city-label', 'place-town-label', 'road-label'];
        textLayers.forEach(layerId => {
            if (map.getLayer(layerId)) {
                map.setPaintProperty(layerId, 'text-color', colorStyle.colors.text);
            }
        });

        const debugUrl = document.getElementById('debugMapUrl');
        if (debugUrl) {
            debugUrl.innerHTML = `Interactive Map: <strong>${colorStyle.name}</strong> applied ✅<br>` +
                `<small>Colors: Water: ${colorStyle.colors.water}, Land: ${colorStyle.colors.land}</small>`;
        }

    } catch (error) {
        console.error('❌ Error applying color scheme to map:', error);
    }
}


function applyDesignToMap(designId) {
    if (!map) {
        setTimeout(() => applyDesignToMap(designId), 500);
        return;
    }



    const designToStyleMapping = {
        '1': 'mapbox://styles/picturethestars/cla9hyw9400x615mgdh6maidi', // Modern
        '2': 'mapbox://styles/picturethestars/cla9hyyxo000214ny7xj3vejr', // Asphalt
        '3': 'mapbox://styles/picturethestars/cla9hz69s003t14saymfoel6l', // Nautical
        '4': 'mapbox://styles/picturethestars/cla9hz4fg006515qwu1z4kjh9', // Pantone
        '5': 'mapbox://styles/picturethestars/cla9hz0z000x715mgxs7g6m7d', // Ocean
        '6': 'mapbox://styles/picturethestars/cla9hz2si000r14ohss4vu28q', // Abstract
        '7': 'mapbox://styles/mapbox/light-v11',      // Nära
        '8': 'mapbox://styles/mapbox/satellite-streets-v12', // Gaia
        '9': 'mapbox://styles/mapbox/streets-v12',    // Playroom
        '10': 'mapbox://styles/mapbox/outdoors-v12',  // Sky
        '11': 'mapbox://styles/mapbox/light-v11',     // Humble
        '12': 'mapbox://styles/mapbox/light-v11'      // Customize
    };

    const newStyle = designToStyleMapping[designId] || 'mapbox://styles/mapbox/streets-v12';

    try {

        const currentCenter = map.getCenter();
        const currentZoom = map.getZoom();



        map.setStyle(newStyle);


        map.once('styledata', () => {



            map.setCenter(currentCenter);
            map.setZoom(currentZoom);

            hideAlLabels();


            setTimeout(() => {
                if (colorSelector && colorSelector.getSelectedStyle) {
                    const currentColorStyle = colorSelector.getSelectedStyle();
                    applyColorSchemeToMap(currentColorStyle);
                }
            }, 1000);
        });

    } catch (error) {
        console.error('❌ Error applying design to map:', error);
    }
}

function initializeColorSelector() {
    const container = document.getElementById('colorSelectorContainer');
    if (container && window.MapColorSelector) {
        colorSelector = new window.MapColorSelector(container);


        colorSelector.onStyleChange = (selectedStyle) => {



            const debugInfo = document.getElementById('colorDebugInfo');
            const debugColor = document.getElementById('debugSelectedColor');
            const debugUrl = document.getElementById('debugMapUrl');

            if (debugInfo && debugColor) {
                debugInfo.style.display = 'block';
                debugColor.textContent = `Selected: ${selectedStyle.name} (ID: ${selectedStyle.id})`;
                debugUrl.textContent = 'Applying to interactive map...';
            }


            applyColorSchemeToMap(selectedStyle);

            hideAlLabels();
        };
    }
}

// Initialize color selector when design content is shown
const originalContinueToNext = continueToNext;
continueToNext = function() {
    originalContinueToNext();

    // Initialize color selector when moving to design step
    if (currentStep === 2) {
        setTimeout(initializeColorSelector, 100);
    }
};

// Initialize interactive map when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeInteractiveMap, 1000);
});

const continueButton = document.getElementById('continueBtn');

if (continueButton) {
    continueButton.addEventListener('click', continueToNext);
}

const navigationContainer = document.querySelector('.navigation');

if (navigationContainer) {
    navigationContainer.addEventListener('click', function(event) {
        const targetId = event.target.id;

        if (targetId === 'continueBtn') {
            continueToNext();
        } else if (targetId === 'backBtn') {
            goBack();
        } else if (targetId === 'downloadBtn') {
            downloadMapPDF();
        }
    });
}

updateNavigation();

initializeInteractiveMap();
