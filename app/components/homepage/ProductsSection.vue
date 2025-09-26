<template>
  <section class="bg-gray-50 py-8">
    <div class="max-w-[1600px] mx-20">

      <div class="mb-10 overflow-x-auto scrollbar-hide">
        <div class="flex gap-2 px-4 justify-center min-w-max min-h-11">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = index"
            class="px-4 py-2 rounded-full font-lato font-semibold text-[14px] leading-[0.22px] tracking-[0.7px] uppercase tracking-wider transition-colors duration-300 whitespace-nowrap flex-shrink-0"
            :class="activeTab === index 
              ? 'bg-[#CDCAC1] text-black-800' 
              : 'bg-white text-gray-700'"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="product-section">
        <div :class="activeTab === 'bestsellers' ? 'block' : 'hidden'">
          <div class="w-full sm:w-auto min-h-[200px]">
            <Carousel 
            class="relative w-full"
             @init-api="setApi"
            :opts="{
              loop: false,
              align: 'start',
              slidesToScroll: 1,
              breakpoints: {
                '(min-width: 768px)': { slidesToScroll: 2 }, // tablet
                '(min-width: 1024px)': { slidesToScroll: 4 }, // desktop
              },
            }"
            >
              <CarouselContent>
                <CarouselItem v-for="(_, index) in 9" :key="index" class="md:basis-1/2 lg:basis-1/4">
                  <div class="p-1">
                    <Card>
                      <CardContent class="flex aspect-square items-center justify-center p-6">
                        <span class="text-4xl font-semibold">{{ index + 1}}</span>
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
        </div>
        <div :class="activeTab === 'star_map' ? 'block' : 'hidden'">
          <p class="uppercase">{{ activeTab }}</p>
        </div>
        <div :class="activeTab === 'custom_jewellery' ? 'block' : 'hidden'">
          <p class="uppercase">{{ activeTab }}</p>
        </div>
        <div :class="activeTab === 'moon_map' ? 'block' : 'hidden'">
          <p class="uppercase">{{ activeTab }}</p>
        </div>
        <div :class="activeTab === 'location_map' ? 'block' : 'hidden'">
          <p class="uppercase">{{ activeTab }}</p>
        </div>
        <div :class="activeTab === 'deep_space' ? 'block' : 'hidden'">
          <p class="uppercase">{{ activeTab }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref,  onMounted, onBeforeUnmount, nextTick, watchEffect } from "vue"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel"

const api = ref<CarouselApi | null >(null)
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

const activeTab = ref('bestsellers')
const isMounted = ref(false)

const tabs = {
  'bestsellers': 'Bestsellers',
  'star_map': 'Star Map',
  'custom_jewellery': 'Custom Jewellery',
  'moon_map': 'MOON MAP',
  'location_map': 'LOCATION MAP',
  'deep_space': 'DEEP SPACE'
}

onMounted(async () => {
  await nextTick()
  isMounted.value = true

  const handleResize = () => {
    api.value?.reInit()
    scrollSnaps.value = api.value?.scrollSnapList() || []
  }

  window.addEventListener("resize", handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", () => api.value?.reInit())
})

watchEffect(() => {
  if (process.client && !isMounted.value) {
    setTimeout(() => {
      isMounted.value = true
    }, 100)
  }
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