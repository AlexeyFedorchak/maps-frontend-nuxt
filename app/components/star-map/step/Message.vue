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

    <Collapsible v-model:open="isOpen" class="w-full border rounded-xl p-3 border-[rgba(112, 112, 112, 0.5)] bg-[#F7f7f7] ">
      <CollapsibleTrigger class="w-full text-center flex items-center justify-center">
        <span class="font-bold uppercase mr-2">More Text Options</span>
        <UiIcon :name="isOpen ? 'arrow-up' : 'arrow-down'" font-size="6px" class="pb-2"/>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div class="font-bold uppercase mb-2">Type</div>
        <ControlPanelFonts :fonts="FONTS_OPTIONS" :font="font"/>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script setup lang="ts">
import { Input } from "~/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { FONTS_OPTIONS } from '~/constants/fonts';
import { ControlPanelFonts } from '~/components/control-panel'

const {isMobile} = useBreakpoints();

const props = defineProps<{
  line1: string | null;
  line2: string | null;
  font: Font | null;
}>();

const emit = defineEmits<{
  (e: 'update-line1', value: string): void;
  (e: 'update-line2', value: string): void;
  (e: 'update-font', value: Font): void;
}>()

const line1 = ref<string | null>('');
const line2 = ref<string | null>('');

const isOpen = ref(false);


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
