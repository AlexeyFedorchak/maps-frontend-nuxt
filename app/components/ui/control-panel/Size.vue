<script setup lang="ts">
import { onMounted, ref } from 'vue';

const props = defineProps<{
  selectedSize?: Size;
  sizes: Size[];
}>();

export interface Size {
  id: string;
  label: string;
  name: string;
  size: string;
  price: number;
}

const selectedSize = ref<Size | null>(props.selectedSize || null);

const sizes = ref<Size[]>([
  { id: 'a4', label: 'A4', name: 'A4', size: '21x29.7cm', price: 2199 },
  { id: 's', label: 'S', name: 'S', size: '21x29.7cm', price: 2799 },
  { id: 'm', label: 'M', name: 'M', size: '30x40cm', price: 3199 },
  { id: 'l', label: 'L', name: 'L', size: '40x50cm', price: 3999 },
  { id: 'xl', label: 'XL', name: 'XL', size: '50x70cm', price: 6999 },
]);

const emit = defineEmits<{
  (e: 'size-selected', size: Size): void
}>()

function selectSize(size: Size): void {
  selectedSize.value = size;
  emit('size-selected', size);
}

onMounted(() => {
  // If no selectedSize is provided via props, select the first one
  if (!selectedSize.value && props.sizes.length > 0) {
    selectedSize.value = props.sizes[0]!;
    emit('size-selected', selectedSize.value);
  }
  // If selectedSize is provided via props, emit it to notify parent
  else if (selectedSize.value) {
    emit('size-selected', selectedSize.value);
  }
})

</script>

<template>
<div>
  <div class="min-h-14">
    <span class="font-extrabold mb-2 uppercase mr-2">Size:</span>
    <span class="text-[#787878]">{{ selectedSize?.name || props.sizes[0]?.name }} ({{
        (selectedSize?.size || props.sizes[0]?.size) + 'cm'
      }}) + £{{ (selectedSize?.price || props.sizes[0]?.price ) / 100}}</span>
  </div>

  <div class="flex flex-wrap items-center gap-2.5 lg:gap-5">
    <div
        v-for="size in props.sizes"
        :key="size.id"
        class="rounded-full"
        :class="{ active: selectedSize?.id === size.id }"
        @click="selectSize(size)"
    >
      <div class="size-[56px] flex justify-center items-center bg-[#F7F7F7] rounded-full font-bold text-xl">{{ size.name }}</div>
    </div>
  </div>
</div>
</template>

<style scoped>
.active {
  outline: 2px solid #A8A490;
  outline-offset: 2px;
}
</style>
