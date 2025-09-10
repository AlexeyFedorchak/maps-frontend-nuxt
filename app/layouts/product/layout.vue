<template>
  <UiControlPanelMobileExternalTabs />
  <div class="min-h-dvh w-screen grid grid-cols-1 md:grid-cols-[50%_50%] lg:grid-cols-[auto_520px]">
    <slot name="preview"></slot>
    <slot name="controls"></slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
/*.main-container.mobile-layout {
  padding-top: 0;
  flex-direction: column;
}

@media (max-width: 768px) {
  .main-container.mobile-layout {
    display: flex;
    flex-direction: column;
    padding-top: 60px;
    min-height: 100vh;
  }

  .main-container.mobile-layout .map-preview-section {
    height: 20%;
    min-height: calc(50vh - 60px);
    position: relative;
    background-image: url('/images/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .main-container.mobile-layout .controls-section {
    width: 100%;
    height: 50vh;
    position: relative;
    background: #F7F7F7;
    box-shadow: 0 -5px 15px -5px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }
}*/
</style>
