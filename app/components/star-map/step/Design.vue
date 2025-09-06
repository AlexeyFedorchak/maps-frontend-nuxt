<template>
  <div id="designContent">
    <UiControlPanelThemes :themes="STAR_MAP_THEMES"
                          :theme="props.theme"
                          @theme-selected="emit('theme-selected', $event)"/>
    <UiControlPanelLayout title="Features"
                          :layouts="props.features"
                          :layout="null"
                          :is-multiselect="true"
                          @layout-selected="emit('feature-selected', $event)"/>
  </div>
</template>

<script setup lang="ts">
import type { Theme } from '~/types';
import { STAR_MAP_THEMES } from '~/constants/star-map';

const props = defineProps<{
  features: any[];
  theme: Theme | null;
}>();

const emit = defineEmits<{
  (e: 'theme-selected', theme: Theme): void;
  (e: 'feature-selected', feature: any): void;
}>();
</script>

<style scoped>
.mt-4 {
  margin-top: 1rem;
}
</style>
