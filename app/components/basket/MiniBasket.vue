<script setup lang="ts">
import {Button} from "~/components/ui/button";

const props = defineProps<{
  data?: any[]
}>()

// TODO: add basket local storage
const basket = computed(() => props.data ?? [])

function closeBasket() {
  // TODO: implement
}
</script>

<template>
  <div class="max-w-80 flex flex-col" v-if="basket.length === 0">
    <div class="header h-18 p-4 border-b-2 border-[#eee] flex justify-center text-xl items-center relative">
      <div class="relative">
        <UiIcon :name="'mini-basket'"  width="37px" height="37px" font-size="33px" color="#000000"/>
        <span class="absolute basket-count top-[11px] right-[14px] text-base">
          {{ basket.length }}
        </span>
      </div>
      <div class="ml-2">
        Your Cart
      </div>
      <UiIcon @click="closeBasket" name="cross" color="#000000" font-size="16px" class="absolute right-3 cursor-pointer"/>
    </div>
    <div class="body h-40 p-8 flex flex-col items-center grow">
      <span class="mb-5">
        Your cart is empty
      </span>
      <NuxtLink href="/">
        <Button class="text-xl w-50 h-10 cursor-pointer border-1 bg-[#3a434a] hover:bg-white hover:text-[#3a434a] hover:border-black">
          Return to Shop
        </Button>
      </NuxtLink>
    </div>
    <div class="footer h-5"></div>
  </div>
  <div class="max-w-80 flex flex-col" v-else>
    <div class="header h-18 p-4 border-b-2 border-[#eee] flex justify-center items-center text-xl relative">
      <div class="relative">
        <UiIcon :name="'mini-basket'"  width="37px" height="37px" font-size="33px" color="#000000"/>
        <span class="absolute basket-count top-[11px] right-[14px] text-base">
          {{ basket.length }}
        </span>
      </div>
      <div class="ml-2">
        Your Cart
      </div>
      <UiIcon @click="closeBasket" name="cross" color="#000000" font-size="16px" class="absolute right-3 cursor-pointer"/>
    </div>
    <div class="body flex flex-col">
      <div v-for="product in basket" class="product px-4 py-5 flex border-b-2 border-[#eee]">
        <div class="image max-w-22">
          <NuxtImg format="png" :src="product?.image" :alt="product?.title" width="88"/>
        </div>

        <div class="content pl-4 flex flex-col justify-center grow">
          <div class="name pb-1 text-m font-semibold">
            {{ product.title }}
          </div>
          <div class="location text-sm">
            {{ product.location }}
          </div>
          <div class="date text-sm">
            {{ product.date }}
          </div>
        </div>
      </div>
    </div>
    <div class="footer h-25 px-5 py-2.5 flex flex-col items-center">
      <div class="totals pt-1 pb-2 font-semibold text-lg">
        Subtotal: £56.98
      </div>
      <NuxtLink href="/checkout" class="cursor-pointer">
        <Button class="text-lg w-70 h-10 cursor-pointer border-1 bg-[#3a434a] hover:bg-white hover:text-[#3a434a] hover:border-black">
          Checkout
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.footer {
  box-shadow: 0 -5px 10px #0000001a;
}
</style>
