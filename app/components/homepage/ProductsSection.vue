<template>
  <section class="bg-gray-50 py-8">
    <div class="max-w-[1600px] mx-auto px-6">

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

<script setup>
import { ref, computed, onMounted, nextTick, watchEffect, watch } from 'vue'

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