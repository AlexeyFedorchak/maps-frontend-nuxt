<template>
  <div id="chooseContent">
    <UiControlPanelSize :sizes="props.sizes || []" :selected-size="selectedSize" class="mb-12" @size-selected="selectSize($event)"/>
    <UiControlPanelMount v-if="selectedSize"
                         :frames="props.frames || []"
                         :extras="props.extras || []"
                         :selected-size="selectedSize"
                         @set-frame="emit('set-frame', $event)"
                         @select-ribbon="emit('select-ribbon', $event)"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useLocationMapStore, useBasketStore } from '~/stores';
import type { Size } from '~/components/ui/control-panel/Size.vue';
import type {Frame, Theme, Extra} from '~/types'
import { FramePrices } from '~/constants/prices';

const props = defineProps<{
  sizes?: Size[];
  frames?: Frame[];
  extras?: Extra[];
}>();

const emit = defineEmits<{
  (e: 'layout-selected', layout: any): void;
  (e: 'set-frame', colorScheme: any): void;
  (e: 'select-ribbon', colorScheme: any): void;
  (e: 'total-updated', total: number): void;
}>();

const locationMapStore = useLocationMapStore();
const basketStore = useBasketStore();
const {
  frame: selectedFrame,
  hasRibbon: selectedRibbon
} = storeToRefs(locationMapStore);

const selectedSize = ref<Size | null>(locationMapStore.selectedSize);

const getFramePrice = (frame: Frame): number => {
  if (!selectedSize.value || !frame) return 0;
  return FramePrices[selectedSize.value.id]?.[frame.id] || 0;
}

const totalPrice = computed((): number => {
  let total = 0;

  if (selectedSize.value) {
    total += selectedSize.value.price;
  }

  if (selectedFrame.value && selectedSize.value) {
    total += selectedFrame.value.price;
  }

  if (selectedRibbon.value) {
    total += 249;
  }

  return Math.round(total * 100) / 10000;
})

function selectSize(size: Size): void {
  locationMapStore.setSelectedSize(size);
  selectedSize.value = size
}

watch(totalPrice, (newTotal) => {
  emit('total-updated', newTotal)
}, { immediate: true });

onMounted(() => {
  emit('total-updated', totalPrice.value);

  // Initialize selectedSize from store if available
  if (locationMapStore.selectedSize && !selectedSize.value) {
    selectedSize.value = locationMapStore.selectedSize;
  }

  // Only reset frame and ribbon if we're not editing (no existing values)
  if (!basketStore.editingItem) {
    if (selectedFrame.value) {
      locationMapStore.setFrame(null);
    }
    if (selectedRibbon.value) {
      locationMapStore.setRibbon(false);
    }
  }
})

// Watch for changes in store's selectedSize
watch(() => locationMapStore.selectedSize, (newSize) => {
  if (newSize) {
    selectedSize.value = newSize;
  }
}, { immediate: true })
</script>

<style scoped>
</style>
