<script setup lang="ts">

import type { Theme } from '~/types';

const props = defineProps<{
  themes: Theme[];
  theme: Theme | null;
}>();

const emit = defineEmits<{
  (e: 'theme-selected', theme: Theme): void;
}>();
</script>

<template>
  <div class="mb-4">
    <span class="font-extrabold mb-2 uppercase mr-2">Theme:</span>
    <span class="text-[#787878]">{{ props?.theme?.name || 'Original-black' }}</span>
  </div>

  <div class="flex flex-wrap gap-[2%] md:gap-1 lg:gap-3 mb-14">
    <div
        v-for="theme in props.themes"
        :key="theme.id"
        class="theme-option w-[15%] lg:size-15"
        :class="{ selected: props?.theme?.id === theme.id }"
        @click="emit('theme-selected', theme)"
    >
      <div class="theme-preview aspect-square rounded-full overflow-hidden relative border-none w-full h-full"
           :style="{ '--bg-color': theme?.bgColor }">
        <div v-if="theme.badge" class="theme-badge">{{ theme.badge }}</div>
        <img class="object-cover size-full" :src="theme.preview" :alt="theme.name">
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme-preview {
  background-color: var(--bg-color);
}

.theme-option.selected,
.theme-option:hover {
  outline: 2px solid #A8A490;
  border-radius: 100%;
}

.theme-option.selected .theme-preview {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.theme-badge {
  display: none;
}
</style>
