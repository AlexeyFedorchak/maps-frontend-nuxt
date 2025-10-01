import {computed, ref, watch} from 'vue';
import {defineStore} from 'pinia';
import {FRAMES} from '~/constants/frames';
import {RIBBONS} from '~/constants/ribbons';
import {WALL_STRIPS} from '~/constants/wallStrips';
import {GREETING_CARDS} from '~/constants/greetingCards';
import {MAP_TYPES, MAP_ELEMENT_IDS, type MapType} from '~/constants/mapTypes';
import type {Location, Frame, BasketRecommendation, PrintSize, BasketItem, Theme, Layout} from "~/types/index";
import type {PriceCalculationProduct, ProductPriceDetail} from "~/types/api";
import {toJpeg} from "html-to-image";

// Constants
const RECOMMENDATIONS = {
    basic: [...FRAMES, ...RIBBONS] as BasketRecommendation[],
    advanced: [...WALL_STRIPS, ...GREETING_CARDS] as BasketRecommendation[]
};

// Backend extra IDs - simple and clear
const EXTRA_IDS = {
    RIBBON: 1,        // Gift Wrap
    WALL_STRIPS: 2,   // Wall Strips
    GREETING_CARD: 3  // Greetings Card
};

/**
 * @description
 * This store manages the shopping basket functionality
 */
