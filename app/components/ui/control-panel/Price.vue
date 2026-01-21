<script setup lang="ts">
const props = defineProps<{
  totalPrice: string;
  installmentPrice: string;
  paymentDescription: string;
}>();
</script>

<template>
  <div>
    <p class="black mb-2">
      <span class="font-bold mr-2">Total £{{ props.totalPrice }}</span>
     {{ props.paymentDescription}}
    </p>
    <p class="text-[#818181] mr-2 flex gap-1 items-center">
      <span class="">or Pay in 3 interest free payments for £{{ props.installmentPrice }}</span>
      <img src="/images/icons/info.svg" alt="info">
    </p>
  </div>
</template>
