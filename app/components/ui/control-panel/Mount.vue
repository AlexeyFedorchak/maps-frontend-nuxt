<script setup lang="ts">
import { ref } from 'vue';
import type { Size } from '~/components/ui/control-panel/Size.vue';
import type { Frame } from '~/types'
import { FramePrices } from '~/constants/prices';
import {FRAMES} from "~/constants/frames";

const props = defineProps<{
  selectedSize: Size;
}>();

const ribbonPrice = '2.49';

const frames = ref<Frame[]>(FRAMES);

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
  <div class="min-h-14">
    <span class="font-extrabold mb-2 uppercase mr-2">Frame & Mount:</span>
    <span class="text-[#787878]">
        {{ selectedFrame ? `${selectedFrame.name} + £${getFramePrice(selectedFrame)}` : 'No Frame' }}
        {{ selectedRibbon ? ` & Ribbon + £${ribbonPrice}` : '' }}
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

    <div v-for="frame in frames"
        :key="frame.id"
        class="size-[56px] flex justify-center items-center bg-[#F7F7F7] rounded-full font-bold text-xl"
        :class="{ active: selectedFrame?.id === frame.id }"
        @click="selectFrame(frame)">
      <div class="size-full" :class="frame.className"></div>
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

/** classes black-frame, white-frame, natural-frame - takes from props  */
.black-frame {
  background-image: url("/images/black-frame.svg");
}

.white-frame {
  background-image: url("/images/white-frame.svg");
}

.natural-frame {
  background-image: url("/images/natural-frame.svg");
}

.ribbon {
  background-image: url("/images/ribbon.svg");
}
</style>