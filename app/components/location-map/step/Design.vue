<template>
  <div id="designContent">
    <div>
      <span class="section-title uppercase mr-2">Theme:</span>
      <span class="sub-title">{{ props?.design?.name || 'Original-black' }}</span>
    </div>

    <div class="design-grid">
      <div
          v-for="design in LOCATION_MAP_DESIGNS"
          :key="design.id"
          class="design-option"
          :class="{ selected: props?.design?.id === design.id }"
          @click="emit('design-selected', design)"
      >
        <div class="design-preview">
          <div v-if="design.badge" class="design-badge">{{ design.badge }}</div>
          <img :src="design.preview" :alt="design.name">
        </div>
        <div class="design-name">{{ design.name }}</div>
      </div>
    </div>

    <div class="layout-section">
      <div>
        <span class="section-title uppercase mr-2">Layout:</span>
        <span class="sub-title">{{ props?.layout?.name || 'Photo' }}</span>
      </div>

      <div class="layout-grid mt-4">
        <div
            v-for="layout in LOCATION_MAP_LAYOUTS"
            :key="layout.id"
            class="layout-option"
            :class="{ selected: props?.layout?.id === layout.id }"
            @click="emit('layout-selected', layout)"
        >
          <div class="layout-name flex-c">{{ layout.name }}</div>
        </div>
      </div>

      <div v-if="false" id="colorSelectorContainer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Design, Layout } from '~/types'
import { LOCATION_MAP_LAYOUTS, LOCATION_MAP_DESIGNS } from '~/constants/location-map';

const props = defineProps<{
  layout: Layout | null;
  design: Design | null;
}>();

const emit = defineEmits<{
  (e: 'design-selected', design: Design): void;
  (e: 'layout-selected', layout: Layout): void;
}>()
</script>

<style scoped>
.mt-4 {
  margin-top: 1rem;
}

.design-grid {
  display: flex !important;
  overflow-x: auto !important;
  gap: 16px !important;
  margin-left: -20px !important;
  padding: 20px 0 20px 20px !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.design-grid::-webkit-scrollbar {
  display: none;
}
</style>
