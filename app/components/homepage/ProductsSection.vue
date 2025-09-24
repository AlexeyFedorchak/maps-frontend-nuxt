<template>
  <section class="bg-gray-50 py-8">
    <div class="max-w-[1600px] mx-auto px-6">
      <div class="text-center mb-6 md:hidden">
        <p class="font-lato font-medium text-lg text-gray-600 max-w-xs mx-auto px-4 leading-tight" v-html="currentSectionData.mobileDescription">
        </p>
      </div>
      
      <div class="hidden md:block text-center mb-6">
        <p class="font-lato font-medium text-[20px] text-black-600 leading-[1.35px] max-w-2xl mx-auto">
          {{ currentSectionData.desktopDescription }}
        </p>
      </div>

      <div class="mb-10 md:hidden overflow-x-auto scrollbar-hide">
        <div class="flex gap-2 px-4 justify-center min-w-max">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = index"
            class="px-4 py-2 rounded-full font-lato font-semibold text-[14px] leading-[0.22px] tracking-[0.7px] uppercase tracking-wider transition-colors duration-300 whitespace-nowrap flex-shrink-0"
            :class="activeTab === index 
              ? 'bg-stone-200 text-gray-800' 
              : 'bg-white text-gray-700'"
          >
            {{ tab }}
          </button>
        </div>
      </div>
      
      <div class="hidden md:flex justify-center gap-2 mb-10 overflow-x-auto scrollbar-hide px-4 md:px-0">
        <div class="flex gap-2 min-w-max">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = index"
            class="px-4 py-3 rounded-full font-lato font-semibold text-[14px] tracking-wider md:text-sm uppercase transition-colors duration-300 whitespace-nowrap flex-shrink-0"
            :class="activeTab === index 
              ? 'bg-stone-200 text-gray-800' 
              : 'bg-white text-gray-700 hover:bg-gray-100'"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="hidden md:block relative">
        <div v-if="currentSectionData.products.length > 0" class="overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="carouselStyle"
          >
            <div class="w-full flex-shrink-0">
              <div v-if="activeTab === 3" class="flex justify-center">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
                  <div 
                    v-for="(product, index) in currentSectionData.products.slice(0, Math.min(4, currentSectionData.products.length))" 
                    :key="'slide1-' + index"
                    class="text-left"
                  >
                    <div class="mb-6">
                      <img 
                        src="/images/Component 27.png" 
                        :alt="product.title"
                        class="w-full h-auto"
                      />
                    </div>
                    
                    <div 
                      v-if="product.badge"
                      class="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded text-[18px] font-extrabold leading-[1.2px] tracking-[1.6px] mb-2 uppercase"
                    >
                      {{ product.badge }}
                    </div>
                    
                    <h3 class="font-lato font-extrabold text-[18px] leading-[1.2px] tracking-[1.6px] text-gray-900 mb-2 uppercase ">
                      {{ product.title }}
                    </h3>
                    
                    <div class="mb-3">
                      <span class="font-lato font-bold text-[16px] leading-auto tracking-[1.2px] text-gray-900">
                        FROM £ {{ product.price }}
                      </span>
                      <span 
                        v-if="product.freeShipping"
                        class="text-gray-500 text-[16px] font-roboto leading-[2.2px] ml-2"
                      >
                        Free Shipping
                      </span>
                    </div>
                    
                    <p class="font-lato text-[16px] leading-[125%] font-normal text-gray-600 leading-relaxed">
                      {{ product.description }}
                    </p>
                  </div>
                </div>
              </div>
              
              <div v-else :class="activeTab === 0 ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'">
                <div 
                  v-for="(product, index) in currentSectionData.products.slice(0, Math.min(activeTab === 0 ? 4 : 5, currentSectionData.products.length))" 
                  :key="'slide1-' + index"
                  class="text-left"
                >
                  <div class="mb-4">
                    <img 
                      src="/images/Component 27.png" 
                      :alt="product.title"
                      class="w-full h-auto"
                    />
                  </div>
                  
                  <div 
                    v-if="product.badge"
                    class="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-medium mb-2 uppercase"
                  >
                    {{ product.badge }}
                  </div>
                  
                  <h3 class="font-lato font-bold text-xl text-gray-900 mb-2 uppercase">
                    {{ product.title }}
                  </h3>
                  
                  <div class="mb-3">
                    <span class="font-lato font-bold text-lg text-gray-900">
                      FROM £ {{ product.price }}
                    </span>
                    <span 
                      v-if="product.freeShipping"
                      class="text-gray-500 text-sm font-normal ml-2"
                    >
                      Free Shipping
                    </span>
                  </div>
                  
                  <p class="font-lato text-sm text-gray-600 leading-relaxed">
                    {{ product.description }}
                  </p>
                </div>
              </div>
            </div>

            <div v-if="needsSecondSlide" class="w-full flex-shrink-0">
              <div v-if="activeTab === 3" class="flex justify-center">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
                  <div 
                    v-for="(product, index) in currentSectionData.products.slice(Math.min(4, currentSectionData.products.length))" 
                    :key="'slide2-' + index"
                    class="text-left"
                  >
                    <div class="mb-6">
                      <img 
                        src="/images/Component 27.png" 
                        :alt="product.title"
                        class="w-full h-auto"
                      />
                    </div>
                    
                    <div 
                      v-if="product.badge"
                      class="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-medium mb-2 uppercase"
                    >
                      {{ product.badge }}
                    </div>
                    
                    <h3 class="font-lato font-bold text-xl text-gray-900 mb-2 uppercase">
                      {{ product.title }}
                    </h3>
                    
                    <div class="mb-3">
                      <span class="font-lato font-bold text-lg text-gray-900">
                        FROM £ {{ product.price }}
                      </span>
                      <span 
                        v-if="product.freeShipping"
                        class="text-gray-500 text-sm font-normal ml-2"
                      >
                        Free Shipping
                      </span>
                    </div>
                    
                    <p class="font-lato text-sm text-gray-600 leading-relaxed">
                      {{ product.description }}
                    </p>
                  </div>
                </div>
              </div>
              
              <div v-else :class="activeTab === 0 ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'">
                <div 
                  v-for="(product, index) in currentSectionData.products.slice(activeTab === 0 ? 4 : 5)" 
                  :key="'slide2-' + index"
                  class="text-left"
                >
                  <div class="mb-4">
                    <img 
                      src="/images/Component 27.png" 
                      :alt="product.title"
                      class="w-full h-auto"
                    />
                  </div>
                  
                  <div 
                    v-if="product.badge"
                    class="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-medium mb-2 uppercase"
                  >
                    {{ product.badge }}
                  </div>
                  
                  <h3 class="font-lato font-bold text-xl text-gray-900 mb-2 uppercase">
                    {{ product.title }}
                  </h3>
                  
                  <div class="mb-3">
                    <span class="font-lato font-bold text-lg text-gray-900">
                      FROM £ {{ product.price }}
                    </span>
                    <span 
                      v-if="product.freeShipping"
                      class="text-gray-500 text-sm font-normal ml-2"
                    >
                      Free Shipping
                    </span>
                  </div>
                  
                  <p class="font-lato text-sm text-gray-600 leading-relaxed">
                    {{ product.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="flex items-center justify-center" style="min-height: 600px;">
          <div class="text-center">
            <p class="font-lato text-lg text-gray-500">
              {{ currentSectionData.desktopDescription }}
            </p>
          </div>
        </div>

        <div v-if="currentSectionData.products.length > 0 && totalSlides > 1" class="flex justify-center gap-2 mt-10">
          <button
            v-for="(slide, index) in totalSlides"
            :key="'dot-' + index"
            @click="() => { if (isMounted) currentSlide = index }"
            class="dot transition-all duration-300"
            :class="{ 'active': currentSlide === index }"
          ></button>
        </div>
      </div>

      <div class="block md:hidden">
        <div v-if="currentSectionData.products.length > 0">
          <div class="overflow-hidden px-4">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${mobileCurrentSlide * 100}%)` }"
            >
              <div 
                v-for="(product, index) in currentSectionData.products" 
                :key="'mobile-' + index"
                class="w-full flex-shrink-0 px-4"
              >
                <div class="mb-6">
                  <img 
                    src="/images/Component 27.png" 
                    :alt="product.title"
                    class="w-full h-auto max-w-[320px] mx-auto"
                  />
                </div>
                
                <div 
                  v-if="product.badge"
                  class="inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs font-medium mb-2 uppercase max-w-[320px] mx-auto"
                >
                  {{ product.badge }}
                </div>
                
                <div class="max-w-[320px] mx-auto">
                  <h3 class="font-lato font-bold text-lg text-gray-900 mb-2 uppercase text-left">
                    {{ product.title }}
                  </h3>
                  
                  <div class="mb-4 text-left">
                    <span class="font-lato font-bold text-lg text-gray-900">
                      FROM £ {{ product.price }}
                    </span>
                    <span 
                      v-if="product.freeShipping"
                      class="text-gray-500 text-sm font-normal ml-2"
                    >
                      Free Shipping
                    </span>
                  </div>
                  
                  <p class="font-lato text-sm text-gray-600 leading-relaxed text-left">
                    {{ product.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-center gap-2 mt-8">
            <button
              v-for="(product, index) in currentSectionData.products"
              :key="'mobile-dot-' + index"
              @click="() => { if (isMounted) mobileCurrentSlide = index }"
              class="dot transition-all duration-300"
              :class="{ 'active': mobileCurrentSlide === index }"
            ></button>
          </div>
        </div>

        <div v-else class="flex items-center justify-center px-4" style="min-height: 600px;">
          <div class="text-center">
            <p class="font-lato text-lg text-gray-500">
              {{ currentSectionData.desktopDescription }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watchEffect, watch } from 'vue'

const activeTab = ref(0)
const currentSlide = ref(0)
const mobileCurrentSlide = ref(0)
const isMounted = ref(false)

const carouselStyle = computed(() => {
  if (!isMounted.value && process.server) {
    return { transform: 'translateX(0%)' }
  }
  return { transform: `translateX(-${currentSlide.value * 100}%)` }
})

const tabs = [
  'BESTSELLERS',
  'STAR MAP', 
  'CUSTOM JEWELLERY',
  'MOON MAP',
  'LOCATION MAP',
  'DEEP SPACE'
]

const totalSlides = computed(() => {
  if (activeTab.value === 0) {
    return Math.ceil(currentSectionData.value.products.length / 4)
  } else if (activeTab.value === 3) {
    return Math.ceil(currentSectionData.value.products.length / 3)
  } else {
    return Math.ceil(currentSectionData.value.products.length / 5)
  }
})

const needsSecondSlide = computed(() => {
  if (activeTab.value === 0) {
    return currentSectionData.value.products.length > 4
  } else if (activeTab.value === 3) {
    return currentSectionData.value.products.length > 3
  } else {
    return currentSectionData.value.products.length > 5
  }
})


const sectionsData = {
  0: {
    mobileDescription: 'Explore more personalised products<br>and ways to capture your moment',
    desktopDescription: 'Explore more personalised products and ways to capture your moment',
    products: [
      {
        title: 'ORIGINAL STAR MAP',
        price: '21.99',
        description: 'Choose the location, date & time and picture the stars at that exact moment',
        freeShipping: true
      },
      {
        title: 'MYSTIC NIGHT STAR MAP', 
        price: '21.99',
        badge: 'LIMITED EDITION',
        description: 'Choose the location, date & time and picture the stars at that exact moment',
        freeShipping: true
      },
      {
        title: 'REAL PHOTO STAR MAP',
        price: '21.99',
        description: 'Choose the location, date & time and picture the stars at that exact moment',
        freeShipping: true
      },
      {
        title: 'STARLIGHT STAR MAP',
        price: '21.99',
        badge: 'NEW',
        description: 'Choose the location, date & time and picture the stars at that exact moment', 
        freeShipping: true
      },
      {
        title: 'WATERCOLOUR STAR MAP',
        price: '21.99',
        badge: 'NEW',
        description: 'Choose the location, date & time and picture the stars at that exact moment', 
        freeShipping: true
      },
      {
        title: 'CONSTELLATION MAP',
        price: '24.99',
        description: 'Beautiful constellation patterns with custom coordinates',
        freeShipping: true
      },
      {
        title: 'VINTAGE STAR MAP',
        price: '26.99',
        description: 'Classic vintage style star map with aged paper effect',
        freeShipping: true
      },
      {
        title: 'GALAXY STAR MAP',
        price: '23.99',
        description: 'Stunning galaxy background with your special star alignment',
        freeShipping: true
      }
    ]
  },
  1: {
    mobileDescription: 'Create beautiful personalized<br>star maps for any special moment',
    desktopDescription: 'Create beautiful personalized star maps for any special moment in time',
    products: [
      {
        title: 'CLASSIC STAR MAP',
        price: '19.99',
        description: 'Traditional black and white star map with constellation lines',
        freeShipping: true
      },
      {
        title: 'MODERN STAR MAP',
        price: '22.99',
        description: 'Contemporary design with clean lines and minimal style',
        freeShipping: true
      },
      {
        title: 'COLORFUL STAR MAP',
        price: '24.99',
        description: 'Vibrant colors showing the beauty of the night sky',
        freeShipping: true
      },
      {
        title: 'PREMIUM STAR MAP',
        price: '29.99',
        badge: 'PREMIUM',
        description: 'High-quality print with premium paper and framing options',
        freeShipping: true
      },
      {
        title: 'VINTAGE STAR MAP',
        price: '26.99',
        description: 'Classic vintage style star map with aged paper effect',
        freeShipping: true
      }
    ]
  },
  2: {
    mobileDescription: 'Handcrafted personalized jewelry<br>with your special coordinates',
    desktopDescription: 'Handcrafted personalized jewelry featuring your special coordinates and moments',
    products: [
      {
        title: 'STAINLESS STEEL STAR MAP',
        price: '39.99',
        description: 'Custom made engraved Star Map Necklace. Created using your chosen location, date & time.',
        freeShipping: true
      },
      {
        title: 'BLACK STEEL STAR MAP',
        price: '44.99',
        description: 'Custom made engraved Star Map Necklace. Created using your chosen location, date & time.',
        freeShipping: true
      },
      {
        title: '9CT SOLID GOLD STAR MAP',
        price: '149.99',
        description: 'Custom made engraved Star Map Necklace. Created using your chosen location, date & time.',
        freeShipping: true
      },
      {
        title: '925 STERLING SILVER STAR MAP',
        price: '49.99',
        description: 'Custom made engraved Star Map Necklace. Created using your chosen location, date & time.',
        freeShipping: true
      },
      {
        title: '9CT SOLID GOLD STAR MAP',
        price: '149.99',
        description: 'Custom made engraved Star Map Necklace. Created using your chosen location, date & time.',
        freeShipping: true
      }
    ]
  },
  3: {
    mobileDescription: 'Capture the exact moon phase<br>from your special moment',
    desktopDescription: 'Capture the exact moon phase from your most important moments in time',
    products: [
      {
        title: 'ORIGINAL MOON MAP',
        price: '21.99',
        description: 'Choose the location, date & time and picture the Moon at that exact moment',
        freeShipping: true
      },
      {
        title: 'ORIGINAL MOON MAP',
        price: '21.99',
        description: 'Choose the location, date & time and picture the Moon at that exact moment',
        freeShipping: true
      },
      {
        title: 'ORIGINAL MOON MAP',
        price: '21.99',
        description: 'Choose the location, date & time and picture the Moon at that exact moment',
        freeShipping: true
      }
    ]
  },
  4: {
    mobileDescription: 'Beautiful maps of your<br>most meaningful locations',
    desktopDescription: '',
    products: []
  },
  5: {
    mobileDescription: 'Stunning deep space imagery<br>and cosmic phenomena',
    desktopDescription: 'Explore the wonders of deep space with stunning imagery from the cosmos',
    products: [
      {
        title: 'TARANTULA NEBULA',
        price: '19.99',
        description: 'Breathtaking view of the Tarantula Nebula in vibrant cosmic colors',
        freeShipping: true
      },
      {
        title: 'TARANTULA NEBULA',
        price: '19.99',
        description: 'Alternative view of the magnificent Tarantula Nebula formation',
        freeShipping: true
      },
      {
        title: 'TARANTULA NEBULA',
        price: '19.99',
        description: 'Close-up detail of the star-forming region in Tarantula Nebula',
        freeShipping: true
      },
      {
        title: 'TARANTULA NEBULA',
        price: '19.99',
        description: 'Wide-field view showing the full extent of this cosmic wonder',
        freeShipping: true
      },
      {
        title: 'TARANTULA NEBULA',
        price: '19.99',
        description: 'Enhanced color version highlighting the nebula\'s structure',
        freeShipping: true
      },
      {
        title: 'TARANTULA NEBULA',
        price: '19.99',
        description: 'High-resolution image perfect for space enthusiasts',
        freeShipping: true
      }
    ]
  }
}

const currentSectionData = computed(() => {
  return sectionsData[activeTab.value] || sectionsData[0]
})

watch(activeTab, () => {
  currentSlide.value = 0
  mobileCurrentSlide.value = 0
})

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
