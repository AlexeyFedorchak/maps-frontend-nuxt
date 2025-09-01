<template>
    <NuxtLayout name="product-layout">
      <template #preview>
        <NuxtLayout name="product-frame">
          <LocationMapInteractive/>
        </NuxtLayout>
      </template>

      <template #controls>
        <LocationMapControlsPanel/>
      </template>
    </NuxtLayout>
</template>

<script setup lang="ts">

</script>

<style scoped>
.temp-map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 1.2rem;
}
</style>
