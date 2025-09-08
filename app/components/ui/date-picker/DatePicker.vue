<script setup lang="ts">
import { computed, type HTMLAttributes } from "vue"
import { useVModel } from "@vueuse/core"
import type { DateValue } from "@internationalized/date"
import { fromDate, getLocalTimeZone } from "@internationalized/date"
import { formatDate } from "@/utils/date"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Props = {
  modelValue?: Date
  defaultValue?: Date
  class?: HTMLAttributes["class"]
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: "update:modelValue", payload: Date | undefined): void
}>()

const modelDate = useVModel<Props, "modelValue", Date | undefined>(
    props,
    "modelValue",
    emit,
    { passive: true, defaultValue: props.defaultValue }
)

const calendarValue = computed<DateValue | undefined>({
  get() {
    if (!modelDate.value) return undefined
    return fromDate(modelDate.value, getLocalTimeZone())
  },
  set(v) {
    modelDate.value = v ? v.toDate(getLocalTimeZone()) : undefined
  }
})

const formattedDate = computed(() => (modelDate.value ? formatDate(modelDate.value) : ""))
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
          variant="outline"
          :class="cn('h-[50px] justify-start text-left font-normal pl-0 pr-[20px] rounded-xl', props.class)"
      >
        <span class="inline-block pl-[20px] pr-[20px] pt-[7px] pb-[7px] border-r border-input">Date</span>
        <span :class="cn(!modelDate && 'text-muted-foreground')">
          {{ modelDate ? formattedDate : "dd/mm/yyyy" }}
        </span>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="calendarValue" initial-focus />
    </PopoverContent>
  </Popover>
</template>
