<template>
  <div id="locationContent" :style="isMobile ? 'background-color: #FFFFFF !important' : ''">
    <div class="font-extrabold uppercase mb-2">PERSONAL MESSAGE</div>

    <div class="mb-[12px]">
      <Input :model-value="line1 || ''"
             placeholder="Type here..."
             static-text="Line 1"
             @update:model-value="emit('update-line1', ($event as string))"/>
    </div>

    <div class="mb-[12px]">
      <Input :model-value="line2 || ''"
             static-text="Line 2"
             placeholder="Type here..."
             @update:model-value="emit('update-line2', ($event as string))"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from "~/components/ui/input";

const {isMobile} = useBreakpoints();

const props = defineProps<{
  line1: string | null;
  line2: string | null;
}>();

const emit = defineEmits<{
  (e: 'update-line1', value: string): void;
  (e: 'update-line2', value: string): void;
}>()

const line1 = ref<string | null>('');
const line2 = ref<string | null>('');


watch(() => props.line1, (newTitle) => {
  line1.value = newTitle;
});

watch(() => props.line2, (newSubtitle) => {
  line2.value = newSubtitle;
});

line1.value = props.line1;
line2.value = props.line2;
</script>

<style scoped>

</style>
