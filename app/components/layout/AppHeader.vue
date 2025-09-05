<template>
  <header class="bg-gray-900 text-white px-4 py-3 font-lato">
    <div class="w-full">
      <div class="grid grid-cols-3 items-center">
        <div class="flex flex-row items-center space-x-4 justify-start flex-nowrap">
          <button 
            @click="toggleMenu"
            class="flex flex-col justify-center items-center w-6 h-6 space-y-1.5 hover:opacity-75 transition-opacity mr-8"
            aria-label="Toggle menu"
          >
            <span class="block w-5 h-0.5 bg-white rounded-full"></span>
            <span class="block w-5 h-0.5 bg-white rounded-full"></span>
            <span class="block w-5 h-0.5 bg-white rounded-full"></span>
          </button>

          <button class="flex flex-row items-center space-x-1 px-8 h-10 border-2 border-white rounded-lg text-white text-xs font-bold hover:opacity-75 transition leading-none whitespace-nowrap mr-8">
          <img src="/images/Frame 69.png" alt="Create Star Map" class="h-4" />
          <span>CREATE STAR MAP</span>
          </button>

          <div class="hidden md:flex flex-row items-center space-x-2 scale-75 whitespace-nowrap">
            <span class="text-lg">Excellent</span>
            <img src="/images/Frame 89.png" alt="Trustpilot Rating" class="h-6" />
            <span class="text-lg">4.9 out of 5</span>
            <img src="/images/Vector.png" alt="Trustpilot Rating" class="h-6" />
            <span class="text-lg">Trustpilot</span>
          </div>
        </div>

        <div class="flex justify-center">
          <NuxtLink to="/" class="hover:opacity-75 transition-opacity">
            <img src="/images/PNG LOGO (4) 1.png" alt="PicturetheStars Logo" class="h-8" />
          </NuxtLink>
        </div>

        <div class="flex flex-row items-center space-x-4 justify-end flex-nowrap">
         
          <div class="flex flex-row items-center whitespace-nowrap ml-8">
            <img src="/images/Vector (1).png" class="h-4 px-2" />
            <span class="text-sm">0161 528 9460</span>
          </div>

          <div class="flex flex-row items-center whitespace-nowrap ml-8">
            <img src="/images/Ebene 1.png" class="h-6 px-1 -mt-1" />
            <span class="text-sm">1-2 FREE DAY SHIPPING</span>
          </div>

          <div class="flex flex-row items-center whitespace-nowrap ml-8">
            <img src="/images/Vector (2).png" class="h-4 px-2" />
            <span class="text-sm">UK (GBP)</span>
          </div>

          <div class="flex flex-row items-center whitespace-nowrap mr-8">
            <img src="/images/Button.png" class="h-4 px-2" />
            <span class="text-sm">BUSKET</span>
          </div>
          
        </div>
      </div>
    </div>

    <Transition name="slide">
      <div v-show="showMenu" class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="showMenu = false">
        <div class="bg-gray-900 w-80 h-full p-6 shadow-2xl">
          <div class="flex justify-between items-center mb-8">
            <div class="flex items-center space-x-2">
              <img src="/images/PNG LOGO (4) 1.png" alt="Logo" class="h-6" />
              <span class="text-lg font-light">Menu</span>
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>