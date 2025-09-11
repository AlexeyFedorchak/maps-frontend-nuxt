<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  placeholder?: string
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', v: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

function filterDecimal(raw: string) {
  let s = raw.replace(/[^\d\-\.,]/g, '')
  s = s.replace(',', '.')
  const firstMinus = s.indexOf('-')
  if (firstMinus > 0) s = s.replace(/-/g, '')
  if (firstMinus === 0) s = '-' + s.slice(1).replace(/-/g, '')
  const firstDot = s.indexOf('.')
  if (firstDot !== -1) {
    s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, '')
  }
  return s
}

function onInput(e: Event) {
  const el = e.target as HTMLInputElement
  const next = filterDecimal(el.value)
  if (next !== el.value) {
    el.value = next
  }
  modelValue.value = next
}
</script>

<template>
  <div class="relative w-full">
    <input
        v-model="modelValue"
        type="text"
        inputmode="decimal"
        pattern="-?[0-9]*[.,]?[0-9]*"
        :placeholder="placeholder || ''"
        @input="onInput"
        :class="cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-[50px] w-full min-w-0 rounded-xl border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        props.class,
      )"
    />
  </div>
</template>
