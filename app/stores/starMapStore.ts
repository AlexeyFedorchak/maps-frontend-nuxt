import type { ColorScheme, Theme, Layout, Location, MapShape } from '~/types';
import { computed, ref } from 'vue';
import { LOCATION_MAP_DEFAULT_LOCATION, LOCATION_MAP_LAYOUTS } from '~/constants/location-map';
import { STAR_MAP_THEMES } from '~/constants/star-map/themes';

/**
 * @description
 * This store save all map configuration for star map.
 * */
export const useStarMapStore = defineStore('starMapStore', () => {
    const location = ref<Location | null>(LOCATION_MAP_DEFAULT_LOCATION);
    const layout = ref<Layout | null>(LOCATION_MAP_LAYOUTS[1] || null);
    const theme = ref<Theme | null>(STAR_MAP_THEMES[0] || null);
    const colorScheme = ref<ColorScheme | null>(null);
    const mapTitle = ref<string | undefined>(LOCATION_MAP_DEFAULT_LOCATION.name);
    const mapSubtitle = ref<string | undefined>('');

    const getLayoutName = computed(() => {
        return 'circle-layout';
    });
    const getMapTitle = computed(() => {
        return mapTitle.value || location.value?.name;
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
        console.log(`Location set: ${newLocation.name}`)
    }

    function setTheme(newTheme: Theme) {
        theme.value = newTheme
        console.log(`Theme set: ${newTheme.name}`)
    }

    function setColorScheme(newColorScheme: ColorScheme) {
        colorScheme.value = newColorScheme
        console.log(`Color scheme set: ${newColorScheme.name}`)
    }

    function setMapTitle(title: string | undefined) {
        mapTitle.value = title
    }

    function setMapSubtitle(subtitle: string | undefined) {
        mapSubtitle.value = subtitle
    }

    return {
        location,
        layout,
        theme,
        mapTitle,
        mapSubtitle,
        colorScheme,
        getLayoutName,
        getMapTitle,
        getCoordinatesText,
        setLocation,
        setMapTitle,
        setMapSubtitle,
        setTheme,
        setColorScheme,
    };
});
