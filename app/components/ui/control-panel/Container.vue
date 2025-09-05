<script setup lang="ts">
const { isMobile } = useBreakpoints();
</script>
<template>
  <div class="controls-section">
    <slot name="header">
      <UiControlPanelHeader v-if="!isMobile" logo="/images/logo.svg" alt="Logo"/>
    </slot>
    <div class="content-area">
      <slot name="content" />
    </div>
  </div>
</template>
