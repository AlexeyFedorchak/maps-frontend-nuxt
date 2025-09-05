<template>
  <div id="designContent">
    <UiControlPanelThemes :themes="STAR_MAP_THEMES"
                          :theme="props.theme"
                          @theme-selected="emit('theme-selected', $event)"/>
    <UiControlPanelLayout :title="'Layout'"
                          :layouts="LOCATION_MAP_LAYOUTS"
                          :layout="props.layout"
                          @layout-selected="emit('layout-selected', $event)"/>
  </div>
</template>

<script setup lang="ts">
import type { Theme, Layout } from '~/types';
import { LOCATION_MAP_LAYOUTS } from '~/constants/location-map';
import { STAR_MAP_THEMES } from '~/constants/star-map/themes';

const props = defineProps<{
  layout: Layout | null;
  theme: Theme | null;
}>();

const emit = defineEmits<{
  (e: 'theme-selected', theme: Theme): void;
  (e: 'layout-selected', layout: Layout): void;
}>();
</script>

<style scoped>
.mt-4 {
  margin-top: 1rem;
}
</style>
