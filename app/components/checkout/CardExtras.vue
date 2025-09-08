<script setup lang="ts">
interface Recommendation {
  id: number;
  title: string;
  subTitle: string;
  price: string;
}

const props = defineProps<{
  recommendations: Array<Recommendation>;
}>();
const emit = defineEmits<{
  (e: 'select', item: Recommendation): void;
}>();
</script>

<template>
  <div class="md:mt-6">
    <div class="inline-block md:bg-[#f7f7f7]">
      <h3 class="uppercase font-semibold black p-2 text-[14px]">Recommended Extras</h3>
    </div>
    <div class="p-6 space-y-3 md:bg-[#f7f7f7]">
      <div v-for="item of props.recommendations"
           :key="item.id"
           class="flex justify-between items-center">
        <div>
          <p class="font-medium">{{item.title}}</p>
          <p class="text-sm text-gray-500">{{item.subTitle}}</p>
        </div>
        <button class="text-blue-600 font-medium text-sm" @click="emit('select', item)">ADD</button>
        <p class="text-sm">{{item.price}}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>