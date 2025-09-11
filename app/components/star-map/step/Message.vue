<template>
  <div id="locationContent" :style="isMobile ? 'background-color: #FFFFFF !important' : ''">
    <div class="font-extrabold uppercase mb-2">PERSONAL MESSAGE</div>

    <div class="mb-[12px]">
      <Input :model-value="line1 || ''"
             placeholder="Type here..."
             static-text="Line 1"
             @update:model-value="emit('update-line1', ($event as string))"/>
    </div>

    <div class="mb-[40px]">
      <Input :model-value="line2 || ''"
             static-text="Line 2"
             placeholder="Type here..."
             @update:model-value="emit('update-line2', ($event as string))"/>
    </div>

    <Collapsible v-model:open="isOpen"
                 class="w-full border rounded-[20px] p-5 border-[rgba(112, 112, 112, 0.5)] bg-[#F7f7f7] ">
      <CollapsibleTrigger class="w-full text-center flex items-center justify-center">
        <span class="font-bold uppercase mr-2 leading-[19px]">More Text Options</span>
        <UiIcon :name="isOpen ? 'arrow-up' : 'arrow-down'" font-size="6px" class="pb-1"/>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <UiControlPanelFonts :fonts="FONTS_OPTIONS" :font="font" @font-selected="emit('update-font', $event)"/>

        <div class="mb-[32px]">
          <div class="mb-[12px]">
            <span class="font-bold uppercase mr-2 leading-[19px]">Title Text</span>
          </div>
          <Input :model-value="mapTitle || ''"
                 class="bg-white"
                 placeholder="Type here..."
                 @update:model-value="emit('update-title', ($event as string))"/>
        </div>

        <div class="mb-[32px]">
          <div class="mb-[12px]">
            <span class="font-bold uppercase mr-2 leading-[19px]">Location Text</span>
          </div>
          <Input :model-value="location?.name || ''"
                 class="bg-white"
                 placeholder="Type here..."
                 @update:model-value="emit('update-location-text', ($event as string))"/>
        </div>

        <div class="w-full flex flex-row items-stretch gap-3">
          <div class="mb-[12px]">
            <div class="mb-[12px]">
              <span class="font-bold uppercase mr-2 leading-[19px]">Latitude</span>
            </div>
            <div class="relative">
              <InputNum
                  :model-value="location?.coords?.[1] ?? 0"
                  mode="decimal"
                  class="bg-white"
                  placeholder="Type here..."
                  @update:model-value="emit('update-lat', ($event as string | number))"
              />
              <Select v-model="latHem">
                <SelectTrigger class="absolute top-[50%] right-0 border-0 shadow-none translate-y-[-50%]">
                  <SelectValue class="text-[#A8A490] font-extrabold"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="N">N</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div class="mb-[12px]">
            <div class="mb-[12px]">
              <span class="font-bold uppercase mr-2 leading-[19px]">Longitude</span>
            </div>
            <div class="relative">
              <InputNum
                  :model-value="location?.coords?.[0] ?? 0"
                  mode="decimal"
                  class="bg-white"
                  placeholder="Type here..."
                  @update:model-value="emit('update-long', ($event as string | number))"
              />
              <Select v-model="lonHem">
                <SelectTrigger class="absolute top-[50%] right-0 border-0 shadow-none translate-y-[-50%]">
                  <SelectValue class="text-[#A8A490] font-extrabold"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="E">E</SelectItem>
                    <SelectItem value="W">W</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>

<script setup lang="ts">
import { Input, InputNum } from "~/components/ui/input";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FONTS_OPTIONS } from '~/constants/fonts';
import type { Font, Location } from '~/types';
import type { LatHem, LonHem } from "~/utils/geo";

const { isMobile } = useBreakpoints();

const props = defineProps<{
  line1: string | null;
  line2: string | null;
  font: Font | null;
  mapTitle: string | null;
  location: Location | null;
}>();

const emit = defineEmits<{
  (e: 'update-line1', value: string): void;
  (e: 'update-line2', value: string): void;
  (e: 'update-font', value: Font): void;
  (e: 'update-title', value: string): void;
  (e: 'update-location-text', value: string): void;
  (e: 'update-lat', value: string | number): void;
  (e: 'update-long', value: string | number): void;
  (e: 'update-lat-hem', value: LatHem): void;
  (e: 'update-long-hem', value: LonHem): void;
}>();

const line1 = ref<string | null>('');
const line2 = ref<string | null>('');
const isOpen = ref(false);

const latHem = ref<LatHem>('N');
const lonHem = ref<LonHem>('E');

watch(() => props.location, (loc) => {
  if (!loc?.coords) return;
  const [lon, lat] = loc.coords;
  latHem.value = lat >= 0 ? 'N' : 'S';
  lonHem.value = lon >= 0 ? 'E' : 'W';
}, { immediate: true, deep: true });

watch(latHem, (v) => emit('update-lat-hem', v));
watch(lonHem, (v) => emit('update-long-hem', v));

watch(() => props.line1, (v) => { line1.value = v; });
watch(() => props.line2, (v) => { line2.value = v; });
line1.value = props.line1;
line2.value = props.line2;
</script>
