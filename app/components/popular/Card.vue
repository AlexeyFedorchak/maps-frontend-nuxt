<script setup lang="ts">
import type {PopularItem} from "~/types/index";

interface CardProps extends Omit<PopularItem, 'id'> {}

const props = defineProps<CardProps>()
</script>

<template>
  <div>
    <img
      src="https://i.ibb.co/3N5dhz3/starmap.png"
      alt="map"
      class="h-[206px] w-auto md:h-[400px] mb-3 block"
    >

    <div class="mb-1">
      <span class="font-extrabold tracking-wide uppercase">{{ props.title }}</span>
    </div>
    <div class="mb-2">
      <span class="font-bold text-[#25282D]">From £{{ (props.price / 100).toFixed(2) }}</span>
      <span class="text-[#A5A5A5] line-through"> £{{ ((props.price / 100) / (1 - parseFloat(props.discount) / 100)).toFixed(2) }}</span>
    </div>
    <div>
      <span class="text-[#787878]">{{ props.description }}</span>
    </div>
  </div>

</template>

<style scoped>

</style>
