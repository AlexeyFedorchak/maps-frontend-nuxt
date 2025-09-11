<template>
  <div id="chooseContent">
    <UiControlPanelSize class="mb-12" @size-selected="selectSize($event)"/>
    <UiControlPanelMount v-if="selectedSize"
                         :selected-size="selectedSize"
                         @set-frame="emit('set-frame', $event)"
                         @select-ribbon="emit('select-ribbon', $event)"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useLocationMapStore } from '~/stores';
import type { Size } from '~/components/ui/control-panel/Size.vue';
import type { Frame } from '~/types'
import { FramePrices } from '~/constants/prices';

const emit = defineEmits<{
  (e: 'layout-selected', layout: any): void;
  (e: 'set-frame', colorScheme: any): void;
  (e: 'select-ribbon', colorScheme: any): void;
  (e: 'total-updated', total: number): void;
}>();

const locationMapStore = useLocationMapStore();
const {
  frame: selectedFrame,
  hasRibbon: selectedRibbon
} = storeToRefs(locationMapStore);

const selectedSize = ref<Size | null>(null);

const getFramePrice = (frame: Frame): number => {
  if (!selectedSize.value || !frame) return 0;
  return FramePrices[selectedSize.value.id]?.[frame.id] || 0;
}

const totalPrice = computed((): number => {
  let total = 0;
  
  if (selectedSize.value) {
    total += selectedSize.value.numericPrice;
  }
  
  if (selectedFrame.value && selectedSize.value) {
    total += getFramePrice(selectedFrame.value);
  }
  
  if (selectedRibbon.value) {
    total += 2.49;
  }
  
  return Math.round(total * 100) / 100;
})

function selectSize(size: Size): void {
  selectedSize.value = size
}

watch(totalPrice, (newTotal) => {
  emit('total-updated', newTotal)
}, { immediate: true });

onMounted(() => {
  emit('total-updated', totalPrice.value);
  
  if (selectedFrame.value) {
    locationMapStore.setFrame(null);
  }
  if (selectedRibbon.value) {
    locationMapStore.setRibbon(false);
  }
})
</script>

<style scoped>
.mb-3 {
  margin-bottom: 1rem;
}

.mt-5 {
  margin-top: 2rem;
}

.flex-c {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
