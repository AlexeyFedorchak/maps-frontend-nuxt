<template>
  <section class="bg-gray-50 py-8">
    <div class="max-w-[1600px] mx-auto px-6">
      <div class="text-center mb-6 md:hidden">
        <p class="font-lato font-medium text-lg text-gray-600 max-w-xs mx-auto px-4 leading-tight">
          Explore more personalised products<br>and ways to capture your moment
        </p>
      </div>
      
      <div class="hidden md:block text-center mb-6">
        <p class="font-lato font-medium text-lg text-gray-600 max-w-2xl mx-auto">
          Explore more personalised products and ways to capture your moment
        </p>
      </div>

      <div class="flex justify-center gap-2 mb-10 md:hidden">
        <button
          v-for="(tab, index) in tabs.slice(0, 3)"
          :key="index"
          @click="activeTab = index"
          class="px-4 py-2 rounded-full font-lato font-semibold text-xs uppercase tracking-wider transition-colors duration-300 whitespace-nowrap flex-shrink-0"
          :class="activeTab === index 
            ? 'bg-stone-200 text-gray-800' 
            : 'bg-white text-gray-700'"
        >
          {{ tab }}
        </button>
      </div>
      
      <div class="hidden md:flex justify-center gap-2 mb-10 overflow-x-auto scrollbar-hide px-4 md:px-0">
        <div class="flex gap-2 min-w-max">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = index"
            class="px-4 py-3 rounded-full font-lato font-semibold text-xs md:text-sm uppercase tracking-wider transition-colors duration-300 whitespace-nowrap flex-shrink-0"
            :class="activeTab === index 
              ? 'bg-stone-200 text-gray-800' 
              : 'bg-white text-gray-700 hover:bg-gray-100'"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="hidden md:block relative">
        <div class="overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="carouselStyle"
          >
            <div class="w-full flex-shrink-0">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div 
                  v-for="(product, index) in productsSlide1" 
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

            <div class="w-full flex-shrink-0">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div 
                  v-for="(product, index) in productsSlide2" 
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

        <div class="flex justify-center gap-2 mt-10">
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
        <div class="overflow-hidden px-4">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${mobileCurrentSlide * 100}%)` }"
          >
            <div 
              v-for="(product, index) in allProducts" 
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
                  Choose the location, date & time and picture
                  the stars at that exact moment
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center gap-2 mt-8">
          <button
            v-for="(product, index) in allProducts"
            :key="'mobile-dot-' + index"
            @click="() => { if (isMounted) mobileCurrentSlide = index }"
            class="dot transition-all duration-300"
            :class="{ 'active': mobileCurrentSlide === index }"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watchEffect } from 'vue'

const activeTab = ref(0)
const currentSlide = ref(0)
const mobileCurrentSlide = ref(0)
const isMounted = ref(false)
const totalSlides = 2

const carouselStyle = computed(() => {
  if (!isMounted.value && process.server) {
    return { transform: 'translateX(0%)' }
  }
  return { transform: `translateX(-${currentSlide.value * 100}%)` }
})

const allProducts = computed(() => {
  return [...productsSlide1, ...productsSlide2]
})


const tabs = [
  'BESTSELLERS',
  'STAR MAP', 
  'CUSTOM JEWELLERY',
  'MOON MAP',
  'LOCATION MAP',
  'DEEP SPACE'
]


const productsSlide1 = [
  {
    title: 'MYSTIC NIGHT STAR MAP',
    price: '21.99',
    description: 'Choose the location, date & time and picture the stars at that exact moment',
    freeShipping: true
  },
  {
    title: 'MYSTIC NIGHT STAR MAP', 
    price: '21.99',
    description: 'Choose the location, date & time and picture the stars at that exact moment',
    freeShipping: true
  },
  {
    title: 'MYSTIC NIGHT STAR MAP',
    price: '21.99', 
    description: 'Choose the location, date & time and picture the stars at that exact moment',
    freeShipping: true
  },
  {
    title: 'MYSTIC NIGHT STAR MAP',
    price: '21.99',
    description: 'Choose the location, date & time and picture the stars at that exact moment', 
    freeShipping: true
  }
]

const productsSlide2 = [
  {
    title: 'CUSTOM STAR MAP',
    price: '24.99',
    description: 'Personalize your star map with custom text and colors',
    freeShipping: true
  },
  {
    title: 'PREMIUM STAR MAP',
    price: '29.99', 
    description: 'High quality print with premium framing options',
    freeShipping: true
  },
  {
    title: 'LOCATION MAP',
    price: '19.99',
    description: 'Create a beautiful map of your special location',
    freeShipping: true
  },
  {
    title: 'MOON PHASE MAP',
    price: '22.99',
    description: 'Capture the moon phase of your special moment',
    freeShipping: true
  }
]

onMounted(async () => {
  await nextTick()
  isMounted.value = true
  console.log('ProductsSection mounted:', isMounted.value)
  console.log('Total slides:', totalSlides)
})

watchEffect(() => {
  if (process.client && !isMounted.value) {
    setTimeout(() => {
      isMounted.value = true
      console.log('ProductsSection force mounted via watchEffect')
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
