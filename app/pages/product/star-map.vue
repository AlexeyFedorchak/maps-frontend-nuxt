<template>
    <NuxtLayout name="product-layout">
      <template #preview>
          <StarMap/>
      </template>

      <template #controls>
        <StarMapControlsPanel/>
      </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useBasketStore } from '~/stores/basketStore';
import { useStarMapStore } from '~/stores/starMapStore';

const basketStore = useBasketStore();
const starMapStore = useStarMapStore();

// Check if we're editing an existing item
onMounted(() => {
  if (basketStore.editingItem) {
    starMapStore.loadFromBasketItem(basketStore.editingItem);
  }
});

// Clear editing state when leaving the page
onUnmounted(() => {
  basketStore.setEditingItem(null);
});
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
