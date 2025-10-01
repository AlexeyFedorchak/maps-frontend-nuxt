<script setup lang='ts'>
import type { HTMLAttributes } from 'vue';
import { ref, watch, onMounted } from 'vue';
import { useVModel } from '@vueuse/core';
import { cn } from '@/lib/utils';
import { Checkbox } from '~/components/ui/checkbox';

const props = defineProps<{
  staticText?: string,
  placeholder?: string,
  defaultValue?: string | number | null,
  modelValue?: string | number | null,
  class?: HTMLAttributes['class'],
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number | null): void
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue ?? null,
})

const staticTextRef = ref<HTMLElement | null>(null);
const inputText = ref<string>(typeof modelValue.value === 'number' ? String(modelValue.value) : (modelValue.value as string) || '');
const isNoTime = ref<boolean>(false);
const savedTime = ref<string | null>(null);

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);
const z2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);

function normalizeTime(raw: string, strict = false): string {
  const digits = raw.replace(/[^\d]/g, '').slice(0, 4);
  const a = digits.slice(0, 2);
  const b = digits.slice(2, 4);
  if (!strict) {
    if (digits.length <= 2) return a;
    return `${a}:${b}`;
  }
  if (a.length === 0) return '';
  const h = clamp(parseInt(a, 10), 0, 23);
  if (digits.length <= 2) return z2(h);
  if (b.length === 0) return `${z2(h)}:`;
  const m = clamp(parseInt(b, 10), 0, 59);
  return `${z2(h)}:${z2(m)}`;
}

function onInput(e: Event) {
  if (!isNoTime.value) return;
  const val = (e.target as HTMLInputElement).value;
  const partial = normalizeTime(val, false);

  let out = partial;
  const d = partial.replace(/[^\d]/g, '');
  if (d.length >= 1) {
    const h1 = parseInt(d[0], 10);
    if (h1 > 2) out = '0' + d[0] + (d.length > 1 ? ':' + d.slice(1, 3) : '');
  }
  if (d.length >= 2) {
    const h1 = parseInt(d[0], 10);
    const h2 = parseInt(d[1], 10);
    if (h1 === 2 && h2 > 3) out = '23' + (d.length > 2 ? ':' + d.slice(2, 4) : '');
  }
  if (d.length >= 3) {
    const m1 = parseInt(d[2], 10);
    if (m1 > 5) out = partial.replace(/:(\d)/, ':5');
  }

  inputText.value = out;

  if (/^\d{2}:\d{2}$/.test(out)) {
    const [hh, mm] = out.split(':').map((n) => parseInt(n, 10));
    const valid = clamp(hh, 0, 23) === hh && clamp(mm, 0, 59) === mm;
    modelValue.value = valid ? out : null;
    if (valid) savedTime.value = out;
  } else {
    modelValue.value = null;
  }
}

function onBlur() {
  if (!isNoTime.value) return;
  const d = (inputText.value || '').replace(/[^\d]/g, '').slice(0, 4);
  const hhStr = d.slice(0, 2).padEnd(2, '0');
  const mmStr = d.slice(2, 4).padEnd(2, '0');
  const h = clamp(parseInt(hhStr || '0', 10), 0, 23);
  const m = clamp(parseInt(mmStr || '0', 10), 0, 59);
  const strict = `${z2(h)}:${z2(m)}`;
  inputText.value = strict;
  modelValue.value = strict;
  savedTime.value = strict;
}

function onKeydown(e: KeyboardEvent) {
  if (!isNoTime.value) { e.preventDefault(); return; }

  const allowed = ['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'];
  if (allowed.includes(e.key)) return;

  if (!/[0-9]/.test(e.key)) { e.preventDefault(); return; }

  const el = e.target as HTMLInputElement;
  const digits = el.value.replace(/\D/g, '');
  const sel = (el.selectionEnd ?? 0) - (el.selectionStart ?? 0);

  if (digits.length - sel >= 4) e.preventDefault();
}

function toggleNoTime(v: boolean) {
  isNoTime.value = v;
  if (v) {
    const restored = savedTime.value ?? '00:00';
    inputText.value = restored;
    modelValue.value = restored;
  } else {
    if (inputText.value) {
      const d = inputText.value.replace(/[^\d]/g, '').slice(0, 4);
      const hhStr = d.slice(0, 2).padEnd(2, '0');
      const mmStr = d.slice(2, 4).padEnd(2, '0');
      const h = clamp(parseInt(hhStr || '0', 10), 0, 23);
      const m = clamp(parseInt(mmStr || '0', 10), 0, 59);
      savedTime.value = `${z2(h)}:${z2(m)}`;
    }
    inputText.value = '';
    modelValue.value = null;
  }
}

function onBeforeInput(e: InputEvent) {
  if (!isNoTime.value) {
    e.preventDefault();
    return;
  }

  if (!e.inputType.startsWith('insert')) return;

  const data = (e as any).data ?? '';
  if (!/^\d+$/.test(data)) {
    e.preventDefault();
    return;
  }

  const el = e.target as HTMLInputElement;
  const digits = el.value.replace(/\D/g, '');
  const sel = (el.selectionEnd ?? 0) - (el.selectionStart ?? 0);

  if (digits.length - sel + data.length > 4) {
    e.preventDefault();
  }
}

onMounted(() => {
  const empty = !modelValue.value;
  toggleNoTime(empty);
})

watch(
    () => modelValue.value,
    (v) => {
      if (!isNoTime.value) return;
      const str = typeof v === 'number' ? String(v) : (v || '') as string;
      if (str !== inputText.value) inputText.value = str;
      if (/^\d{2}:\d{2}$/.test(str)) savedTime.value = str;
    }
);
</script>

<template>
  <div class="relative w-full">
    <span
        ref="staticTextRef"
        class="absolute top-[50%] translate-y-[-50%] pl-[20px] pr-[20px] pt-[5px] pb-[5px] border-r border-input flex items-center space-x-2">
      <Checkbox :model-value="isNoTime" @update:model-value="toggleNoTime"/>
      <span>{{ staticText || "Time" }}</span>
    </span>

    <input
        :value="inputText"
        @beforeinput="onBeforeInput"
        @input="onInput"
        @blur="onBlur"
        @keydown="onKeydown"
        :disabled="!isNoTime"
        inputmode="numeric"
        autocomplete="off"
        spellcheck="false"
        data-slot="input"
        maxlength="5"
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
