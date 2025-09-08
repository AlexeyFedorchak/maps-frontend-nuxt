<script setup lang="ts">
import type { IconName } from '~/constants/icons';

export interface FeatureItem {
  icon: IconName
  label: string
  infoText?: string
  showInfo?: boolean
}

const props = defineProps<{
  items: FeatureItem[]
}>()
</script>

<template>
  <div class="map-preview-title flex-c mb-[10vh]">
    <div
        v-for="(item, idx) in items"
        :key="idx"
        class="flex-c"
    >
      <div class="flex-c">
        <span class="map-preview-icon mr-2"><UiIcon :name="item.icon" :width="'16px'"/></span>
        <span :class="item.showInfo ? 'mr-2' : null">{{ item.label }}</span>
        <img v-if="item.showInfo" src="/images/icons/info.svg" alt="info">
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-preview-title {
  font-weight: 700;
  top: 24px;
  background-color: #F7F7F7;
  border-radius: 12px;
  box-shadow: 0 10px 20px 5px #E4E3DB;
}

.map-preview-title > div {
  margin: 8px 0;
  padding: 0 12px;
  border-right: 1px solid #BFB7B7;
}

.map-preview-title .map-preview-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E4E3DB;
  border-radius: 100%;
  width: 30px;
  height: 30px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto;
}

.map-preview-title > div:last-child {
  border-right: unset;
}

@media (max-width: 768px) {
  /* Hide preview title on mobile */
  .map-preview-title {
    display: none;
  }
}
</style>