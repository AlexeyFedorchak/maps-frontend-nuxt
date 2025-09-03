<script setup lang="ts">
import { ICON_NAMES, type IconName } from '~/constants/icons'

export interface IconProps {
  name: IconName
  width?: string
  height?: string
  color?: string
  fontSize?: string
  lineHeight?: string
}

const props = defineProps<IconProps>()

const iconClass = computed(() => `icon-${props.name}`)

const wrapperStyle = computed(() => ({
  display: 'inline-block',
  width: props.width || 'auto',
  height: props.height || 'auto',
  color: props.color || 'inherit',
  fontSize: props.fontSize || 'inherit',
  lineHeight: props.lineHeight || 'normal',
  textAlign: 'center',
}))
</script>

<template>
  <span :style="wrapperStyle">
    <i :class="iconClass"></i>
  </span>
</template>

<style scoped>
.icon-wrapper {
  display: inline-block;
}
</style>