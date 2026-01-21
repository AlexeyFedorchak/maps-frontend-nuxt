import type { ColorScheme, Theme, Layout, Location, MapShape, Frame, Font, PrintSize } from '~/types';
import { computed, ref } from 'vue';
import { LOCATION_MAP_DEFAULT_LOCATION, LOCATION_MAP_LAYOUTS, LOCATION_MAP_THEMES } from '~/constants/location-map';
import { FONTS_OPTIONS } from '~/constants/fonts';

/**
 * @description
 * This store save all map configuration for location map.
 * */
export const useLocationMapStore = defineStore('locationMapStore', () => {
    const frame = ref<Frame | null>(null);
    const font = ref<Font | null>(FONTS_OPTIONS[0] || null);
    const hasRibbon = ref(false);
    const location = ref<Location | null>(LOCATION_MAP_DEFAULT_LOCATION);
    const layout = ref<Layout | null>(LOCATION_MAP_LAYOUTS[0] || null);
    const theme = ref<Theme | null>(LOCATION_MAP_THEMES[0] || null);
    const colorScheme = ref<ColorScheme | null>(null);
    const mapTitle = ref<string | null>('');
    const mapDate = ref<Date | null>(new Date());
    const mapTime = ref<string | null>('');
    const mapSubtitle = ref<string | undefined>(getMapSubtitle());
    const mapMessageLine1 = ref<string | null>('');
    const mapMessageLine2 = ref<string | null>('');
    const selectedSize = ref<PrintSize | null>(null);

    const loadData = async () => {
        const { getProductOptions } = useApi();
        const { data } = await getProductOptions('location-map');
        return data;
    };

    const getLayoutName = computed(() => {
        const shape = layout.value?.shape;
        const defaultLayout: string = 'w-[84%] aspect-square bg-[#FFFAFA] border-none shadow-none absolute top-[8.5%] left-[50%] translate-x-[-50%]';
        const layoutName: Partial<Record<MapShape, string>> = {
            'circle': 'w-[84%] aspect-square absolute z-1 top-[8.5%] left-[50%] rounded-full translate-x-[-50%]',
            'heart': 'w-[84%] aspect-square absolute z-1 top-[8.5%] left-[50%] translate-x-[-50%] heart-shape',
            'photo': 'w-[92%] h-[90%] absolute z-1 top-[3%] left-[50%] translate-x-[-50%]',
            'fade': 'w-[92%] h-[90%] absolute z-1 top-[3%] left-[50%] translate-x-[-50%]',
            'horizontal': 'h-full w-full',
            'full-page': 'h-full w-full',
        };

        if (shape) {
            return layoutName[shape] || defaultLayout;
        }

        return defaultLayout;
    });
    const getMapTitle = computed(() => {
        return mapTitle.value
    });

    function getMapSubtitle(){
        if (!mapDate.value) return '';
        if (!mapTime.value) return formatDate(mapDate.value);
        return `${formatDate(mapDate.value)} - ${mapTime.value}`;
    }

    const getCoordinatesText = computed(() => {
        if (!location.value) return '51.507°N 0.128°W';

        const [lng, lat] = location.value.coords;
        const latDir = lat >= 0 ? 'N' : 'S';
        const lngDir = lng >= 0 ? 'E' : 'W';

        return `${Math.abs(lat).toFixed(3)}°${latDir} ${Math.abs(lng).toFixed(3)}°${lngDir}`;
    });

    function setFrame(newFrame: Frame | null) {
        frame.value = newFrame
    }

    function setFont(newFont: Font) {
        font.value = newFont
    }

    function setRibbon(enabled: boolean) {
        hasRibbon.value = enabled
    }

    function setLocation(newLocation: Location) {
        location.value = newLocation
        mapTitle.value = newLocation.name
    }

    function setLayout(newLayout: Layout) {
        layout.value = newLayout
    }

    function setTheme(newTheme: Theme) {
        theme.value = newTheme
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

    function setMapSubtitle(subtitle: string | undefined) {
        mapSubtitle.value = subtitle
    }

    function setMapTitle(title: string | undefined) {
        mapTitle.value = title
    }

    function setMapDate(subtitle: Date | null) {
        mapDate.value = subtitle
    }

    function setMapTime(subtitle: string | null) {
        mapTime.value = subtitle
    }

    function setSelectedSize(size: PrintSize | null) {
        selectedSize.value = size
    }


    function loadFromBasketItem(basketItem: any) {
        if (!basketItem) return;

        location.value = basketItem.location ?? location.value;
        theme.value = basketItem.theme ?? theme.value;
        layout.value = basketItem.layout ?? layout.value;
        selectedSize.value = basketItem.selectedSize ?? selectedSize.value;
        frame.value = basketItem.frame ?? frame.value;
        hasRibbon.value = basketItem.hasRibbon ?? hasRibbon.value;

        mapDate.value = basketItem.date ? new Date(basketItem.date) : mapDate.value;

        mapTitle.value = basketItem.mapTitle ?? basketItem.title ?? basketItem.location?.name ?? mapTitle.value;
    }

    return {
        // State
        frame,
        font,
        hasRibbon,
        location,
        layout,
        theme,
        mapTitle,
        mapDate,
        mapTime,
        colorScheme,
        selectedSize,
        setMapSubtitle,
        mapMessageLine1,
        mapMessageLine2,
        // Getters
        getLayoutName,
        getMapTitle,
        mapSubtitle,
        getCoordinatesText,
        getMapSubtitle,
        // Actions
        setFrame,
        setFont,
        setRibbon,
        setLayout,
        setLocation,
        setMapTitle,
        setMapDate,
        setMapTime,
        setTheme,
        setMapMessageLine1,
        setMapMessageLine2,
        setColorScheme,
        setSelectedSize,
        loadData,
        loadFromBasketItem,
    };
});
