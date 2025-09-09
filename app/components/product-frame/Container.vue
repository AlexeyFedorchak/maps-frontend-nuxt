<script setup lang="ts">
import type {Frame, MapShape} from '~/types';

const props = defineProps<{
  shape: MapShape
  frame: Frame | null
  hasRibbon: boolean
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
    <div v-if="props.border" class="absolute top-[2.31%] left-[3.333%] right-[3.333%] bottom-[2.31%] border-[2px]"
         :style="{ borderColor: props.fg || '#000000' }"></div>
    <slot></slot>
    <div class="map-details" v-if="showDetails"
         :style="{ backgroundColor: props.bg || '#ffffff', color: props.fg || '#000000' }">
      <div v-if="customText" class="map-custom-text absolute top-[75%] w-full text-center text-[clamp(5px,2.5vw,14px)]">{{ customText }}</div>
      <div class="absolute top-[85%] w-full text-[clamp(10px,1.8vw,16px)]">
        <div class="map-title text-center">{{ props.title }}</div>
        <div class="map-subtitle text-center" v-if="props.subtitle">{{ props.subtitle }}</div>
        <div class="map-coordinates text-center">{{ props.coordinates }}</div>
      </div>
    </div>
    <div class="absolute inset-y-[-5%] inset-x-[-6%]">
      <NuxtImg class="absolute inset-0 w-full h-full object-fill"
               v-if="props.frame?.backgroundImage"
               :src="props.frame?.backgroundImage"/>
      <NuxtImg class="absolute inset-0 w-full h-full object-fill z-2"
               v-if="props.hasRibbon && props.frame?.backgroundImage"
               src="/images/frames/giftwrap_large_red.png"/>
    </div>
  </div>
</template>

<style scoped>

</style>