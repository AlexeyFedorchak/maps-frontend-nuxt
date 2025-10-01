<script setup lang="ts">
import type {PrintSize, BasketRecommendation, BasketItem} from "~/types/index";
import type {Frame} from "~/constants/frames";
import CheckoutFrameSelector from './FrameSelector.vue';
import {Button} from '../ui/button';

// Types
interface ExtendedRecommendation extends BasketRecommendation {
  editAction?: 'EDIT' | 'REMOVE';
}

interface ItemTypeConfig {
  icon: string;
  displayTitle?: string;
  editAction: 'EDIT' | 'REMOVE';
}

// Props & Emits
const props = defineProps<{
  itemId: number;
  itemUuid: string;
  basicRecommendations?: BasketRecommendation[];
  advancedRecommendations?: BasketRecommendation[];
  itemFrame?: Frame | null;
  itemRibbon?: boolean;
  selectedSize?: PrintSize;
  selectedExtras?: BasketRecommendation[];
  // Controls which parts of the component are rendered. Defaults to showing everything
  mode?: 'all' | 'added-only' | 'recommendations-only';
}>();

const emit = defineEmits<{
  add: [item: BasketRecommendation, itemUuid: string];
  remove: [item: BasketRecommendation, itemUuid: string];
  'set-frame': [frame: Frame | null, itemUuid: string];
  'select-ribbon': [ribbon: boolean, itemUuid: string];
}>();

const {isMobile} = useBreakpoints();

// Constants
const DEFAULT_CONFIG: ItemTypeConfig = {icon: 'bg-blue-400 rounded', editAction: 'REMOVE'};

const ITEM_TYPE_CONFIG: Record<string, ItemTypeConfig> = {
  frame: {icon: 'black-frame', displayTitle: 'PREMIUM FRAME', editAction: 'EDIT'},
  ribbon: {icon: 'ribbon', displayTitle: 'GIFT WRAP', editAction: 'REMOVE'},
  'wall-strip': {icon: 'wall-strips', editAction: 'REMOVE'},
  card: {icon: 'greetings-card', editAction: 'REMOVE'},
} as const;

// State
const isFrameSelectorOpen = ref(false);

// Utilities
const getFramePrice = (frame: Frame): string => {
  if (!props.selectedSize || !frame) return '0.00';
  return frame.price ? (frame.price / 100).toFixed(2) : '0.00';
};

const isItemAdded = (item: BasketRecommendation): boolean => {
  if (item.type === 'frame') return !!props.itemFrame;
  if (item.type === 'ribbon') return props.itemRibbon;
  return props.selectedExtras?.some(extra => extra.id === item.id && extra.type === item.type) ?? false;
};

const createExtendedItem = (item: BasketRecommendation, config: ItemTypeConfig, customPrice?: string): ExtendedRecommendation => ({
  ...item,
  title: config.displayTitle || item.title,
  price: customPrice || (typeof item.price === 'number' ? (item.price / 100).toFixed(2) : item.price),
  editAction: config.editAction,
});

// Computed
const allRecommendations = computed(() => [
  ...(props.basicRecommendations || []),
  ...(props.advancedRecommendations || [])
]);

const addedItems = computed((): ExtendedRecommendation[] => {
  const items: ExtendedRecommendation[] = [];

  // Add frame
  if (props.itemFrame) {
    const framePrice = getFramePrice(props.itemFrame);
    const config = ITEM_TYPE_CONFIG.frame || DEFAULT_CONFIG;
    items.push(createExtendedItem(
      {...props.itemFrame, price: 0},
      config,
      framePrice
    ));
  }

  // Add ribbon
  if (props.itemRibbon) {
    const ribbonRec = allRecommendations.value.find(rec => rec.type === 'ribbon');
    if (ribbonRec) {
      items.push(createExtendedItem(ribbonRec, ITEM_TYPE_CONFIG.ribbon || DEFAULT_CONFIG));
    }
  }

  // Add other selected extras
  props.selectedExtras?.forEach(extra => {
    const config = ITEM_TYPE_CONFIG[extra.type] || DEFAULT_CONFIG;
    items.push(createExtendedItem(extra, config));
  });

  return items;
});

const availableRecommendations = computed(() => {
  const recommendations = allRecommendations.value.filter(item => !isItemAdded(item));

  // If no frame is selected, show only the first frame as a representative
  // If a frame is already selected, don't show any frames
  if (!props.itemFrame) {
    const frameItems = recommendations.filter(item => item.type === 'frame');
    if (frameItems.length > 0) {
      const firstFrame = frameItems[0];
      if (firstFrame) {
        // Calculate the actual price for the first frame
        const calculatedPrice = getFramePrice(firstFrame as Frame);

        // Use the first frame but modify its display
        const representativeFrame: BasketRecommendation = {
          id: firstFrame.id,
          type: firstFrame.type,
          title: 'FRAMES',
          subTitle: 'Choose a frame style',
          price: parseFloat(calculatedPrice) * 100
        };

        // Remove all frame items and add the representative one
        const nonFrameItems = recommendations.filter(item => item.type !== 'frame');
        return [representativeFrame, ...nonFrameItems];
      }
    }
  }

  // Filter out all frames if one is already selected
  return recommendations.filter(item => item.type !== 'frame');
});

// Handlers
const handleItemAction = (item: BasketRecommendation, action: 'add' | 'remove') => {

  const actions = {
    frame: {
      add: () => emit('add', item, props.itemUuid),
      remove: () => emit('set-frame', null, props.itemUuid)
    },
    ribbon: {
      add: () => emit('select-ribbon', true, props.itemUuid),
      remove: () => emit('select-ribbon', false, props.itemUuid)
    },
    default: {
      add: () => emit('add', item, props.itemUuid),
      remove: () => emit('remove', item, props.itemUuid)
    }
  };

  const handler = actions[item.type as keyof typeof actions] || actions.default;
  handler[action]();
};

