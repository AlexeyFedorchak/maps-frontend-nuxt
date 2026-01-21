<script setup lang="ts">
import { ref, computed } from 'vue';
import { FRAMES, type Frame } from '~/constants/frames';
import { FramePrices } from '~/constants/prices';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import type { PrintSize } from '~/types/index';

const props = defineProps<{
  selectedFrame?: Frame | null;
  selectedSize?: PrintSize;
  open?: boolean;
}>();

const emit = defineEmits<{
  (e: 'set-frame', frame: Frame | null): void;
  (e: 'update:open', open: boolean): void;
}>();

const frames = ref<Frame[]>(FRAMES);

// Computed property with setter for two-way binding
const isOpen = computed({
  get: () => props.open || false,
  set: (value: boolean) => emit('update:open', value)
});

const getFramePrice = (frame: Frame | null): string => {
  if (!frame) return '0.00';
  return frame.price ? (frame.price / 100).toFixed(2) : '0.00';
}

function selectFrame(frame: Frame | null): void {
  emit("set-frame", frame);
  closeDialog();
}

function closeDialog() {
  isOpen.value = false;
}
</script>

<template>
  <!-- Dialog -->
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle class="text-xl font-bold">Select Frame</DialogTitle>
        <DialogDescription>Select a frame for your print</DialogDescription>
      </DialogHeader>

      <div class="space-y-4">
        <div
          v-for="frame in frames"
          :key="frame.id"
          class="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
          :class="{ 'border-blue-500 bg-blue-50': selectedFrame?.id === frame.id }"
          @click="selectFrame(frame)"
        >
          <div class="flex items-center gap-3">
            <div class="size-[40px] flex justify-center items-center bg-[#F7F7F7] rounded-full">
              <div class="size-full" :class="frame.className"></div>
            </div>
            <div>
              <p class="font-medium">{{ frame.name }}</p>
              <p class="text-sm text-gray-500">{{ frame.subTitle }}</p>
            </div>
          </div>
          <p class="font-medium">£{{ getFramePrice(frame) }}</p>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<style scoped>
.active {
  outline: 2px solid #A8A490;
  outline-offset: 2px;
}
</style>
