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
  <div>
    <span class="section-title uppercase mr-2">Theme:</span>
    <span class="sub-title">{{ props?.theme?.name || 'Original-black' }}</span>
  </div>

  <div class="theme-grid">
    <div
        v-for="theme in themes"
        :key="theme.id"
        class="theme-option"
        :class="{ selected: props?.theme?.id === theme.id }"
        @click="emit('theme-selected', theme)"
    >
      <div class="theme-preview" :style="{backgroundColor: theme.bg || null}">
        <div v-if="theme.badge" class="theme-badge">{{ theme.badge }}</div>
        <img :src="theme.preview" :alt="theme.name">
      </div>
      <div class="theme-name">{{ theme.name }}</div>
    </div>
  </div>
</template>

<style scoped>
.theme-grid {
  display: flex !important;
  overflow-x: auto !important;
  gap: 16px !important;
  margin-left: -20px !important;
  padding: 20px 0 20px 20px !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.theme-grid::-webkit-scrollbar {
  display: none;
}

.theme-grid {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  margin-bottom: 25px;
  margin-left: -20px;
  padding: 20px 0 20px 20px;
}

.theme-option {
  flex-shrink: 0;
  cursor: pointer;
}

.theme-name {
  display: none;
}

.theme-preview {
  aspect-ratio: 1 / 1;
  border-radius: 100%;
  overflow: hidden;
  position: relative;
  border: none;
  width: 56px;
  height: 56px;
  margin: 2px;
  /*transition: all 0.2s ease-in-out;*/
}

.theme-option.selected, .theme-option:hover {
  border: 2px solid #A8A490;
  margin: 0 -2px;
  border-radius: 100%;
}

.theme-option.selected .theme-preview {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.theme-option:hover .theme-preview {
  /*transform: scale(0.55);*/
}

.theme-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.theme-badge {
  display: none;
}

.theme-name {
  font-size: 12px;
  font-weight: 500;
  color: #666;
}

.theme-option.selected .theme-name {
  color: #333;
  font-weight: 600;
}
</style>