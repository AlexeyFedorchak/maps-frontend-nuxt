import type { ColorScheme, Design, Layout, Location, MapShape } from '~/types';
import { computed, ref } from 'vue';
import { LOCATION_MAP_DEFAULT_LOCATION, LOCATION_MAP_LAYOUTS, LOCATION_MAP_DESIGNS } from '~/constants/location-map';

type LayoutName = 'rectangle-layout'
    | 'circle-layout'
    | 'horizontal-layout'
    | 'full-page-layout';

/**
 * @description
 * This store save all map configuration for location map.
 * */
export const useLocationMapStore = defineStore('locationMapStore', () => {
    const location = ref<Location | null>(LOCATION_MAP_DEFAULT_LOCATION);
    const layout = ref<Layout | null>(LOCATION_MAP_LAYOUTS[0] || null);
    const design = ref<Design | null>(LOCATION_MAP_DESIGNS[0] || null);
    const colorScheme = ref<ColorScheme | null>(null);
    const mapTitle = ref<string | undefined>(LOCATION_MAP_DEFAULT_LOCATION.name);
    const mapSubtitle = ref<string | undefined>('');

    const getLayoutName = computed(() => {
        const shape = layout.value?.shape;
        const defaultLayout: LayoutName = 'rectangle-layout';
        const layoutName: Partial<Record<MapShape, LayoutName>> = {
            'circle': 'circle-layout',
            'horizontal': 'horizontal-layout',
            'full-page': 'full-page-layout',
        };

        if (shape) {
            return layoutName[shape] || defaultLayout;
        }

        return defaultLayout;
    });
    const getMapTitle = computed(() => {
        return mapTitle.value || location.value?.name
    });

    const getCoordinatesText = computed(() => {
        if (!location.value) return '51.507°N 0.128°W';

        const [lng, lat] = location.value.coords;
        const latDir = lat >= 0 ? 'N' : 'S';
        const lngDir = lng >= 0 ? 'E' : 'W';

        return `${Math.abs(lat).toFixed(3)}°${latDir} ${Math.abs(lng).toFixed(3)}°${lngDir}`;
    });

    function setLocation(newLocation: Location) {
        location.value = newLocation
        mapTitle.value = newLocation.name
        // saveToHistory()
        console.log(`Location set: ${newLocation.name}`)
    }

    function setLayout(newLayout: Layout) {
        console.log('newLayout', newLayout)
        layout.value = newLayout
        // saveToHistory()
        console.log(`Layout set: ${newLayout.name}`)
    }

    function setDesign(newDesign: Design) {
        design.value = newDesign
        // saveToHistory()
        console.log(`Design set: ${newDesign.name}`)
    }

    function setColorScheme(newColorScheme: ColorScheme) {
        colorScheme.value = newColorScheme
        // saveToHistory()
        console.log(`Color scheme set: ${newColorScheme.name}`)
    }

    function setMapTitle(title: string | undefined) {
        mapTitle.value = title
        // saveToHistory()
    }

    function setMapSubtitle(subtitle: string | undefined) {
        mapSubtitle.value = subtitle
        // saveToHistory()
    }

    return {
        // State
        location,
        layout,
        design,
        mapTitle,
        mapSubtitle,
        colorScheme,
        // Getters
        getLayoutName,
        getMapTitle,
        getCoordinatesText,
        // Actions
        setLayout,
        setLocation,
        setMapTitle,
        setMapSubtitle,
        setDesign,
        setColorScheme,
    };
});
