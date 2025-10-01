<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Size } from '~/components/ui/control-panel/Size.vue';
import type { Frame, Extra } from '~/types'
import { FramePrices } from '~/constants/prices';
import {FRAMES} from "~/constants/frames";
import { useLocationMapStore, useBasketStore } from '~/stores';

const locationMapStore = useLocationMapStore();
const basketStore = useBasketStore();


const props = defineProps<{
  selectedSize: Size;
  frames: Frame[];
  extras: Extra[];
}>();

const mainExtra = props.extras.find(extra => extra.isMain);

const frames = ref<Frame[]>(FRAMES);
const selectedFrame = ref<Frame | null>(locationMapStore.frame);
const selectedRibbon = ref<boolean>(locationMapStore.hasRibbon);

const emit = defineEmits<{
  (e: 'set-frame', frame: Frame | null): void
  (e: 'select-ribbon', ribbon: boolean): void
}>();

const getFramePrice = (frame: Frame): string => {
  return frame.price ? (frame.price / 100).toFixed(2) : '0.00';
}

function toggleRibbon(): void {
  selectedRibbon.value = !selectedRibbon.value;
  emit('select-ribbon', selectedRibbon.value);
  locationMapStore.setRibbon(selectedRibbon.value);
}

function selectFrame(frame: Frame): void {
  selectedFrame.value = frame;
  emit("set-frame", frame);
  locationMapStore.setFrame(frame);
}

function removeFrame(): void {
  selectedFrame.value = null;
  emit("set-frame", null);
  locationMapStore.setFrame(null);
}

onMounted(() => {
  // Initialize with store values if available
  if (locationMapStore.frame && !selectedFrame.value) {
    selectedFrame.value = locationMapStore.frame;
  }
  if (locationMapStore.hasRibbon !== undefined && selectedRibbon.value !== locationMapStore.hasRibbon) {
    selectedRibbon.value = locationMapStore.hasRibbon;
  }

  // Only reset values if we're not editing (no existing values)
  if (!basketStore.editingItem) {
    if (selectedFrame.value) {
      selectedFrame.value = null;
      locationMapStore.setFrame(null);
    }
    if (selectedRibbon.value) {
      selectedRibbon.value = false;
      locationMapStore.setRibbon(false);
    }
  }
})

</script>

<template>
  <div class="min-h-14">
    <span class="font-extrabold mb-2 uppercase mr-2">Frame & Mount:</span>
    <span class="text-[#787878]">
        {{ selectedFrame ? `${selectedFrame.name} + £${getFramePrice(selectedFrame)}` : 'No Frame' }}
        {{ selectedRibbon ? ` & Ribbon + £${(mainExtra.price / 100).toFixed(2)}` : '' }}
      </span>
  </div>

  <div class="flex flex-wrap items-center gap-2.5 lg:gap-5">
    <div
        class="size-[56px] flex justify-center items-center bg-[#F7F7F7] rounded-full font-bold text-xl"
        :class="{ active: !selectedFrame }"
        @click="removeFrame"
    >
      <div class="text-[#818181]">X</div>
    </div>

    <div v-for="frame in props.frames"
        :key="frame.id"
        class="size-[56px] flex justify-center items-center bg-[#F7F7F7] rounded-full font-bold text-xl"
        :class="{ active: selectedFrame?.id === frame.id }"
        @click="selectFrame(frame)">
      <div class="size-full" :style="{ backgroundImage: `url(${frame.thumbnail})` }"></div>
    </div>

    <p class="text-[#787878] font-medium text-2xl">+</p>

    <div
        class="size-[56px] flex justify-center items-center bg-[#F7F7F7] rounded-full font-bold text-xl"
        :class="{ active: selectedRibbon }"
        @click="toggleRibbon"
    >
      <div class="size-full ribbon"></div>
    </div>
  </div>
</template>

<style scoped>
.active {
  outline: 2px solid #A8A490;
  outline-offset: 2px;
}
</style>