const handleEditFrame = () => {
  isFrameSelectorOpen.value = true;
};

const handleSetFrame = (frame: Frame | null) => {
  emit('set-frame', frame, props.itemUuid);
  isFrameSelectorOpen.value = false;
};

const getItemIconClass = (type: string, item?: any) => {
  if (type === 'frame' && item?.className) {
    return item.className;
  }
  return ITEM_TYPE_CONFIG[type]?.icon || DEFAULT_CONFIG.icon;
};
</script>

<template>
  <div>
    <!-- Added Items Section -->
    <div v-if="(props.mode !== 'recommendations-only') && addedItems.length" class="mt-5 md:mt-0 md:mb-8">
      <div class="flex flex-col gap-5 md:gap-2">
        <!-- Mobile view -->
        <template v-if="isMobile">
          <div
            v-for="item in addedItems"
            :key="`added-${item.id}`"
            class="flex items-center gap-6"
          >
            <!-- Icon -->
            <div
              class="flex-none w-20 h-20 flex-shrink-0 flex items-center justify-center bg-cover bg-center rounded-full"
              :class="getItemIconClass(item.type, item)"
            >
            </div>

            <div class="flex-1">
              <!-- Item Info -->
              <div class="flex-1 mb-3">
                <p class="font-extrabold">{{ item.title }}</p>
                <p class="text-[#A9A7A7]">{{ item.subTitle }}</p>
              </div>

              <!-- Actions and Price -->
              <div class="flex justify-between">
                <div class="flex items-center gap-3">

                  <Button
                    v-if="item.editAction === 'EDIT'"
                    variant="ghost"
                    class="text-xs font-extrabold text-[#48647A] border-r-2 border-[#D9D999] leading-none h-auto py-0 pl-0 pr-3 rounded-none"
                    @click="handleEditFrame"
                  >
                    EDIT
                  </Button>
                  <Button
                    variant="ghost"
                    class="text-xs font-extrabold text-[#A5A5A5] leading-none h-auto p-0"
                    @click="handleItemAction(item, 'remove')"
                  >
                    REMOVE
                  </Button>
                </div>

                <div class="w-20 text-right font-black text-xs">
                  £{{ item.price }}
                </div>
              </div>
            </div>
          </div>
        </template>


        <!-- Desktop view -->
        <template v-else>
          <div
            v-for="item in addedItems"
            :key="`added-${item.id}`"
            class="flex items-center gap-2 py-1"
          >
            <!-- Icon -->
            <div
              class="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-cover bg-center rounded-full"
              :class="getItemIconClass(item.type ?? 'frame', item)"
            >
            </div>

            <!-- Item Info -->
            <div class="flex-1">
              <p class="font-extrabold">{{ item.title }}</p>
              <p class="text-[#818181]">{{ item.subTitle }}</p>
            </div>

            <!-- Actions and Price -->
            <div class="flex items-center gap-3 text-sm">
              <Button
                v-if="item.editAction === 'EDIT'"
                variant="ghost"
                class="text-xs md:text-base font-extrabold text-[#48647A] border-r-2 border-[#D9D999] leading-none h-auto py-0 pl-0 pr-3 rounded-none"
                @click="handleEditFrame"
              >
                EDIT
              </Button>
              <Button
                variant="ghost"
                class="text-xs md:text-base font-extrabold text-[#A5A5A5] leading-none h-auto p-0"
                @click="handleItemAction(item, 'remove')"
              >
                REMOVE
              </Button>

              <div class="w-20 text-right font-black text-lg">
                £{{ item.price }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>


    <div
      v-if="(props.mode !== 'added-only') && availableRecommendations.length"
      class="bg-white rounded-lg shadow md:bg-transparent md:shadow-none md:bg p-4 md:p-0 flex flex-col gap-6"
    >
      <div>
        <h3 class="text-sm font-semibold text-black md:bg-[#F7F7F7] w-fit p-3 md:uppercase">Recommended Extras</h3>
        <div class="md:bg-[#F7F7F7] p-6 flex md:flex-col  overflow-auto gap-8 md:gap-2">

          <div
            v-for="item in availableRecommendations"
            :key="`available-${item.id}`"
            class="flex items-center gap-2 py-1 flex-col md:flex-row"
          >
            <div
              class="w-14 h-14 flex-shrink-0 flex items-center justify-center bg-cover bg-center rounded-full"
              :class="getItemIconClass(item.type, item)"
            >
            </div>

            <div class="flex-1 text-center md:text-left">
              <p class="font-extrabold">{{ item.title }}</p>
              <p class="text-[#818181]">{{ item.subTitle }}</p>
            </div>

            <div class="flex items-center gap-3  leading-none">
              <Button
                variant="ghost"
                class="font-extrabold text-[#48647A] h-auto p-0 text-xs md:text-base"
                @click="item.type === 'frame' ? handleEditFrame() : handleItemAction(item, 'add')"
              >
                ADD
              </Button>

              <div class="w-16 text-left pl-3 border-l-2 border-[#D9D9D9] md:text-base text-xs font-extrabold text-[#A5A5A5] leading-none">
                £{{ typeof item.price === 'number' ? (item.price / 100).toFixed(2) : item.price }}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Frame Selector Dialog -->
    <CheckoutFrameSelector
      v-model:open="isFrameSelectorOpen"
      :selected-frame="itemFrame"
      :selected-size="selectedSize"
      @set-frame="handleSetFrame"
    />
  </div>
</template>

<style scoped>
</style>
