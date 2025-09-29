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
        <HomepageProductSlider/>
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

const activeTab = ref('bestsellers')

const tabs = {
  'bestsellers': 'Bestsellers',
  'star_map': 'Star Map',
  'custom_jewellery': 'Custom Jewellery',
  'moon_map': 'MOON MAP',
  'location_map': 'LOCATION MAP',
  'deep_space': 'DEEP SPACE'
}
</script>