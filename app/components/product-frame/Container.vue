<script setup lang="ts">
import type { MapShape } from '~/types';


const props = defineProps<{
  shape: MapShape
  showDetails: boolean
  subtitle: string
  title: string
  coordinates: string
  customText?: string
  border?: boolean
  bg?: string
  fg?: string
}>()
</script>

<template>
  <div class="w-[175px] md:w-[90%] lg:w-[450px] aspect-[9/13] relative"
       :class="['map-frame', `${props.shape}-container`, props.border ? 'map-border' : '']"
       :style="{ backgroundColor: props.bg || '#ffffff' }">
    <div v-if="props.border" class="absolute top-[15px] left-[15px] right-[15px] bottom-[15px] border-[2px]"
         :style="{ borderColor: props.fg || '#000000' }"></div>
    <slot></slot>
    <div class="map-details" v-if="showDetails"
         :style="{ backgroundColor: props.bg || '#ffffff', color: props.fg || '#000000' }">
      <div v-if="customText" class="map-custom-text absolute top-[75%] w-full text-center">{{customText}}</div>
      <div class="absolute top-[85%] w-full">
        <div class="map-title text-center">{{ props.title }}</div>
        <div class="map-subtitle text-center" v-if="props.subtitle">{{ props.subtitle }}</div>
        <div class="map-coordinates text-center">{{ props.coordinates }}</div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.map-custom-text {
  font-family: 'Montserrat', 'Lato', 'Inter', sans-serif;
}
.map-title {
  font-size: 10px;
  font-weight: 700;
  font-family: 'Montserrat', 'Lato', 'Inter', sans-serif;
}

.map-subtitle,
.map-coordinates {
  font-size: 11px;
  font-family: 'Montserrat', 'Lato', 'Inter', sans-serif;
}
</style>