<script setup lang="ts">
const { isMobile } = useBreakpoints();
</script>
<template>
  <div class="h-screen bg-white p-0 flex flex-col shadow-lg">
    <slot name="header">
      <UiControlPanelHeader v-if="!isMobile" logo="/images/logo.svg" alt="Logo"/>
    </slot>
    <div class="flex-1 p-3 md:overflow-y-auto bg-[#F7F7F7]">
      <slot name="content" />
    </div>
  </div>
</template>
