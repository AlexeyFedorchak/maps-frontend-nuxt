<script setup lang="ts">
const props = defineProps<{
  logo: string;
  alt: string;
}>();
</script>

<template>
  <div class="header-section">
    <img :src="props.logo" :alt="props.alt">
  </div>
</template>

<style scoped>

</style>