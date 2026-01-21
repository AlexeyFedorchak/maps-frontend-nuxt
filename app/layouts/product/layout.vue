<template>
  <UiControlPanelHeader class="md:hidden" logo="/images/logo.svg" alt="Logo"/>
  <div class="size-full relative">
    <NuxtLink class="hidden md:flex absolute top-28 left-4"
              to="/"
    >
      <UiButton variant="home">Back Home</UiButton>
    </NuxtLink>
    <UiControlPanelMobileExternalTabs class="absolute top-3 left-1/2 -translate-x-1/2"/>
    <div class="min-h-dvh w-full grid grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[auto_520px]">
      <slot name="preview"></slot>
      <slot name="controls"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
