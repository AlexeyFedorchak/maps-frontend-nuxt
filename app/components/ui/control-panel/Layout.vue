<script setup lang="ts">
import type { Layout } from '~/types';

const props = defineProps<{
  title: string;
  layouts: Layout[];
  layout: Layout | null;
}>();

const emit = defineEmits<{
  (e: 'layout-selected', layout: Layout): void;
}>()
</script>

<template>
  <div class="layout-section">
    <div>
      <span class="section-title uppercase mr-2">{{props.title}}:</span>
      <span class="sub-title">{{ props?.layout?.name || 'Photo' }}</span>
    </div>

    <div class="layout-grid mt-4">
      <div
          v-for="layout in layouts"
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
</template>

<style scoped>

</style>