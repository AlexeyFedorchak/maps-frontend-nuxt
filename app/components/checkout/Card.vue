<script setup lang="ts">
import type {Frame} from '~/constants/frames';
import type {Location} from "~/types/index";
import type {PrintSize} from "~/types/index";
import {formatDate} from "~/utils/date";

const props = defineProps<{
  title: string;
  location: Location;
  date: Date;
  selectedSize: PrintSize;
  price: string;
  totalPrice: number;
  frame?: Frame | null;
  previewUri: string | null;
  hasRibbon: boolean;
}>();
const emmit = defineEmits<{
  (e: 'edit'): void;
  (e: 'remove'): void;
}>();
const {isMobile} = useBreakpoints();

// Computed properties for safe price formatting
const formattedTotalPrice = computed(() => {
  const total = props.totalPrice;
  return total.toFixed(2);
});

const formattedBasePrice = computed(() => {
  const price = props.selectedSize.price / 100;
  return price.toFixed(2);
});

const showBasePrice = computed(() => {
  const total = props.totalPrice;
  const base = props.selectedSize.price;
  return total !== base;
});
</script>

<template>
  <div class="mb-2 md:mb-0 bg-white rounded-lg shadow p-4 sm:p-6 ">
    <div class="flex flex-row gap-6">
      <div class="sm:h-[550px] sm:w-[400px] w-[80px] bg-no-repeat bg-[center_88%] star-map-bg flex-none flex justify-center">
          <div class="relative sm:max-h-[400px] w-auto"
               :class="props.frame ? 'sm:mt-18' : 'sm:mt-14'">
            <img
                :src="props.previewUri"
                alt="map"
                class="shadow-lg w-auto"
                :class="props.frame ? 'sm:max-h-[400px]' : 'sm:h-[440px]'"
            >

            <div v-if="props.frame" class="absolute inset-y-[-5%] inset-x-[-6%]">
              <NuxtImg
                  v-if="props.frame?.image"
                  class="absolute inset-0 w-full h-full object-fill"
                  :src="props.frame?.image"
              />

              <NuxtImg
                  v-if="props.hasRibbon && props.frame"
                  class="absolute inset-0 w-full h-full object-fill z-2"
                  src="/images/frames/giftwrap_large_red.png"
              />
            </div>
          </div>
      </div>

      <div class="flex-1 flex flex-col justify-between">
        <div class="md:mb-8">
          <div class="flex">
            <h2 class="font-semibold mr-6">{{ props.title }}</h2>
            <div v-if="!isMobile" class="flex gap-2 items-center leading-none">
          <span
            class="font-extrabold text-[#48647A] pr-3 border-r-2 border-[#D9D9D9]"
            @click="emmit('edit')"
          >EDIT</span>
              <span class="font-extrabold text-[#A5A5A5]" @click="emmit('remove')">REMOVE</span>
            </div>
          </div>
          <div v-if="isMobile" class="flex flex-col">
            <span class="text-[#A9A7A7]">{{ props.location.name }}</span>
            <span class="text-[#A9A7A7]">{{ formatDate(props.date) }}</span>
            <span class="text-[#A9A7A7]">Print size: {{ props.selectedSize.size }}cm</span>
            <div class="flex justify-between mt-3">
              <div class="flex gap-2 items-center leading-none">
            <span
              class="font-extrabold text-xs text-[#48647A] pr-3 border-r-2 border-[#D9D9D9]"
              @click="emmit('edit')"
            >EDIT</span>
                <span class="font-extrabold text-xs text-[#A5A5A5]" @click="emmit('remove')">REMOVE</span>
              </div>
              <div class="text-right">
                <p class="font-black text-xs">£{{ formattedBasePrice }}</p>
              </div>
            </div>
          </div>
          <div v-else class="flex flex-col mt-2">
            <span class="text-[#787878]">{{ props.location.name }}, {{ formatDate(props.date) }}</span>
            <div class="flex justify-between  mt-5">
              <p class="text-[#787878]">Print size: {{ props.selectedSize.size }}cm</p>
              <div class="text-right">
                <p class="font-black text-lg">£{{ formattedBasePrice }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!isMobile">
          <slot name="extras" />
        </div>
      </div>
    </div>

    <!-- Mobile: Added extras inside the card -->
    <div v-if="isMobile">
      <slot name="extras-added-mobile" />
    </div>
  </div>

  <!-- Recommended extras -->
  <div v-if="isMobile">
    <slot name="extras-recommendations-mobile" />
  </div>
</template>

<style scoped>
.star-map-bg {
  @media (min-width: 640px) {
    background-image: url("/images/checkout-bg.webp");
  }
}
</style>