export const useBasketStore = defineStore('basketStore', () => {
    // State
    const items = ref<BasketItem[]>([]);
    const previewUri = ref<string | null>(null);
    const apiPrices = ref<Map<string, ProductPriceDetail>>(new Map());
    const isPriceLoading = ref(false);
    const priceError = ref<string | null>(null);
    const useApiPricing = ref(true);
    const editingItem = ref<BasketItem | null>(null);

    // Api
    const getProductOptions = async (slug: string) => {
        const { getProductOptions } = useApi();
        const { data } = await getProductOptions(slug);
        return data;
    };

    const loadItemsApi = async () => {
        await Promise.all(
            items.value.map(async (item) => {
                try {
                    item.apiProductData = await getProductOptions(item.slug);
                } catch (error) {
                    item.apiProductData = null;
                }
            })
        );
    };

    const getExtrasIdsForItem = (item: BasketItem): number[] => {
        const extraIds: number[] = [];

        if (item.hasRibbon) {
            extraIds.push(EXTRA_IDS.RIBBON);
        }

        if (item.selectedExtras.some(e => e.id === 'wall-strips')) {
            extraIds.push(EXTRA_IDS.WALL_STRIPS);
        }

        if (item.selectedExtras.some(e => e.id === 'greeting-card')) {
            extraIds.push(EXTRA_IDS.GREETING_CARD);
        }

        return extraIds;
    };

    const buildPriceCalculationProduct = (item: BasketItem): PriceCalculationProduct => {
        const extraIds = getExtrasIdsForItem(item);

        return {
            slug: item.slug,
            sizeId: parseInt(item?.selectedSize.id.toString()),
            frameId: item.frame ? parseInt(item.frame.id.toString()) : undefined,
            extraIds: extraIds.length > 0 ? extraIds : undefined
        };
    };

    const storePricesFromResponse = (
        response: ProductPriceDetail[],
        products: PriceCalculationProduct[]
    ): void => {
        apiPrices.value.clear();

        response.forEach((result: ProductPriceDetail, index: number) => {
            const requestProduct = products[index];
            if (requestProduct) {
                const key = generatePriceKey(
                    requestProduct.slug,
                    requestProduct.sizeId,
                    requestProduct.frameId,
                    requestProduct.extraIds
                );
                // Convert backend price from pence to pounds
                const priceInPounds = result.total / 100;
                apiPrices.value.set(key, {
                    ...result,
                    total: priceInPounds
                });
            }
        });
    };

    const calculatePricesFromApi = async () => {
        if (!useApiPricing.value || !items.value.length) return;

        isPriceLoading.value = true;
        priceError.value = null;

        try {
            const { calculatePrices } = useApi();
            const products: PriceCalculationProduct[] = items.value.map(buildPriceCalculationProduct);
            const response = await calculatePrices(products);

            if (response.data && Array.isArray(response.data)) {
                storePricesFromResponse(response.data, products);
            }
        } catch (error) {
            console.error('Failed to calculate prices from API:', error);
            priceError.value = 'Failed to calculate prices. Using fallback prices.';
            useApiPricing.value = false;
        } finally {
            isPriceLoading.value = false;
        }
    };

    const generatePriceKey = (slug: string, sizeId: number, frameId?: number, extraIds?: number[]): string => {
        const sortedExtras = extraIds ? [...extraIds].sort() : [];
        return `${slug}_${sizeId}_${frameId || 'none'}_${sortedExtras.join(',') || 'none'}`;
    };

    const getApiPrice = (item: BasketItem): ProductPriceDetail | null => {
        const extraIds = getExtrasIdsForItem(item);
        const key = generatePriceKey(
            item.slug,
            parseInt(item?.selectedSize?.id.toString()),
            item.frame ? parseInt(item.frame.id.toString()) : undefined,
            extraIds
        );
        return apiPrices.value.get(key) || null;
    };

    // Local storage
    const loadBasket = () => {
        if (process.client) {
            const stored = localStorage.getItem('basket');
            try {
                items.value = stored ? JSON.parse(stored) : [];
            } catch {
                items.value = [];
            }
        }
    };

    const saveBasket = () => {
        if (process.client) {
            localStorage.setItem('basket', JSON.stringify(items.value));
        }
    };

    // Utilities
    const findItem = (itemId: number) => items.value.find(item => item.id === itemId);
    const findItemByUuid = (itemUuid: number) => items.value.find(item => item.uuid === itemUuid);

    const roundPrice = (price: number) => Math.round(price * 100) / 100;


    const hideMapControls = (element: HTMLElement): { container: HTMLElement | null; originalDisplay: string } => {
        const controlsContainer = element.querySelector('.maplibregl-control-container') as HTMLElement | null;
        const originalDisplay = controlsContainer ? controlsContainer.style.display : '';

        if (controlsContainer) {
            controlsContainer.style.display = 'none';
        }

        return { container: controlsContainer, originalDisplay };
    };

    const restoreMapControls = (controlsContainer: HTMLElement | null, originalDisplay: string): void => {
        if (controlsContainer) {
            controlsContainer.style.display = originalDisplay;
        }
    };

    const waitForMapRender = async (): Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 500));
    };

    const captureWithHtmlToImage = async (element: HTMLElement, mapType: MapType): Promise<string | null> => {
        try {
            // Use black background for starmap, white for location map
            const backgroundColor = mapType === MAP_TYPES.STARMAP ? '#000000' : '#ffffff';

            const dataUrl = await toJpeg(element, {
                useCORS: true,
                allowTaint: true,
                backgroundColor,
            });
            return dataUrl;
        } catch (err) {
            console.error('Error capturing with html-to-image:', err);
            return null;
        }
    };

    const captureCanvasDirectly = (element: HTMLElement): string | null => {
        try {
            const canvas = element.querySelector('.maplibregl-canvas') as HTMLCanvasElement;
            if (canvas) {
                return canvas.toDataURL('image/jpeg', 0.9);
            }
        } catch (err) {
            console.error('Error capturing canvas directly:', err);
        }
        return null;
    };

    const getMapPreviewUri = async (mapType: MapType): Promise<string | null> => {
        const elementId = mapType === MAP_TYPES.STARMAP ? MAP_ELEMENT_IDS.STARMAP_PREVIEW : MAP_ELEMENT_IDS.LOCATIONMAP_PREVIEW;
        const el = document.getElementById(elementId);

        if (!el) return null;

        // Setup for location maps
        let controlsInfo = { container: null as HTMLElement | null, originalDisplay: '' };
        if (mapType === MAP_TYPES.LOCATIONMAP) {
            controlsInfo = hideMapControls(el);
            await waitForMapRender();
        }

        try {
            // Try html-to-image first
            const dataUrl = await captureWithHtmlToImage(el, mapType);
            if (dataUrl) return dataUrl;

            // Fallback to canvas for location maps
            if (mapType === MAP_TYPES.LOCATIONMAP) {
                const canvasDataUrl = captureCanvasDirectly(el);
                if (canvasDataUrl) return canvasDataUrl;
            }
        } finally {
            // Restore controls for location maps
            if (mapType === MAP_TYPES.LOCATIONMAP) {
                restoreMapControls(controlsInfo.container, controlsInfo.originalDisplay);
            }
        }

        return null;
    }


    // Preview save
    const savePreview = async (mapType: MapType): Promise<void> => {
        previewUri.value = await getMapPreviewUri(mapType);
    };

    // Price calculations
    const calculateItemTotal = (item: BasketItem): number => {
        // Use API price if available
        const apiPrice = getApiPrice(item);
        if (apiPrice) {
            return roundPrice(apiPrice.total);
        }

        // Fallback: use the item's base price if API hasn't loaded yet
        // The actual price will be updated once API responds
        return item?.selectedSize?.price || 0;
    };


    // Item management
    const addPosterToBasket = async (data: {
        id: number;
        title: string;
        mapTitle?: string | null;
        slug: string;
        location: Location;
        date: Date;
        time?: string | null;
        selectedSize: PrintSize;
        price: number;
        frame?: Frame | null;
        hasRibbon?: boolean;
        theme?: Theme | null;
        layout?: Layout | null;
    }) => {
        const newItem: BasketItem = {
            id: data.id,
            title: data.title,
            mapTitle: data.mapTitle ?? null,
            slug: data.slug,
            location: data.location,
            date: data.date,
            time: data.time ?? null,
            selectedSize: data.selectedSize,
            price: data.price.toString(),
            frame: data.frame ?? null,
            hasRibbon: data.hasRibbon ?? false,
            theme: data.theme ?? null,
            layout: data.layout ?? null,
            selectedExtras: [],
            basicRecommendations: RECOMMENDATIONS.basic,
            advancedRecommendations: RECOMMENDATIONS.advanced,
            uuid: crypto.randomUUID(),
            previewUri: previewUri.value,
            apiProductData: null,
        };

        items.value.push(newItem);
        saveBasket();
        // Calculate prices for the new item
        await calculatePricesFromApi();
    };

    const removeItemFromBasket = (item: BasketItem) => {
        items.value = items.value.filter(i => i.uuid !== item.uuid);
        saveBasket();
    };

    const setEditingItem = (item: BasketItem | null) => {
        editingItem.value = item;
    };

    const updateItemInBasket = (updatedItem: BasketItem) => {
        const index = items.value.findIndex(item => item.uuid === updatedItem.uuid);
        if (index !== -1) {
            items.value[index] = updatedItem;
            saveBasket();
        }
    };

    // Generic item updater following Open/Closed principle
    const updateItemProperty = <T>(uuid: string, property: keyof BasketItem, value: T) => {
        const item = findItemByUuid(uuid);
        if (item) {
            (item[property] as T) = value;
        }
    };

    // Specific updaters using the generic function
    const updateItemFrame = (uuid: string, frame: Frame | null) =>
        updateItemProperty(uuid, 'frame', frame);

    const updateItemRibbon = (uuid: string, hasRibbon: boolean) =>
        updateItemProperty(uuid, 'hasRibbon', hasRibbon);

    // Extra management
    const addExtraToItem = (uuid: string, extra: BasketRecommendation) => {
        const item = findItemByUuid(uuid);
        if (item && !item.selectedExtras.some(e => e.id === extra.id && e.type === extra.type)) {
            item.selectedExtras.push(extra);
        }
    };

    const removeExtraFromItem = (uuid: string, extraId: string, extraType: string) => {
        const item = findItemByUuid(uuid);
        if (item) {
            item.selectedExtras = item.selectedExtras.filter(
                extra => !(extra.id === extraId && extra.type === extraType)
            );
        }
    };

    const isExtraSelected = (uuid: string, extraId: string, extraType: string): boolean => {
        const item = findItemByUuid(uuid);
        return item?.selectedExtras.some(extra => extra.id === extraId && extra.type === extraType) ?? false;
    };

    // Recommendation handlers using Strategy pattern
    const recommendationHandlers = {
        frame: {
            add: (uuid: string, rec: BasketRecommendation) => {
                const frameData = FRAMES.find(frame => frame.id === rec.id);
                updateItemFrame(uuid, frameData || null);
            },
            remove: (uuid: string) => updateItemFrame(uuid, null)
        },
        ribbon: {
            add: (uuid: string) => updateItemRibbon(uuid, true),
            remove: (uuid: string) => updateItemRibbon(uuid, false)
        },
        default: {
            add: (uuid: string, rec: BasketRecommendation) => addExtraToItem(uuid, rec),
            remove: (uuid: string, rec: BasketRecommendation) => removeExtraFromItem(uuid, rec.id, rec.type)
        }
    };

    const addRecommendation = async (uuid: string, recommendation: BasketRecommendation) => {
        const handler = recommendationHandlers[recommendation.type] || recommendationHandlers.default;
        handler.add(uuid, recommendation);
        saveBasket();
        await calculatePricesFromApi();
    };

    const removeRecommendation = async (uuid: string, recommendation: BasketRecommendation) => {
        const item = findItemByUuid(uuid);
        if (!item) return;

        const {type, id} = recommendation;
        const handler = recommendationHandlers[type] || recommendationHandlers.default;

        // Check what type of removal is needed
        const isConfiguredFrame = type === 'frame' && item.frame?.id === id;
        const isConfiguredRibbon = type === 'ribbon' && item.hasRibbon;
        const isSelectedExtra = isExtraSelected(uuid, id, type);

        if (isConfiguredFrame || isConfiguredRibbon || isSelectedExtra) {
            handler.remove(uuid, recommendation);
        }

        saveBasket();
        await calculatePricesFromApi();
    };

    const clearBasket = () => {
        items.value = [];
        previewUri.value = null;
        apiPrices.value.clear();
        priceError.value = null;
        editingItem.value = null;
        saveBasket();
    };

    // Computed properties
    const basketTotal = computed(() =>
        items.value.reduce((total, item) => total + calculateItemTotal(item), 0)
    );

    const itemTotals = computed(() =>
        items.value.reduce((totals, item) => {
            totals[item.id] = calculateItemTotal(item);
            return totals;
        }, {} as Record<number, number>)
    );

    // Public API
    return {
        // State
        items,
        editingItem,
        previewUri,
        isPriceLoading,
        priceError,
        useApiPricing,

        // Computed
        basketTotal,
        itemTotals,

        // Api
        loadItemsApi,
        calculatePricesFromApi,

        // Store
        loadBasket,
        saveBasket,

        // Core operations
        addPosterToBasket,
        removeItemFromBasket,
        setEditingItem,
        updateItemInBasket,
        addRecommendation,
        removeRecommendation,
        savePreview,

        // Utils (exposed for external use)
        calculateItemTotal,

        // Direct item operations (for advanced use cases)
        updateItemFrame,
        updateItemRibbon,
        addExtraToItem,
        removeExtraFromItem,
        isExtraSelected,
        clearBasket,
    };
});
