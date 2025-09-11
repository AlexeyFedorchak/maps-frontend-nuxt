<script setup lang="ts">
import { ICON_NAMES, type IconName } from '~/constants/icons'

export interface IconProps {
  name: IconName
  display?: string
  width?: string
  height?: string
  color?: string
  fontSize?: string
  lineHeight?: string
}

const props = defineProps<IconProps>()

const iconClass = computed(() => `icon-${props.name}`)

const wrapperStyle = computed(() => ({
  display: props.display || 'flex',
  width: props.width || 'auto',
  height: props.height || 'auto',
  color: props.color || 'inherit',
  fontSize: props.fontSize || 'inherit',
  lineHeight: props.lineHeight || 'normal',
  textAlign: 'center',
}))
</script>

<template>
  <span class="items-center justify-center" :style="wrapperStyle">
    <i :class="iconClass"></i>
  </span>
</template>

<style scoped>
</style>