<script setup lang="ts">
import { onMounted, ref } from 'vue';

export interface Size {
  id: string;
  label: string;
  name: string;
  dimensions: string;
  price: string;
  numericPrice: number;
}

const selectedSize = ref<Size | null>(null);

const sizes = ref<Size[]>([
  { id: 'a4', label: 'A4', name: 'A4', dimensions: '21x29.7cm', price: '21.99', numericPrice: 21.99 },
  { id: 's', label: 'S', name: 'S', dimensions: '21x29.7cm', price: '27.99', numericPrice: 27.99 },
  { id: 'm', label: 'M', name: 'M', dimensions: '30x40cm', price: '31.99', numericPrice: 31.99 },
  { id: 'l', label: 'L', name: 'L', dimensions: '40x50cm', price: '39.99', numericPrice: 39.99 },
  { id: 'xl', label: 'XL', name: 'XL', dimensions: '50x70cm', price: '69.99', numericPrice: 69.99 },
]);

const emit = defineEmits<{
  (e: 'size-selected', size: Size): void
}>()

function selectSize(size: Size): void {
  selectedSize.value = size;
  emit('size-selected', size);
}

onMounted(() => {
  if (!selectedSize.value && sizes.value.length > 0) {
    selectedSize.value = sizes.value[0]!;
    emit('size-selected', selectedSize.value);
  }
})

</script>

<template>
  <div class="mb-3">
    <span class="section-title uppercase mr-2">Size:</span>
    <span class="sub-title">{{ selectedSize?.name || 'A4' }} ({{
        selectedSize?.dimensions || '21x29.7cm'
      }}) + £{{ selectedSize?.price || '21.99' }}</span>
  </div>

  <div class="option-section">
    <div
        v-for="size in sizes"
        :key="size.id"
        class="option mr-4"
        :class="{ active: selectedSize?.id === size.id }"
        @click="selectSize(size)"
    >
      <div>{{ size.label }}</div>
    </div>
  </div>
</template>

<style scoped>

</style>