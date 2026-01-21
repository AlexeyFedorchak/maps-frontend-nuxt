<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useElementSize } from '@vueuse/core'
import { MAP_ELEMENT_IDS } from '~/constants/mapTypes'
import type { Font, Frame, MapShape } from '~/types'

const props = defineProps<{
  shape: MapShape
  frame: Frame | null
  font: Font
  location: string
  hasRibbon: boolean
  showDetails: boolean
  showDetailsBg?: boolean
  subtitle: string
  title: string
  coordinates: string
  customText?: string
  customText2?: string
  border?: boolean
  bg?: string
  fg?: string
  id?: string
}>()

const rootEl = ref<HTMLElement | null>(null)

const MAX_W = 450

const { width } = useElementSize(rootEl)

const safeWidth = computed(() => {
  const w = Number(width.value)
  return Number.isFinite(w) && w > 0 ? w : 240
})

const scaleRatio = computed(() => {
  const w = Math.min(safeWidth.value, MAX_W)
  return w / MAX_W
})

onMounted(async () => {
  await nextTick()
})
</script>

<template>
  <div ref="rootEl" :id="id || MAP_ELEMENT_IDS.STARMAP_PREVIEW"
    class="relative aspect-[3/4] w-[240px] md:w-[90%] lg:w-[450px] text-[calc(1rem*var(--fs-scale))] overflow-hidden"
    :class="['map-frame', `${shape}-container`, border ? 'map-border' : '']" :style="{
      backgroundColor: bg || '#000000',
      color: fg || '#ffffff',
    }">
    <div v-if="border && shape !== 'photo' && shape !== 'fade'"
      class="absolute top-[2.31%] left-[3.333%] right-[3.333%] bottom-[2.31%] border-[2px] z-10 pointer-events-none"
      :style="{ borderColor: fg || '#000000' }" />
    <slot></slot>
    <!-- Fade layout with gradient overlay -->
    <div v-if="props.showDetails && shape === 'fade'"
      class="absolute bottom-0 left-0 right-0 h-[35%] pointer-events-none z-20">
      <!-- White gradient background -->
      <div class="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-transparent"></div>
      <!-- Text content -->
      <div class="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-center">
        <div class="fade-title font-['Lato'] font-[900] text-[1.4rem] uppercase tracking-[0.15em] mb-[0.3rem]"
             :style="{ color: '#000000' }">
          {{ location }}
        </div>
        <div class="fade-subtitle font-['Lato'] font-medium text-[0.75rem] uppercase tracking-[0.08em] mb-[0.3rem]"
             :style="{ color: '#000000' }">
          {{ subtitle }}
        </div>
        <div class="fade-coordinates font-['Lato'] font-normal text-[0.6rem] tracking-[0.05em]"
             :style="{ color: '#666666' }">
          {{ coordinates }}
        </div>
      </div>
    </div>
    <!-- Photo layout text overlay directly on map -->
    <div v-if="props.showDetails && shape === 'photo'"
      class="absolute left-1/2 -translate-x-1/2 bottom-[3%] text-center z-20 flex w-full">
      <div class="flex items-baseline justify-between gap-[0.5rem] w-full px-[4%]">
        <span class="photo-title font-['Lato'] font-[900] text-[0.75rem] uppercase tracking-[0.08em]"
          :style="{ color: '#000000' }">
          {{ location }}
        </span>
        <span class="photo-subtitle font-['Lato'] font-medium text-[0.65rem] uppercase tracking-[0.05em]"
          :style="{ color: '#000000' }">
          {{ subtitle }}
        </span>
        <span class="photo-coordinates font-['Lato'] font-normal text-[0.55rem] tracking-[0.03em]"
          :style="{ color: '#666666' }">
          {{ coordinates }}
        </span>
      </div>
    </div>
    <div class="map-details antialiased w-full" v-if="props.showDetails && shape !== 'photo' && shape !== 'fade'"
      :style="{ backgroundColor: bg || '#000000', color: fg || '#ffffff' }">
      <div v-if="customText || shape === 'circle' || shape === 'heart'" class="map-custom-text absolute left-1/2 -translate-x-1/2 top-[77.5%] w-full
            text-center font-medium tracking-[0.01rem] text-[1rem] leading-[1.20]"
        :style="{ transform: `scale(${scaleRatio})`, transformOrigin: 'top center', fontFamily: font.fontFamily }">
        <div class="mb-[0.25rem]">{{ (shape === 'circle' || shape === 'heart') && !customText ? 'The Night Our Adventure Started' : customText }}</div>
        <div v-if="customText2">{{ customText2 }}</div>
      </div>
      <div v-if="title && shape !== 'circle' && shape !== 'heart' && shape !== 'photo' && shape !== 'fade'"
        class="absolute left-1/2 -translate-x-1/2 top-[85.5%] w-full text-center leading-[1.24] font-['Nunito', sans-serif]">
        <div class="text-[0.6rem]">{{ title }}</div>
      </div>
      <div v-if="shape !== 'photo'"
        class="absolute left-1/2 -translate-x-1/2 top-[87.4%] w-full text-center leading-[1.24] font-['Nunito', sans-serif]"
        :style="{ transform: `scale(${scaleRatio})`, transformOrigin: 'top center' }">
        <div :class="showDetailsBg ? 'inline-block bg-white/85 rounded-[4px] px-3 py-1.5 shadow-md' : ''">
          <div class="text-[0.6rem] mb-[0.25rem]">{{ location }}</div>
          <div class="text-[0.6rem] mb-[0.25rem]">{{ subtitle }}</div>
          <div class="text-[0.6rem]">{{ coordinates }}</div>
        </div>
      </div>
    </div>
    <div class="absolute inset-y-[-5%] inset-x-[-6%] pointer-events-none">
      <NuxtImg v-if="frame?.image" class="absolute inset-0 w-full h-full object-fill" :src="frame?.image" />
      <NuxtImg v-if="hasRibbon && frame?.image" class="absolute inset-0 w-full h-full object-fill z-2"
        src="/images/frames/giftwrap_large_red.png" />
    </div>
    <!-- SVG definition for heart clip-path -->
    <svg width="0" height="0" style="position: absolute;">
      <defs>
        <clipPath id="heartClipPath" clipPathUnits="objectBoundingBox">
          <path
            d="M0.5,1 C0.5,1 0.03,0.46 0.03,0.32 C0.03,0.14 0.125,0.03 0.25,0.03 C0.34,0.03 0.44,0.11 0.5,0.21 C0.56,0.11 0.66,0.03 0.75,0.03 C0.875,0.03 0.97,0.14 0.97,0.32 C0.97,0.46 0.5,1 0.5,1 Z" />
        </clipPath>
      </defs>
    </svg>
  </div>
</template>

<style scoped></style>
