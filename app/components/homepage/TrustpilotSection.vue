<template>
  <section class="bg-white py-20">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="font-lato font-extrabold text-3xl md:text-4xl text-gray-900 mb-4 tracking-wide">
          WHY 50,000+ PEOPLE CAPTURED THEIR STORIES FOREVER.
        </h2>
        <p class="font-lato font-medium text-lg text-gray-600">
          Real moments. Real memories. Rated Excellent on Trustpilot.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div class="lg:col-span-1">
          <div class="border border-gray-200 p-4 bg-white min-h-[180px] flex flex-col justify-start pt-2">
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
                  Based on <span class="font-bold underline">{{ mockReviews.length }} reviews</span>
                </p>
              </div>

              <div class="flex items-center justify-center">
                <img src="/images/Vector.png" alt="Star" class="w-5 h-5 mr-2" />
                <span class="font-lato font-semibold text-gray-900">Trustpilot</span>
              </div>
            </div>
          </div>
        </div>


        <div class="lg:col-span-3">
          <div class="relative overflow-hidden">
            <div 
              class="flex transition-transform duration-500 ease-in-out"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div 
                v-for="(slide, slideIndex) in reviewSlides" 
                :key="slideIndex"
                class="w-full flex-shrink-0"
              >
                <div class="grid grid-cols-3 gap-4 min-h-[180px]">
                  <div 
                    v-for="(review, reviewIndex) in slide" 
                    :key="review.id"
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

      <div class="flex justify-center gap-2 mt-16">
        <button
          v-for="(slide, index) in reviewSlides"
          :key="'dot-' + index"
          @click="currentSlide = index"
          class="transition-all duration-300 rounded-full"
          :class="currentSlide === index 
            ? 'w-8 h-2 bg-gray-400' 
            : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'"
        ></button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const currentSlide = ref(0)
const loading = ref(false)
const error = ref(null)

// Mock reviews data (since Trustpilot business key is not available)
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
  const slides = []
  for (let i = 0; i < mockReviews.value.length; i += 3) {
    slides.push(mockReviews.value.slice(i, i + 3))
  }
  return slides
})

const startAutoPlay = () => {
  setInterval(() => {
    if (reviewSlides.value.length > 1) {
      currentSlide.value = (currentSlide.value + 1) % reviewSlides.value.length
    }
  }, 5000) // Change slide every 5 seconds
}

// When business key becomes available, uncomment this function:
/*
const fetchTrustpilotReviews = async () => {
  try {
    loading.value = true
    
    // Call our API endpoint that handles Trustpilot OAuth
    const response = await $fetch('/api/trustpilot/reviews')
    
    if (response.success) {
      mockReviews.value = response.reviews
      console.log('Loaded', response.totalReviews, 'reviews from Trustpilot')
    } else {
      console.warn('API returned fallback data:', response.error)
    }
    
    error.value = null
  } catch (err) {
    console.error('Error fetching reviews:', err)
    error.value = 'Failed to load reviews'
  } finally {
    loading.value = false
  }
}
*/

// Lifecycle
onMounted(() => {
  // fetchTrustpilotReviews() // Uncomment when business key is available
  startAutoPlay()
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
</style>
