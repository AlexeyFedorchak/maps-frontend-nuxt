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
  <div class="mb-14">
    <div class="mb-4">
      <span class="font-extrabold mb-2 uppercase mr-2">{{ props.title }}:</span>
      <span class="text-[#787878]">{{ isMultiselect ? selectedNames : props?.layout?.name }}</span>
    </div>

    <div class="flex flex-wrap gap-3">
      <div
          v-for="layout in layouts"
          :key="layout.id"
          class="layout-option hover:outline-[#B5B2A1] hover:outline-2 text-center cursor-pointer p-2 rounded-xl bg-[#F7F7F7] shadow-md min-w-[135px] md:min-w-[90px] lg:min-w-[135px]"
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
.layout-option.selected {
  outline: 2px solid #B5B2A1;
}
</style>