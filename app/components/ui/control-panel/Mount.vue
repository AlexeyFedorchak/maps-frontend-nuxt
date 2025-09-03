<script setup lang="ts">
import { ref } from 'vue';
import type { Size } from '~/components/ui/control-panel/Size.vue';
import type { Frame } from '~/types'
import { FramePrices } from '~/constants/prices';

const props = defineProps<{
  selectedSize: Size;
}>();

const ribbonPrice = '2.49';

const frames = ref<Frame[]>([
  { id: 'black', name: 'Black Frame', className: 'black-frame', borderClass: 'map-border-black', price: '0.0' },
  { id: 'white', name: 'White Frame', className: 'white-frame', borderClass: 'map-border-white', price: '0.0' },
  { id: 'natural', name: 'Natural Frame', className: 'natural-frame', borderClass: 'map-border-wood', price: '0.0' },
]);

const selectedFrame = ref<Frame | null>(null);
const selectedRibbon = ref<boolean>(false);

const emit = defineEmits<{
  (e: 'set-frame', frame: Frame | null): void
  (e: 'select-ribbon', ribbon: boolean): void
}>();

const getFramePrice = (frame: Frame): string => {
  if (!props.selectedSize || !frame) return '0.00';
  return `${FramePrices[props.selectedSize.id]?.[frame.id]}` || '0.00';
}

function toggleRibbon(): void {
  selectedRibbon.value = !selectedRibbon.value;
  emit('select-ribbon', selectedRibbon.value);
}

function selectFrame(frame: Frame): void {
  frame.price = getFramePrice(frame!);
  selectedFrame.value = frame;
  emit("set-frame", frame);
}

function removeFrame(): void {
  selectedFrame.value = null;
  emit("set-frame", null);
}

</script>

<template>
  <div class="mt-5 mb-3">
    <span class="section-title uppercase mr-2">Frame & Mount:</span>
    <span class="sub-title">
        {{ selectedFrame ? `${selectedFrame.name} + £${getFramePrice(selectedFrame)}` : 'No Frame' }}
        {{ selectedRibbon ? ` & Ribbon + £${ribbonPrice}` : '' }}
      </span>
  </div>

  <div class="option-section">
    <div
        class="option mr-4"
        :class="{ active: !selectedFrame }"
        @click="removeFrame"
    >
      <div class="sub-title">X</div>
    </div>

    <div v-for="frame in frames"
        :key="frame.id"
        class="option mr-4"
        :class="{ active: selectedFrame?.id === frame.id }"
        @click="selectFrame(frame)">
      <div :class="frame.className"></div>
    </div>

    <p class="plus-sign">+</p>

    <div
        class="option flex-c"
        :class="{ active: selectedRibbon }"
        @click="toggleRibbon"
    >
      <div class="ribbon"></div>
    </div>
  </div>
</template>

<style scoped>

</style>