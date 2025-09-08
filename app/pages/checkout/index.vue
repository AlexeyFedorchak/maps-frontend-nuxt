<script setup lang="ts">
const basket = [
  {
    id: 1,
    title: "STAR MAP",
    location: "London UK",
    date: "01 Jan 2025",
    printSize: "Print Size: 40cm x 50 cm",
    price: "£31.99",
    recommendations: [
      {
        id: 1,
        title: "GIFT WRAP",
        subTitle: "Ribbon gift wrap",
        price: "£2.49",
      },
      {
        id: 2,
        title: "WALL STRIPS",
        subTitle: "Easy hassle-free fixture",
        price: "£2.99",
      },
      {
        id: 3,
        title: "GREETINGS CARD",
        subTitle: "Add personal message",
        price: "£0.99",
      },
    ],
  },
];

function addExtra(item: any) {
  console.log('addExtra', item);
}

</script>

<template>
  <UiLayoutHeader/>
  <div class="max-w-5xl mx-auto px-4 py-8">
    <h1 class="hidden md:block text-center text-xl font-bold tracking-wide mb-6">YOUR BASKET</h1>
    <CheckoutCard
        v-for="item of basket"
        :key="item.id"
        :title="item.title"
        :location="item.location"
        :date="item.date"
        :print-size="item.printSize"
        :price="item.price"
    >
      <template #extras>
        <CheckoutCardExtras :recommendations="item.recommendations" @select="addExtra($event)"/>
      </template>
    </CheckoutCard>
  </div>
</template>

<style scoped>

</style>