<script setup lang="ts">
import type { MapShape } from '~/types';


const props = defineProps<{
  shape: MapShape
  showDetails: boolean
  subtitle: string
  title: string
  coordinates: string
}>()
</script>

<template>
  <div :class="['map-frame', `${props.shape}-container`]">
    <slot></slot>
    <div class="map-details" v-if="showDetails">
      <template v-if="props.shape === 'rectangle' && props.subtitle">
        <div class="map-title">{{ props.title }}</div>
        <div class="map-subtitle">{{ props.subtitle }}</div>
        <div class="map-coordinates-below">{{ props.coordinates }}</div>
      </template>
      <template v-else>
        <div class="map-title">{{ props.title }}</div>
        <div class="map-subtitle" v-if="props.subtitle">{{ props.subtitle }}</div>
        <div class="map-coordinates">{{ props.coordinates }}</div>
      </template>
    </div>
  </div>
</template>

<style scoped>

</style>