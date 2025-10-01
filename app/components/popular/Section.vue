<script setup lang="ts">
import PopularCard from './Card.vue'
import type {PopularItem} from '~/types/index'
import { Carousel, CarouselContent, CarouselItem, CarouselPagination } from '~/components/ui/carousel'
const {isMobile} = useBreakpoints();

const popularItems: PopularItem[] = [
  {
    id: 1,
    title: 'Moon map',
    price: 1099,
    discount: '50%',
    description: 'Choose the location, date & time and picture the stars at that exact moment'
  },
  {
    id: 2,
    title: 'Star Map',
    price: 2499,
    discount: '50%',
    description: 'Capture the exact star configuration from your special wedding night'
  },
  {
    id: 3,
    title: 'Birth Star Map',
    price: 1999,
    discount: '50%',
    description: 'Show the stars as they appeared on your birth date and location'
  },
  {
    id: 4,
    title: 'Anniversary Star Map',
    price: 2299,
    discount: '50%',
    description: 'Commemorate your anniversary with the stars from that magical night'
  },
]
</script>

<template>
  <div class="p-4 md:px-6 md:py-10 bg-white">
    <div class="flex items-center gap-16 mb-6 md:mb-7.5">
      <h2 class="font-extrabold md:text-lg">Customers also Purchased</h2>

      <div class="hidden md:block py-2.5 px-5 bg-[#E4E3DB] rounded-md">
        <span>Buy one get one <strong class="font-extrabold">50% OFF</strong> on all prints</span>
      </div>
    </div>
    <Carousel
      class="w-full"
      :opts="{
        align: 'start',
        loop: false,
        skipSnaps: false,
        dragFree: false
      }"
    >
      <CarouselContent class="-ml-2 md:-ml-2">
        <CarouselItem
          v-for="item in popularItems"
          :key="item.id"
          class="max-w-[180px] md:max-w-max md:basis-1/3"
        >
          <PopularCard
            :description="item.description"
            :discount="item.discount"
            :title="item.title"
            :price="item.price"
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPagination v-if="!isMobile"/>
    </Carousel>

  </div>
</template>

<style scoped>

</style>
