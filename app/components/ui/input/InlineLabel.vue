<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '@/lib/utils';

const props = defineProps<{
  label: string
  placeholder?: string
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  type?: 'text' | 'password' | 'tel'
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const labelRef = ref<HTMLElement | null>(null)
</script>

<template>
  <div class="relative w-full">
    <span 
      ref="labelRef" 
      class="absolute top-1/2 left-4 -translate-y-1/2 inline-block text-sm font-bold text-gray-800 border-r border-gray-300 pr-4 pointer-events-none select-none"
    >
      {{ label }}
    </span>
    <input
      v-model="modelValue"
      :type="type || 'text'"
      :placeholder="placeholder || ''"
      :style="{paddingLeft: `${labelRef?.offsetWidth + 32}px`}"
      :class="cn(
        'file:text-foreground placeholder:text-gray-400 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-[50px] w-full min-w-0 rounded-xl border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'border-gray-200 focus:border-blue-500',
        props.class,
      )"
    >
  </div>
</template>
