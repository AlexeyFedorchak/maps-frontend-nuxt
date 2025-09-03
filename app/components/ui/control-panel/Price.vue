<script setup lang="ts">
const props = defineProps<{
  totalPrice: string;
  installmentPrice: string;
}>();
</script>

<template>
  <div>
    <p class="black mb-1">
      <span class="text-xl font-bold mr-2">Total £{{ props.totalPrice }}</span>
      Free Shipping
    </p>
    <p class="text-[#818181]">
      <span class="mr-2">or Pay in 3 interest free payments for £{{ props.installmentPrice }}</span>
      <img class="mb-1" src="/images/icons/info.svg" alt="info">
    </p>
  </div>
</template>
