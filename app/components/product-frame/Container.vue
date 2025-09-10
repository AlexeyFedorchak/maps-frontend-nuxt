<script setup lang="ts">
import {ref, computed, onMounted, nextTick} from 'vue'
import {useElementSize} from '@vueuse/core'
import type {Frame, MapShape} from '~/types'

const props = defineProps<{
  shape: MapShape
  frame: Frame | null
  hasRibbon: boolean
  showDetails: boolean
  subtitle: string
  title: string
  coordinates: string
  customText?: string
  customText2?: string
  border?: boolean
  bg?: string
  fg?: string
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
  <div
      ref="rootEl"
      class="relative aspect-[3/4] w-[240px] md:w-[90%] lg:w-[450px] text-[calc(1rem*var(--fs-scale))]"
      :class="['map-frame', `${shape}-container`, border ? 'map-border' : '']"
      :style="{
        backgroundColor: bg || '#000000',
        color: fg || '#ffffff',
      }">
    <div
        v-if="border"
        class="absolute top-[2.31%] left-[3.333%] right-[3.333%] bottom-[2.31%] border-[2px]"
        :style="{ borderColor: fg || '#000000' }"
    />
    <slot></slot>
    <div
        class="map-details antialiased w-full"
        v-if="props.showDetails"
        :style="{ backgroundColor: props.bg || '#000000', color: props.fg || '#ffffff' }">
      <div v-if="customText"
           class="map-custom-text absolute left-1/2 -translate-x-1/2 bottom-[19%] w-full
            text-center font-medium tracking-[0.01em] text-[1rem] leading-[1.20]"
           :style="{ transform: `scale(${scaleRatio})`, transformOrigin: 'top center' }">
        <div class="mb-[0.5rem]">{{ customText }}</div>
        <div v-if="customText2">{{ customText2 }}</div>
      </div>
      <div class="absolute left-1/2 -translate-x-1/2 top-[87.4%] w-full text-center leading-[1.24]"
           :style="{ transform: `scale(${scaleRatio})`, transformOrigin: 'top center' }">
        <div class="text-[0.6rem]">{{ title }}</div>
        <div class="text-[0.6rem] mb-[0.25rem]">{{ subtitle }}</div>
        <div class="text-[0.6rem]">{{ coordinates }}</div>
      </div>
    </div>
    <div class="absolute inset-y-[-5%] inset-x-[-6%]">
      <NuxtImg
          v-if="frame?.backgroundImage"
          class="absolute inset-0 w-full h-full object-fill"
          :src="frame?.backgroundImage"
      />
      <NuxtImg
          v-if="hasRibbon && frame?.backgroundImage"
          class="absolute inset-0 w-full h-full object-fill z-2"
          src="/images/frames/giftwrap_large_red.png"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
