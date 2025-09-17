<template>
  <section class="bg-white py-32 md:py-40">
    <div class="w-full px-0">
      <div class="text-center mb-16 md:mb-20 px-6">
        <div class="block md:hidden">
          <h2 class="font-lato font-extrabold text-2xl text-gray-900 mb-4 tracking-wide leading-tight">
            WHY 50,000+ PEOPLE<br>CAPTURED THEIR STORIES<br>FOREVER.
          </h2>
          <p class="font-lato font-medium text-base text-gray-600">
            Real moments. Real memories.<br>Rated Excellent on Trustpilot.
          </p>
        </div>
        
        <div class="hidden md:block">
          <h2 class="font-lato font-extrabold text-3xl md:text-4xl text-gray-900 mb-4 tracking-wide">
            WHY 50,000+ PEOPLE CAPTURED THEIR STORIES FOREVER.
          </h2>
          <p class="font-lato font-medium text-lg" style="color: #787878;">
            Real moments. Real memories. Rated Excellent on Trustpilot.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-7 gap-8 items-start px-6">
        <div class="hidden md:block lg:col-span-1">
          <div class="border border-gray-200 p-4 bg-white min-h-[180px] h-[180px] flex flex-col justify-start pt-2">
            <div class="text-center">
              <div class="mb-2">
                <div class="font-lato font-bold text-gray-900 text-lg mb-1">
                  Excellent
                </div>
              </div>
              
              <div class="mb-3">
                <div class="flex justify-center mb-2">
                  <div class="flex space-x-1">
                    <img src="/images/Frame 89.png" alt="Star" class="w-20 h-6" />
                  </div>
                </div>
                <p class="text-sm text-gray-600 mb-1">
                  Based on <span class="font-bold underline">{{ totalReviews > 0 ? totalReviews : mockReviews.length }} reviews</span>
                </p>
              </div>

              <div class="flex items-center justify-center">
                <img src="/images/Vector.png" alt="Star" class="w-5 h-5 mr-2" />
                <span class="font-lato font-semibold text-gray-900">Trustpilot</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="block md:hidden mb-8 py-4">
          <div class="max-w-sm mx-auto px-4">
            <div class="text-center">
              <div class="mb-4">
                <div class="font-lato font-bold text-gray-900 text-3xl mb-2">
                  Excellent
                </div>
              </div>
              
              <div class="mb-4">
                <div class="flex justify-center mb-3">
                  <div class="flex space-x-1">
                    <img src="/images/Frame 89.png" alt="Star" class="w-28 h-7" />
                  </div>
                </div>
                <p class="text-base text-gray-600 mb-3">
                  Based on <span class="font-bold underline">{{ totalReviews > 0 ? totalReviews : mockReviews.length }} reviews</span>
                </p>
              </div>

              <div class="flex items-center justify-center">
                <img src="/images/Vector.png" alt="Star" class="w-6 h-6 mr-3" />
                <span class="font-lato font-semibold text-gray-900 text-xl">Trustpilot</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="block md:hidden">
          <div class="max-w-7xl mx-auto">
            <div class="overflow-x-auto px-4">
              <div class="flex gap-4">
                <div 
                  v-for="(review, index) in reviewSlides[0].slice(0, 3)" 
                  :key="'mobile-review-' + index"
                  class="flex-shrink-0 w-84 bg-white border border-gray-200 p-5 shadow-sm"
                >
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex space-x-1">
                      <img src="/images/Frame 89.png" alt="5 Stars" class="w-20 h-4" />
                    </div>
                    <span class="text-xs text-gray-500">{{ review.timeAgo }}</span>
                  </div>

                  <h3 class="font-lato font-bold text-gray-900 mb-3 text-sm">
                    {{ review.title }}
                  </h3>

                  <p class="font-lato text-sm text-gray-600 leading-relaxed mb-4">
                    {{ review.content }}
                  </p>

                  <div class="border-b border-gray-200 mb-4 w-16"></div>

                  <div class="flex items-center">
                    <div class="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center mr-3">
                      <span class="text-gray-600 text-xs font-semibold">
                        {{ review.reviewer.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <div>
                      <p class="font-lato font-semibold text-gray-900 text-sm">{{ review.reviewer }}</p>
                      <p class="text-xs text-gray-500">Worldtraveler</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="hidden md:block lg:col-span-5 xl:col-span-6">
          <div class="relative overflow-hidden">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="carouselStyle"
            >
              <div 
                v-for="(slide, slideIndex) in reviewSlides" 
                :key="'slide-' + slideIndex"
                class="w-full flex-shrink-0"
              >
                <div class="grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 min-h-[160px]">
                  <div 
                    v-for="(review, reviewIndex) in slide" 
                    :key="'review-' + review.id"
                    class="review-card border border-gray-200 p-4 bg-white hover:shadow-lg transition-shadow duration-300"
                  >
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex space-x-1">
                        <img src="/images/Frame 89.png" alt="5 Stars" class="w-20 h-4" />
                      </div>
                      <span class="text-xs text-gray-500">{{ review.timeAgo }}</span>
                    </div>

                    <h3 class="font-lato font-bold text-gray-900 mb-2 text-sm">
                      {{ review.title }}
                    </h3>

                    <p class="font-lato text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
                      {{ review.content }}
                    </p>

                    <div class="border-b border-gray-200 mb-3 w-16"></div>

                    <div class="flex items-center">
                      <div class="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                        <span class="text-gray-600 text-xs font-semibold">
                          {{ review.reviewer.charAt(0).toUpperCase() }}
                        </span>
                      </div>
                      <div>
                        <p class="font-lato font-semibold text-gray-900 text-xs">{{ review.reviewer }}</p>
                        <p class="text-xs text-gray-500">Worldtraveler</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

  <div class="flex justify-center gap-2 mt-12">
    <button
      v-for="(slide, index) in reviewSlides"
      :key="'dot-' + index"
      @click="() => { if (isMounted) currentSlide = index }"
      class="dot"
      :class="{ active: currentSlide === index }"
    ></button>
  </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, nextTick, watchEffect } from 'vue'

const currentSlide = ref(0)
const loading = ref(false)
const error = ref(null)
const isMounted = ref(false)
const realReviews = ref([])
const totalReviews = ref(0)

const carouselStyle = computed(() => {
  if (!isMounted.value && process.server) {
    return { transform: 'translateX(0%)' }
  }
  return { transform: `translateX(-${currentSlide.value * 100}%)` }
})

const mockReviews = ref([
  {
    id: '1',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Please consider using this service.',
    rating: 5,
    reviewer: 'Sarah Johnson',
    timeAgo: '2 days ago'
  },
  {
    id: '2', 
    title: 'Best on the market',
    content: 'I love this product because the support is great. The quality exceeded expectations.',
    rating: 5,
    reviewer: 'Michael Chen',
    timeAgo: '2 days ago'
  },
  {
    id: '3',
    title: 'Best on the market', 
    content: 'I love this product because the support is great. Amazing customer service.',
    rating: 5,
    reviewer: 'Emma Wilson',
    timeAgo: '2 days ago'
  },
  {
    id: '4',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Exceptional experience.',
    rating: 5,
    reviewer: 'David Smith',
    timeAgo: '2 days ago'
  },
  {
    id: '5',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Highly recommend.',
    rating: 5,
    reviewer: 'Lisa Brown',
    timeAgo: '2 days ago'
  },
  {
    id: '6',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Outstanding quality.',
    rating: 5,
    reviewer: 'James Wilson',
    timeAgo: '2 days ago'
  },
  {
    id: '7',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Perfect for my needs.',
    rating: 5,
    reviewer: 'Anna Garcia',
    timeAgo: '2 days ago'
  },
  {
    id: '8',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Fantastic service.',
    rating: 5,
    reviewer: 'Robert Taylor',
    timeAgo: '2 days ago'
  },
  {
    id: '9',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Will buy again.',
    rating: 5,
    reviewer: 'Maria Rodriguez',
    timeAgo: '2 days ago'
  },
  {
    id: '10',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Top quality product.',
    rating: 5,
    reviewer: 'Thomas Anderson',
    timeAgo: '2 days ago'
  },
  {
    id: '11',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Exceeded my expectations.',
    rating: 5,
    reviewer: 'Jennifer Lee',
    timeAgo: '2 days ago'
  },
  {
    id: '12',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Simply amazing.',
    rating: 5,
    reviewer: 'Kevin White',
    timeAgo: '2 days ago'
  },
  {
    id: '13',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Great value for money.',
    rating: 5,
    reviewer: 'Michelle Davis',
    timeAgo: '2 days ago'
  },
  {
    id: '14',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Perfect solution.',
    rating: 5,
    reviewer: 'Christopher Miller',
    timeAgo: '2 days ago'
  },
  {
    id: '15',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Highly satisfied.',
    rating: 5,
    reviewer: 'Amanda Johnson',
    timeAgo: '2 days ago'
  },
  {
    id: '16',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Excellent choice.',
    rating: 5,
    reviewer: 'Daniel Wilson',
    timeAgo: '2 days ago'
  },
  {
    id: '17',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Outstanding support.',
    rating: 5,
    reviewer: 'Laura Martinez',
    timeAgo: '2 days ago'
  },
  {
    id: '18',
    title: 'Best on the market',
    content: 'I love this product because the support is great. Incredible product.',
    rating: 5,
    reviewer: 'Ryan Thompson',
    timeAgo: '2 days ago'
  }
])

const reviewSlides = computed(() => {
  const reviews = realReviews.value.length > 0 ? realReviews.value : mockReviews.value
  
  const slides = []
  const reviewsPerSlide = 6
  for (let i = 0; i < reviews.length; i += reviewsPerSlide) {
    slides.push(reviews.slice(i, i + reviewsPerSlide))
  }
  return slides
})

const startAutoPlay = () => {
  if (typeof window === 'undefined') return
  
  setInterval(() => {
    if (reviewSlides.value.length > 1) {
      currentSlide.value = (currentSlide.value + 1) % reviewSlides.value.length
    }
  }, 5000)
}

const loadRealReviews = async () => {
  try {
    loading.value = true
    console.log('Loading real Trustpilot reviews...')
    
    const response = await $fetch('/api/trustpilot/reviews')
    
    if (response.success && response.reviews.length > 0) {
      realReviews.value = response.reviews
      totalReviews.value = response.totalReviews
      console.log('Loaded real reviews:', response.reviews.length)
    } else {
      console.log('API returned no reviews, using fallback data')
      error.value = response.error || 'No reviews available'
    }
  } catch (err) {
    console.error('Failed to load Trustpilot reviews:', err)
    error.value = err.message || 'Failed to load reviews'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await nextTick()
  isMounted.value = true
  console.log('TrustpilotSection mounted:', isMounted.value)
  console.log('ReviewSlides length:', reviewSlides.value.length)
  
  await loadRealReviews()
  
  startAutoPlay()
})

watchEffect(() => {
  if (process.client && !isMounted.value) {
    setTimeout(() => {
      isMounted.value = true
      console.log('TrustpilotSection force mounted via watchEffect')
    }, 100)
  }
})
</script>

<style scoped>
.review-card {
  min-height: 180px;
  height: 180px;
  display: flex;
  flex-direction: column;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dot {
  transition: all 0.3s;
  border-radius: 9999px;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #a5a5a5; 
}

.dot.active {
  background-color: #CDCAC1; 
  width: 2rem;
  height: 0.5rem;
}
</style>
