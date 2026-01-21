<template>
    <NuxtLayout name="product-layout">
      <template #preview>
          <LocationMap/>
      </template>

      <template #controls>
        <LocationMapControlsPanel/>
      </template>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { useBasketStore } from '~/stores/basketStore';
import { useLocationMapStore } from '~/stores/locationMapStore';

const basketStore = useBasketStore();
const locationMapStore = useLocationMapStore();

// Check if we're editing an existing item
onMounted(() => {
  if (basketStore.editingItem) {
    // Load the basket item data into the location map store
    locationMapStore.loadFromBasketItem(basketStore.editingItem);
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
