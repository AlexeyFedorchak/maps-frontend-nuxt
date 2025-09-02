<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="container-info">
        <p class="product-title">{{ props.title }}</p>
        <p class="product-description">
          {{ props.description }}
        </p>
      </div>
</template>

<style scoped>

</style>