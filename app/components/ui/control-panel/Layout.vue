<script setup lang="ts">
import type { Layout } from '~/types';

const props = defineProps<{
  title: string;
  layouts: Layout[] | any;
  layout: Layout | null;
  isMultiselect?: boolean;
}>();

const emit = defineEmits<{
  (e: 'layout-selected', layout: Layout): void;
}>();

const selectedIds = computed(() => {
  if (props.isMultiselect) {
    return new Set(
        (props.layouts ?? [])
            .filter((it: any) => Boolean(it?.isSelected))
            .map((it: any) => it.id),
    )
  }
  return new Set(props.layout?.id ? [props.layout.id] : [])
});
const selectedNames = computed(() => {
  if (props.isMultiselect) {
    return (props.layouts ?? [])
        .filter((it: any) => Boolean(it?.isSelected))
        .map((it: any) => it.name).join(', ');
  }
  return props.layout?.name ? props.layout.name : '';
});
</script>

<template>
  <div class="layout-section">
    <div class="mb-4">
      <span class="section-title uppercase mr-2">{{ props.title }}:</span>
      <span class="sub-title">{{ isMultiselect ? selectedNames : props?.layout?.name }}</span>
    </div>

    <div class="layout-grid">
      <div
          v-for="layout in layouts"
          :key="layout.id"
          class="layout-option"
          :class="{ selected: isMultiselect ? selectedIds.has(layout.id) : props?.layout?.id === layout.id }"
          @click="emit('layout-selected', layout)"
      >
        <div class="layout-name flex-c">{{ layout.name }}</div>
      </div>
    </div>

    <div v-if="false" id="colorSelectorContainer"></div>
  </div>
</template>

<style scoped>
.layout-section {
  margin-bottom: 25px;
}

.layout-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.layout-option {
  text-align: center;
  cursor: pointer;
  padding: 9px;
  border-radius: 12px;
  background: #F7F7F7;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  min-width: 145px;
}

.layout-option:hover {
  border-color: #B5B2A1;
}

.layout-option.selected {
  border: 2px solid #B5B2A1;
}
</style>