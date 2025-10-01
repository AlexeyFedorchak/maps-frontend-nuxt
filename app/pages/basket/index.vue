<script setup lang="ts">
import { ref } from "vue";
import MiniBasket from "~/components/basket/MiniBasket.vue";

// TODO: delete this file, it exists only to show basket

const basketData = [
  {
    id: 1,
    title: "STAR MAP",
    location: "London UK",
    date: "01 Jan 2025",
    printSize: "Print Size: 40cm x 50 cm",
    price: "£31.99",
  },
  {
    id: 2,
    title: "STAR MAP",
    location: "Kyiv Ukraine",
    date: "02 Apr 2023",
    printSize: "Print Size: 40cm x 50 cm",
    price: "£29.99",
  },
];

const basket = ref<any[]>([]);

function basketEmpty() {
  basket.value = [];
}

function basketFull() {
  basket.value = [...basketData];
}
</script>

<template>
  <div>
    <div class="mb-8">
      <span
        @click="basketEmpty"
        class="mr-3 cursor-pointer"
      >
        basket empty
      </span>

      <span
        @click="basketFull"
        class="cursor-pointer"
      >
        basket full
      </span>
    </div>

    <div>
      <MiniBasket :data="basket" class="temp-border"/>
    </div>
  </div>
</template>

<style scoped>
.temp-border {
  /* delete this, it's temporary */
  border: 1px solid #000000;
}
</style>
