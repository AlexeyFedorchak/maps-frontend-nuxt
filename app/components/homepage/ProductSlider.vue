<template>
    <div class="w-full sm:w-auto min-h-[200px]">
      <Carousel 
        class="relative w-full"
        @init-api="setApi"
        :opts="{
          loop: false,
          align: 'start',
          slidesToScroll: 1,
          breakpoints: {
            '(min-width: 768px)': { slidesToScroll: 2 },
            '(min-width: 1024px)': { slidesToScroll: 4 },
          },
        }"
      >
        <CarouselContent>
          <CarouselItem 
            v-for="(product, index) in products" 
            :key="product.id || index" 
            class="md:basis-1/2 lg:basis-1/4"
          >
            <div class="p-1">
              <Card>
                <CardContent class="flex aspect-square items-center justify-center p-6">
                  <div class="text-center">
                    <span class="text-4xl font-semibold">{{ product.name || index + 1 }}</span>
                    <p v-if="product.price" class="mt-2 text-sm text-gray-600">{{ product.price }}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
  
      <div class="flex justify-center gap-2 mt-4">
        <button
          v-for="(_, index) in scrollSnaps"
          :key="index"
          @click="scrollTo(index)"
          class="dot"
          :class="index === selectedIndex ? 'active' : ''"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, nextTick } from "vue"
  import { Card, CardContent } from "@/components/ui/card"
  import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"
  
  interface Product {
    id?: string | number
    name?: string
    price?: string
    image?: string
    [key: string]: any
  }
  
  interface Props {
    products?: Product[]
  }
  
  const props = withDefaults(defineProps<Props>(), {
    products: () => Array.from({ length: 9 }, (_, i) => ({ id: i + 1 }))
  })
  
  const api = ref<CarouselApi | null>(null)
  const scrollSnaps = ref<number[]>([])
  const selectedIndex = ref<number>(0)
  
  const setApi = (emblaApi: CarouselApi | undefined) => {
    if (!emblaApi) return
    api.value = emblaApi
    
    scrollSnaps.value = emblaApi.scrollSnapList()
    
    const updateSelected = () => {
      selectedIndex.value = emblaApi.selectedScrollSnap()
    }
    
    emblaApi.on("select", updateSelected)
    updateSelected()
  }
  
  const scrollTo = (index: number) => {
    api.value?.scrollTo(index)
  }
  
  const handleResize = () => {
    api.value?.reInit()
    scrollSnaps.value = api.value?.scrollSnapList() || []
  }
  
  onMounted(async () => {
    await nextTick()
    window.addEventListener("resize", handleResize)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize)
  })
  </script>
  
  <style scoped>
  .dot {
    transition: all 0.3s;
    border-radius: 9999px;
    width: 0.5rem;
    height: 0.5rem;
    background-color: #a5a5a5;
  }
  
  .dot.active {
    background-color: #C1CAC1;
    width: 2rem;
    height: 0.5rem;
  }
  </style>