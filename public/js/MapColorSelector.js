class MapColorSelector {
    constructor(container) {
        this.container = container;
        this.selectedStyle = 'blue';
        this.onStyleChange = null;
        
        this.colorStyles = [
            {
                id: 'marble',
                name: 'Marble',
                colors: {
                    water: '#f8f9fa',
                    land: '#e9ecef', 
                    roads: '#dee2e6',
                    text: '#6c757d'
                },
                preview: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'
            },
            {
                id: 'blue',
                name: 'Ocean Blue',
                colors: {
                    water: '#4a90e2',
                    land: '#f0f8ff',
                    roads: '#2c5aa0', 
                    text: '#1a365d'
                },
                preview: 'linear-gradient(135deg, #4a90e2 0%, #87ceeb 100%)',
                isNew: true
            },
            {
                id: 'vintage',
                name: 'Vintage',
                colors: {
                    water: '#d4c5a9',
                    land: '#f5f0e8',
                    roads: '#8b7355',
                    text: '#5d4e37'
                },
                preview: 'linear-gradient(135deg, #d4c5a9 0%, #f5f0e8 100%)'
            },
            {
                id: 'forest',
                name: 'Forest',
                colors: {
                    water: '#2d5016',
                    land: '#4a7c23',
                    roads: '#1a3009',
                    text: '#ffffff'
                },
                preview: 'linear-gradient(135deg, #2d5016 0%, #4a7c23 100%)'
            },
            {
                id: 'navy', 
                name: 'Navy',
                colors: {
                    water: '#1e3a5f',
                    land: '#2c5f7c',
                    roads: '#0f2537',
                    text: '#ffffff'
                },
                preview: 'linear-gradient(135deg, #1e3a5f 0%, #2c5f7c 100%)'
            },
            {
                id: 'mint',
                name: 'Mint',
                colors: {
                    water: '#7fdbca',
                    land: '#e8f8f5',
                    roads: '#4ecdc4',
                    text: '#2c7873'
                },
                preview: 'linear-gradient(135deg, #7fdbca 0%, #b8f2e6 100%)'
            },
            {
                id: 'charcoal',
                name: 'Charcoal',
                colors: {
                    water: '#2c3e50',
                    land: '#34495e',
                    roads: '#1a252f',
                    text: '#ecf0f1'
                },
                preview: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
            },
            {
                id: 'wine',
                name: 'Wine',
                colors: {
                    water: '#8b2635',
                    land: '#c44569',
                    roads: '#6b1e2f',
                    text: '#ffffff'
                },
                preview: 'linear-gradient(135deg, #8b2635 0%, #c44569 100%)'
            },
            {
                id: 'sky',
                name: 'Sky',
                colors: {
                    water: '#87ceeb',
                    land: '#f0f8ff',
                    roads: '#4682b4',
                    text: '#2f4f4f'
                },
                preview: 'linear-gradient(135deg, #87ceeb 0%, #e6f3ff 100%)'
            },
            {
                id: 'cream',
                name: 'Cream',
                colors: {
                    water: '#f5f5dc',
                    land: '#faf0e6',
                    roads: '#deb887',
                    text: '#8b7355'
                },
                preview: 'linear-gradient(135deg, #f5f5dc 0%, #faf0e6 100%)'
            },
            {
                id: 'sage',
                name: 'Sage',
                colors: {
                    water: '#9caf88',
                    land: '#f4f6f0',
                    roads: '#7a8471',
                    text: '#5d6b56'
                },
                preview: 'linear-gradient(135deg, #9caf88 0%, #c8d5b9 100%)'
            },
            {
                id: 'rust',
                name: 'Rust',
                colors: {
                    water: '#cd853f',
                    land: '#faebd7',
                    roads: '#a0522d',
                    text: '#654321'
                },
                preview: 'linear-gradient(135deg, #cd853f 0%, #deb887 100%)'
            },
            {
                id: 'seafoam',
                name: 'Seafoam',
                colors: {
                    water: '#20b2aa',
                    land: '#f0ffff',
                    roads: '#008b8b',
                    text: '#2f4f4f'
                },
                preview: 'linear-gradient(135deg, #20b2aa 0%, #afeeee 100%)'
            },
            {
                id: 'coral',
                name: 'Coral',
                colors: {
                    water: '#ff7f7f',
                    land: '#fff5f5',
                    roads: '#ff6b6b',
                    text: '#8b0000'
                },
                preview: 'linear-gradient(135deg, #ff7f7f 0%, #ffb3b3 100%)'
            },
            {
                id: 'sunset',
                name: 'Sunset',
                colors: {
                    water: '#ff6b35',
                    land: '#fff8f0',
                    roads: '#e55100',
                    text: '#bf360c'
                },
                preview: 'linear-gradient(135deg, #ff6b35 0%, #ff8a65 100%)'
            },
            {
                id: 'teal',
                name: 'Teal',
                colors: {
                    water: '#008080',
                    land: '#f0ffff',
                    roads: '#005757',
                    text: '#003333'
                },
                preview: 'linear-gradient(135deg, #008080 0%, #40e0d0 100%)'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.render();
        this.attachEventListeners();
    }
    
    render() {
        const html = `
            <div class="color-selector-section">
                <div class="section-title">SELECT MAP STYLE</div>
                <div class="section-subtitle">Choose your preferred color scheme</div>
                
                <div class="color-styles-grid">
                    ${this.colorStyles.map(style => `
                        <div class="color-style-option ${style.id === this.selectedStyle ? 'selected' : ''}" 
                             data-style-id="${style.id}">
                            <div class="color-preview" style="background: ${style.preview}">
                                ${style.isNew ? '<div class="new-badge">New!</div>' : ''}
                            </div>
                            <div class="color-name">${style.name}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="color-info">
                    <div class="section-title" style="font-size: 14px; margin-bottom: 15px;">
                        Color Scheme: ${this.getSelectedStyle().name}
                    </div>
                    <div class="color-swatches">
                        ${Object.entries(this.getSelectedStyle().colors).map(([key, color]) => `
                            <div class="color-swatch">
                                <div class="swatch-color" style="background-color: ${color}"></div>
                                <span class="swatch-label">${key}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = html;
    }
    
    attachEventListeners() {
        const options = this.container.querySelectorAll('.color-style-option');
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                const styleId = option.dataset.styleId;
                this.selectStyle(styleId);
            });
        });
    }
    
    selectStyle(styleId) {
        this.selectedStyle = styleId;
        
        // Update visual selection
        const options = this.container.querySelectorAll('.color-style-option');
        options.forEach(option => {
            option.classList.toggle('selected', option.dataset.styleId === styleId);
        });
        
        // Update color info
        this.updateColorInfo();
        
        // Trigger callback
        if (this.onStyleChange) {
            this.onStyleChange(this.getSelectedStyle());
        }
    }
    
    updateColorInfo() {
        const colorInfo = this.container.querySelector('.color-info');
        const selectedStyle = this.getSelectedStyle();
        
        colorInfo.innerHTML = `
            <div class="section-title" style="font-size: 14px; margin-bottom: 15px;">
                Color Scheme: ${selectedStyle.name}
            </div>
            <div class="color-swatches">
                ${Object.entries(selectedStyle.colors).map(([key, color]) => `
                    <div class="color-swatch">
                        <div class="swatch-color" style="background-color: ${color}"></div>
                        <span class="swatch-label">${key}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    getSelectedStyle() {
        return this.colorStyles.find(style => style.id === this.selectedStyle);
    }
    
    getMapboxStyle() {
        const colorScheme = this.getSelectedStyle();
        
        return {
            version: 8,
            name: colorScheme.name,
            sources: {
                'mapbox-streets': {
                    type: 'vector',
                    url: 'mapbox://mapbox.mapbox-streets-v8'
                }
            },
            layers: [
                {
                    id: 'background',
                    type: 'background',
                    paint: {
                        'background-color': colorScheme.colors.water
                    }
                },
                {
                    id: 'water',
                    type: 'fill',
                    source: 'mapbox-streets',
                    'source-layer': 'water',
                    paint: {
                        'fill-color': colorScheme.colors.water
                    }
                },
                {
                    id: 'land',
                    type: 'fill', 
                    source: 'mapbox-streets',
                    'source-layer': 'landuse',
                    paint: {
                        'fill-color': colorScheme.colors.land
                    }
                },
                {
                    id: 'roads',
                    type: 'line',
                    source: 'mapbox-streets',
                    'source-layer': 'road',
                    paint: {
                        'line-color': colorScheme.colors.roads,
                        'line-width': 1
                    }
                },
                {
                    id: 'labels',
                    type: 'symbol',
                    source: 'mapbox-streets',
                    'source-layer': 'place_label',
                    layout: {
                        'text-field': '{name}',
                        'text-font': ['Arial Regular'],
                        'text-size': 12
                    },
                    paint: {
                        'text-color': colorScheme.colors.text
                    }
                }
            ]
        };
    }
}

window.MapColorSelector = MapColorSelector;
