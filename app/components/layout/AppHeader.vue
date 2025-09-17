<template>
  <header class="text-white px-4 py-3 w-full h-16 font-lato block fixed z-50 bg-[#25282D]">
    <div class="w-full">
      <div class="grid grid-cols-3 items-center">
        <div class="flex items-center justify-start flex-nowrap"
             :class="{ 'space-x-4': !showMenu }"
        >
          <button 
            @click="toggleMenu"
            class="w-6 hover:opacity-75 transition-opacity cursor-pointer"
            aria-label="Toggle menu"
          >
            <img v-show="!showMenu" src="/images/icons/burger.svg" alt="Burger menu" />
            <img v-show="showMenu" src="/images/icons/close.svg" alt="Close menu" />
          </button>

          <span v-show="showMenu" @click="toggleMenu" class="tracking-[1px] uppercase cursor-pointer">Close</span>

          <button v-show="!showMenu" class="hidden xl:flex items-center space-x-1 px-4 py-2 min-w-[180px] border-1 border-white rounded-[12px] text-white text-xs font-bold hover:opacity-75 transition leading-none whitespace-nowrap cursor-pointer">
            <img src="/images/icons/stars.svg" alt="Create Star Map" class="h-4" />
            <span class="tracking-[1px]">CREATE STAR MAP</span>
          </button>

          <div v-show="!showMenu" class="hidden xl:flex items-center space-x-2 whitespace-nowrap">
            <span class="text-sm">Excellent</span>
            <img src="/images/icons/5stars.svg" alt="Trustpilot Rating" class="h-4" />
            <span class="text-sm">4.8 out of 5</span>
            <img src="/images/icons/trustpilot-white.svg" alt="Trustpilot Logo" class="h-4" />
          </div>
        </div>

        <div class="flex items-center justify-center">
          <NuxtLink to="/" class="hover:opacity-75 transition-opacity">
            <img src="/images/logo.svg" alt="Picture the Stars Logo" class="h-8" />
          </NuxtLink>
        </div>

        <div class="flex items-center justify-end flex-nowrap space-x-1">
         
          <a href="tel:0161 528 9460" class="hidden xl:flex items-center space-x-2 shrink-0">
            <img src="/images/icons/phone.svg" alt="Phone" class="h-6" />
            <span class="text-sm">0161 528 9460</span>
          </a>

          <div class="hidden xl:flex items-center space-x-2 shrink-0">
            <img src="/images/icons/location.svg" alt="Location" class="h-6" />
            <span class="text-sm">1-2 FREE DAY SHIPPING</span>
          </div>

          <div class="hidden xl:flex items-center space-x-2 shrink-0">
            <img src="/images/icons/globe.svg" alt="Globe" class="h-6" />
            <span class="text-sm">UK (GBP)</span>
          </div>

          <div class="flex items-center shrink-0 cursor-pointer space-x-2">
            <img src="/images/icons/basket.svg" alt="Basket" class="h-6" />
            <span class="hidden xl:block text-sm">BASKET</span>
          </div>
          
        </div>
      </div>
    </div>

    <Transition name="slide">
      <div v-show="showMenu" class="fixed inset-0 z-40 mt-16 flex">
        <!-- transparent overlay -->
        <div
            class="flex-1 bg-black/30"
            @click="toggleMenu">
        </div>

        <!-- sidebar menu -->
        <div class="bg-[#25282D] w-[65vw] h-full p-6 shadow-2xl">
          <div class="flex justify-between items-center mb-8">

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