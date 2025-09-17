<template>
  <header class="bg-gray-900 text-white px-4 py-3 w-full h-16 font-lato hidden md:block fixed z-50">
    <div class="w-full">
      <div class="grid grid-cols-3 items-center">
        <div class="flex items-center justify-start flex-nowrap">
          <button 
            @click="toggleMenu"
            class="flex flex-col justify-center items-center w-6 h-6 space-y-1.5 hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Toggle menu"
          >
            <span class="block w-5 h-0.5 bg-white rounded-full"></span>
            <span class="block w-5 h-0.5 bg-white rounded-full"></span>
            <span class="block w-5 h-0.5 bg-white rounded-full"></span>
          </button>

          <button class="flex items-center space-x-1 px-4 py-2 min-w-[180px] ml-4 border-1 border-white rounded-[12px] text-white text-xs font-bold hover:opacity-75 transition leading-none whitespace-nowrap cursor-pointer">
            <img src="/images/icons/stars.svg" alt="Create Star Map" class="h-4" />
            <span class="tracking-[1px]">CREATE STAR MAP</span>
          </button>

          <div class="hidden md:flex items-center space-x-2 scale-75 whitespace-nowrap">
            <span class="text-lg">Excellent</span>
            <img src="/images/icons/5stars.svg" alt="Trustpilot Rating" class="h-6" />
            <span class="text-lg">4.8 out of 5</span>
            <img src="/images/icons/trustpilot-white.svg" alt="Trustpilot Logo" class="h-6" />
          </div>
        </div>

        <div class="flex items-center justify-center">
          <NuxtLink to="/" class="hover:opacity-75 transition-opacity">
            <img src="/images/logo.svg" alt="Picture the Stars Logo" class="h-8" />
          </NuxtLink>
        </div>

        <div class="flex items-center justify-end flex-nowrap space-x-4 mr-8">
         
          <a href="tel:0161 528 9460" class="flex items-center whitespace-nowrap">
            <img src="/images/icons/phone.svg" alt="Phone" class="h-4 px-2" />
            <span class="text-sm">0161 528 9460</span>
          </a>

          <div class="flex items-center whitespace-nowrap">
            <img src="/images/icons/location.svg" alt="Location" class="h-4 px-2" />
            <span class="text-sm">1-2 FREE DAY SHIPPING</span>
          </div>

          <div class="flex flex-row items-center whitespace-nowrap">
            <img src="/images/icons/globe.svg" alt="Globe" class="h-4 px-2" />
            <span class="text-sm">UK (GBP)</span>
          </div>

          <div class="flex items-center whitespace-nowrap cursor-pointer">
            <img src="/images/icons/basket.svg" alt="Basket" class="h-4 px-2" />
            <span class="text-sm">BASKET</span>
          </div>
          
        </div>
      </div>
    </div>

    <Transition name="slide">
      <div v-show="showMenu" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="showMenu = false">
        <div class="bg-gray-900 w-80 h-full p-6 shadow-2xl">
          <div class="flex justify-between items-center mb-8">
            <div class="flex items-center space-x-2">
              <img src="/images/logo.svg" alt="Logo" class="h-6" />
            </div>
            <button @click="showMenu = false" class="text-3xl hover:text-red-400 transition-colors">&times;</button>
          </div>
  
          <div class="mt-8 space-y-4 pt-6 border-t border-gray-700">
            <div class="flex items-center space-x-2 text-sm">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              <span>0161 528 9460</span>
            </div>
            <div class="flex items-center space-x-2 text-sm text-green-400">
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7L12 2z"/>
              </svg>
              <span>FREE SHIPPING</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
const showMenu = ref(false)
const showCurrency = ref(false)
const cartCount = ref(0)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const toggleCurrency = () => {
  showCurrency.value = !showCurrency.value
}

onMounted(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest('.relative')) {
      showCurrency.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})

const router = useRouter()
router.afterEach(() => {
  showMenu.value = false
})
</script>

<style scoped>

</style>