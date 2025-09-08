<script setup lang="ts">
const { isMobile } = useBreakpoints();
</script>
<template>
  <div class="h-screen bg-white p-0 flex flex-col shadow-lg">
    <slot name="header">
      <UiControlPanelHeader v-if="!isMobile" logo="/images/logo.svg" alt="Logo"/>
    </slot>
    <div class="content-area">
      <slot name="content" />
    </div>
  </div>
</template>
