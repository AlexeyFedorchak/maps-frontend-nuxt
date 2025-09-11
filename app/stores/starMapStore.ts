import type { ColorScheme, Theme, Layout, Location, Frame, StarFeature, Font } from '~/types';
import { computed, ref } from 'vue';
import { LOCATION_MAP_DEFAULT_LOCATION, LOCATION_MAP_LAYOUTS } from '~/constants/location-map';
import { STAR_MAP_THEMES } from '~/constants/star-map/themes';
import { STAR_MAP_FEATURES } from '~/constants/star-map/features';
import { FONTS_OPTIONS } from '~/constants/fonts';

import { toSignedLat, toSignedLon, splitLat, splitLon, type LatHem, type LonHem } from '~/utils/geo'

/**
 * @description
 * This store save all map configuration for star map.
 * */
export const useStarMapStore = defineStore('starMapStore', () => {
    const location = ref<Location | null>(LOCATION_MAP_DEFAULT_LOCATION);
    const layout = ref<Layout | null>(LOCATION_MAP_LAYOUTS[1] || null);
    const theme = ref<Theme | null>(STAR_MAP_THEMES[0] || null);
    const font = ref<Font | null>(FONTS_OPTIONS[0] || null);
    const colorScheme = ref<ColorScheme | null>(null);
    const mapMessageLine1 = ref<string | null>('The Night Our Adventure Started');
    const mapMessageLine2 = ref<string | null>('');
    const mapTitle = ref<string | null>('');
    const mapDate = ref<Date | null>(new Date());
    const mapTime = ref<string | null>('');
    const frame = ref<Frame | null>(null);
    const hasRibbon = ref(false);
    const features = ref<StarFeature[]>(STAR_MAP_FEATURES);

    const getLayoutName = computed(() => {
        return 'circle-layout';
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
    }

    function setLocationCustomText(customText: string) {
        if (!location.value) return
        location.value = {...location.value, fullName: customText}
    }

    function setTheme(newTheme: Theme) {
        theme.value = newTheme
    }

    function setFont(newFont: Font) {
        font.value = newFont
    }

    function setColorScheme(newColorScheme: ColorScheme) {
        colorScheme.value = newColorScheme
    }

    function setMapMessageLine1(newMessage: string) {
        mapMessageLine1.value = newMessage
    }

    function setMapMessageLine2(newMessage: string) {
        mapMessageLine2.value = newMessage
    }

    function setMapTitle(title: string | null) {
        mapTitle.value = title
    }

    function setMapDate(subtitle: Date | null) {
        mapDate.value = subtitle
    }

    function setMapTime(subtitle: string | null) {
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

    function setLatitude(val: number | string) {
        if (!location.value) return;
        const n = Number(val);
        const lat = isNaN(n) ? 0 : n;
        const [lon] = location.value.coords;
        location.value = {...location.value, coords: [lon, lat]};
    }

    function setLongitude(val: number | string) {
        if (!location.value) return;
        const n = Number(val);
        const lon = isNaN(n) ? 0 : n;
        const [, lat] = location.value.coords;
        location.value = {...location.value, coords: [lon, lat]};
    }

    function setLatHem(hem: LatHem) {
        if (!location.value) return;
        const [, lat] = location.value.coords;
        const abs = Math.abs(lat);
        const next = toSignedLat(abs, hem);
        location.value = {...location.value, coords: [location.value.coords[0], next]};
    }

    function setLonHem(hem: LonHem) {
        if (!location.value) return;
        const [lon] = location.value.coords;
        const abs = Math.abs(lon);
        const next = toSignedLon(abs, hem);
        location.value = {...location.value, coords: [next, location.value.coords[1]]};
    }

    return {
        frame,
        hasRibbon,
        location,
        layout,
        theme,
        font,
        features,
        mapMessageLine1,
        mapMessageLine2,
        mapTitle,
        mapDate,
        mapTime,
        colorScheme,
        mapSubtitle,
        getLayoutName,
        getCoordinatesText,
        setFrame,
        setRibbon,
        setLocation,
        setMapMessageLine1,
        setMapMessageLine2,
        setLocationCustomText,
        setMapTitle,
        setMapDate,
        setMapTime,
        setTheme,
        setFont,
        setColorScheme,
        setFeature,
        setLatitude,
        setLongitude,
        setLatHem,
        setLonHem,
    };
});
