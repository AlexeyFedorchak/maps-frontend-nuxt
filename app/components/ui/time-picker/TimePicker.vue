<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { ref, watch } from "vue"
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"

const props = defineProps<{
  staticText?: string
  placeholder?: string
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes["class"]
}>()

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const staticTextRef = ref<HTMLElement | null>(null)
const inputText = ref<string>(typeof modelValue.value === "number" ? String(modelValue.value) : (modelValue.value as string) || "")

watch(
    () => modelValue.value,
    (v) => {
      const str = typeof v === "number" ? String(v) : (v || "") as string
      if (str !== inputText.value) inputText.value = str
    }
)

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max)
const z2 = (n: number) => (n < 10 ? `0${n}` : `${n}`)

function normalizeTime(raw: string, strict = false): string {
  const digits = raw.replace(/[^\d]/g, "").slice(0, 4)
  const a = digits.slice(0, 2)
  const b = digits.slice(2, 4)

  if (!strict) {
    if (digits.length <= 2) return a
    return `${a}:${b}`
  }

  if (a.length === 0) return ""
  const h = clamp(parseInt(a, 10), 0, 23)
  if (digits.length <= 2) return z2(h)

  if (b.length === 0) return `${z2(h)}:`
  const m = clamp(parseInt(b, 10), 0, 59)
  return `${z2(h)}:${z2(m)}`
}

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  const partial = normalizeTime(val, false)

  let out = partial
  const d = partial.replace(/[^\d]/g, "")
  if (d.length >= 1) {
    const h1 = parseInt(d[0], 10)
    if (h1 > 2) out = "0" + d[0] + (d.length > 1 ? ":" + d.slice(1, 3) : "")
  }
  if (d.length >= 2) {
    const h1 = parseInt(d[0], 10)
    const h2 = parseInt(d[1], 10)
    if (h1 === 2 && h2 > 3) out = "23" + (d.length > 2 ? ":" + d.slice(2, 4) : "")
  }
  if (d.length >= 3) {
    const m1 = parseInt(d[2], 10)
    if (m1 > 5) out = partial.replace(/:(\d)/, ":5")
  }

  inputText.value = out

  if (/^\d{2}:\d{2}$/.test(out)) {
    const [hh, mm] = out.split(":").map((n) => parseInt(n, 10))
    const valid = clamp(hh, 0, 23) === hh && clamp(mm, 0, 59) === mm
    modelValue.value = valid ? out : ""
  } else {
    modelValue.value = ""
  }
}

function onBlur() {
  const strict = normalizeTime(inputText.value, true)
  inputText.value = strict
  modelValue.value = /^\d{2}:\d{2}$/.test(strict) ? strict : ""
}

function onKeydown(e: KeyboardEvent) {
  const allowed =
      ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"].includes(e.key) ||
      /[0-9]/.test(e.key)
  if (!allowed) e.preventDefault()
}
</script>

<template>
  <div class="relative w-full">
    <span
        ref="staticTextRef"
        class="absolute top-[8px] inline-block pl-[20px] pr-[20px] pt-[7px] pb-[7px] border-r border-input"
    >
      {{ staticText || "Time" }}
    </span>

    <input
        :value="inputText"
        @input="onInput"
        @blur="onBlur"
        @keydown="onKeydown"
        inputmode="numeric"
        autocomplete="off"
        spellcheck="false"
        data-slot="input"
        :placeholder="placeholder || '00:00'"
        :style="{ paddingLeft: `${(staticTextRef?.offsetWidth || 0) + 18}px` }"
        :class="cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-[50px] w-full min-w-0 rounded-xl border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        props.class
      )"
    />
  </div>
</template>
