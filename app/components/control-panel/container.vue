<script setup lang="ts">
const {isMobile} = useBreakpoints();
</script>

<template>
  <div class="controls-section"
       :class="{'mobile': isMobile}"
  >
    <slot name="header">
      <ControlPanelHeader logo="/images/logo.svg" alt="Logo"/>
    </slot>
    <div class="content-area">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.controls-section.mobile {
  background-color: #FFFFFF;
}

.mobile .content-area {
  padding: 0;
  background-color: #FFFFFF;
}
</style>