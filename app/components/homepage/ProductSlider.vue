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
            :class="[itemBasisClass, itemPaddingClass]"

          >
            <div class="relative" :class="image">
                  <div class="relative">
                    <img 
                    :src="product.image || '/images/Component 28.png'" 
                    :alt="product.name || `Product ${index + 1}`"
                    class="w-full h-full object-cover transition-transform mx-auto"
                  />
                  <div 
                   v-if="product.label" 
                   class="absolute bottom-3 left-3 bg-[#E4E2DA] px-3 py-1 font-lato font-normal text-[14px] tracking-[1.01px] leading-auto uppercase"
                   :class="product.labelClass"
                  >
                  {{ product.label }}
                  </div>
                  </div>
            </div>
            <div :class="titleClass">
                {{ product.name }}
            </div>
            <div :class="priceClass">
                {{ product.price }}
                <span v-if="product.freeShipping" :class="shippingClass">{{ product.freeShipping }}</span>
            </div>
            <div :class="descriptionClass" class="whitespace-pre-line">
                {{ product.description }}
            </div>

          </CarouselItem>
        </CarouselContent>
      </Carousel>
  
      <div class="flex justify-center gap-2 mt-20" :class="{ hidden: scrollSnaps.length == 1}">
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
    label?: string
    description?: Text
    freeShipping?: string
    new?: string
    [key: string]: any
  }
  
  interface Props {
    products?: Product[]
    titleClass?: string,
    priceClass?: string,
    shippingClass?: string
    descriptionClass?: string,
    itemBasisClass?: string,
    itemPaddingClass?: string
    label?: string
    image?: string
    new?: string
    labelClass?: string
  }
  
  const props = withDefaults(defineProps<Props>(), {
    products: () => Array.from({ length: 9 }, (_, i) => ({ id: i + 1 })),
    titleClass: 'font-lato font-extrabold text-[18px] leading-[120%] tracking-[1.6px] uppercase mt-[15px]',
    priceClass: 'font-lato font-bold text-[16px] leading-auto tracking-[1.2px] text-[#25282D] mt-[10px]',
    shippingClass: 'font-roboto font-normal text-[16px] leading-[22px] tracking-[0px] text-[#a5a5a5]',
    descriptionClass: 'font-lato font-normal text-[16px] leading-[125%] tracking-[0px] text-[#787878] mt-[15px]',
    itemBasisClass: 'md:basis-1/2 lg:basis-1/4',
    itemPaddingClass: ''
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