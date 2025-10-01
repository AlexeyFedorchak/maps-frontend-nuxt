<script setup lang="ts">
import { useCarousel } from "./useCarousel"
import { cn } from "@/lib/utils"

const props = defineProps<{
  class?: string
}>()

const { carouselApi } = useCarousel()

const current = ref(0)
const count = ref(0)

// Watch for carousel API changes
watch(carouselApi, (api) => {
  if (api) {
    const updatePagination = () => {
      current.value = api?.selectedScrollSnap() ?? 0
      count.value = api?.scrollSnapList().length ?? 0
    }

    updatePagination()
    api.on("select", updatePagination)
    api.on("init", updatePagination)
  }
}, { immediate: true })

function goToSlide(index: number) {
  carouselApi.value?.scrollTo(index)
}
</script>

<template>
  <div :class="cn('flex justify-center items-center gap-2 mt-8', props.class)">
    <button
      v-for="(_, index) in count"
      :key="index"
      :class="cn(
        'rounded-full transition-all duration-300 ease-in-out',
        current === index
          ? 'bg-black h-1.5 w-6' // Active: oval shape
          : 'bg-gray-300 hover:bg-gray-400 h-1.5 w-1.5' // Inactive: circle
      )"
      @click="goToSlide(index)"
      :aria-label="`Go to slide ${index + 1}`"
    />
  </div>
</template>
