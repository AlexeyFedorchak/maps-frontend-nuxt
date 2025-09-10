<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

const props = defineProps<{
  fonts: Font[]
  font: font | null
}>()

const emit = defineEmits<{
  (e: 'font-selected', font: font): void
}>()

const selectedId = ref<string | number | null>(props.font?.id ?? null)

watch(
    () => props.font,
    (val) => { selectedId.value = val?.id ?? null },
    { immediate: true }
)

const selectedFontName = computed(() => props.font?.name || 'Original-black')

function onChange(id: string | number) {
  const t = props.fonts.find(x => x.id === id)
  if (t) emit('font-selected', t)
}
</script>

<template>
  <div class="mb-4">
    <span class="font-extrabold mb-2 uppercase mr-2">Font:</span>
    <span class="text-[#787878]">{{ selectedFontName }}</span>
  </div>

  <RadioGroup
      v-model="selectedId"
      @update:modelValue="onChange"
      class="flex flex-wrap gap-3 mb-14"
  >
    <div
        v-for="t in fonts"
        :key="t.id"
        class="group relative"
    >
      <RadioGroupItem
          :id="`font-${t.id}`"
          :value="t.id"
          class="sr-only"
      />

      <Label
          :for="`font-${t.id}`"
          class="cursor-pointer rounded-full outline-none"
      >
        <div
            class="relative aspect-square size-16 rounded-full overflow-hidden ring-0 transition
                 group-hover:ring-2 group-hover:ring-[#A8A490]/60
                 data-[checked=true]:ring-2 data-[checked=true]:ring-[#A8A490]
                 data-[checked=true]:shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            :data-checked="selectedId === t.id"
            :style="{ backgroundColor: t.bg || 'transparent' }"
        >
          <img
              class="object-cover w-full h-full"
              :src="t.preview"
              :alt="t.name"
              loading="lazy"
              decoding="async"
          />

          <Badge
              v-if="t.badge"
              variant="secondary"
              class="absolute left-1.5 top-1.5 rounded-full px-2 py-0.5 text-[10px] leading-none"
          >
            {{ t.badge }}
          </Badge>
        </div>
      </Label>
    </div>
  </RadioGroup>
</template>
