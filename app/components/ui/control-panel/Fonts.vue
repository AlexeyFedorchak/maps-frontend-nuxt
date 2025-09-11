<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import {Label} from '@/components/ui/label'
import {Badge} from '@/components/ui/badge'
import type {Font} from "~/types";

const props = defineProps<{
  fonts: Font[]
  font: Font | null
}>()

const emit = defineEmits<{
  (e: 'font-selected', font: Font): void
}>()

const selectedId = ref<string | number | null>(props.font?.id ?? null)

watch(
    () => props.font,
    (val) => {
      selectedId.value = val?.id ?? null
    },
    {immediate: true}
)

function onChange(id: string | number) {
  const t = props.fonts.find(x => x.id === id)
  if (t) emit('font-selected', t)
}
</script>

<template>
  <div class="mb-4 pt-7">
    <span class="font-extrabold mb-2 uppercase mr-2">Type</span>
  </div>

  <RadioGroup
      v-model="selectedId"
      @update:modelValue="onChange"
      class="flex flex-wrap gap-2 mb-14">
    <div
        v-for="t in fonts"
        :key="t.id"
        class="group">
      <RadioGroupItem :id="`font-${t.id}`" :value="t.id" class="sr-only"/>

      <Label :for="`font-${t.id}`" class="cursor-pointer">
        <div class="h-10 min-w-[84px] px-4 rounded-[12px] border-2 bg-white
                 grid place-items-center transition pt-[4px] pb-[4px] pl-[12px] pr-[12px]
                 data-[checked=true]:border-[#B5B2A1]"
            :data-checked="selectedId === t.id">
          <NuxtImg
              :src="t.preview"
              :alt="t.label"
              format="png"
              class="max-h-[28px] max-w-[64px] object-contain"
              loading="lazy"
              decoding="async"
          />
        </div>
      </Label>
    </div>
  </RadioGroup>
</template>
