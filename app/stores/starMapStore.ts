import type {ColorScheme, Theme, Layout, Location, MapShape, Frame, StarFeature} from '~/types';
import { computed, ref } from 'vue';
import { LOCATION_MAP_DEFAULT_LOCATION, LOCATION_MAP_LAYOUTS } from '~/constants/location-map';
import { STAR_MAP_THEMES } from '~/constants/star-map/themes';
import { STAR_MAP_FEATURES } from '~/constants/star-map/features';

/**
 * @description
 * This store save all map configuration for star map.
 * */
export const useStarMapStore = defineStore('starMapStore', () => {
    const location = ref<Location | null>(LOCATION_MAP_DEFAULT_LOCATION);
    const layout = ref<Layout | null>(LOCATION_MAP_LAYOUTS[1] || null);
    const theme = ref<Theme | null>(STAR_MAP_THEMES[0] || null);
    const colorScheme = ref<ColorScheme | null>(null);
    const mapMessageLine1 = ref<string | null>('The Night Our Adventure Started');
    const mapMessageLine2 = ref<string | null>('');
    const mapTitle = ref<string | undefined>(LOCATION_MAP_DEFAULT_LOCATION.name);
    const mapDate = ref<Date | undefined>(new Date());
    const mapTime = ref<string | undefined>('');
    const frame = ref<Frame | null>(null);
    const hasRibbon = ref(false);
    const features = ref<StarFeature[]>(STAR_MAP_FEATURES);

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

    const mapSubtitle = computed<string>(() => {
        if (!mapDate.value) return '';
        if (!mapTime.value) return formatDate(mapDate.value);
        return `${formatDate(mapDate.value)} - ${mapTime.value}`;
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

    function setMapMessageLine1(newMessage: string) {
        mapMessageLine1.value = newMessage
    }

    function setMapMessageLine2(newMessage: string) {
        mapMessageLine2.value = newMessage
    }

    function setMapTitle(title: string | undefined) {
        mapTitle.value = title
    }

    function setMapDate(subtitle: Date | undefined) {
        mapDate.value = subtitle
    }

    function setMapTime(subtitle: string | undefined) {
        mapTime.value = subtitle
    }

    function setFrame(newFrame: Frame | null) {
        frame.value = newFrame
    }

    function setRibbon(enabled: boolean) {
        hasRibbon.value = enabled
    }

    function setFeature(feature: StarFeature) {
        const idx: number = features.value.findIndex(item => item.id === feature.id);
        if (!features.value[idx]) return;
        features.value[idx].isSelected = !features.value[idx].isSelected;
    }

    return {
        frame,
        hasRibbon,
        location,
        layout,
        theme,
        features,
        mapMessageLine1,
        mapMessageLine2,
        mapTitle,
        mapDate,
        mapTime,
        colorScheme,
        mapSubtitle,
        getLayoutName,
        getMapTitle,
        getCoordinatesText,
        setFrame,
        setRibbon,
        setLocation,
        setMapMessageLine1,
        setMapMessageLine2,
        setMapTitle,
        setMapDate,
        setMapTime,
        setTheme,
        setColorScheme,
        setFeature,
    };
});
