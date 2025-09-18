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

          <span v-show="showMenu" @click="toggleMenu" class="tracking-[1px] uppercase cursor-pointer hidden xl:block">Close</span>

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
        <div class="flex items-center bg-[#25282D] w-full h-full p-[24px] shadow-2xl overflow-y-auto">
          
          <img class="h-full hidden xl:block" src="/images/gift_1.png" alt="Unbox the Memories" />
          
          <div class="flex flex-col justify-between h-full w-full lg:mx-8 xl:mx-12">
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-8 md:space-y-16">
                <div>
                  <a href="#" class="block uppercase font-normal font-lato text-3xl tracking-[1.6px] mb-6 hover:underline underline-offset-4">
                    Star Map Design
                  </a>
                  <nav class="flex flex-col space-y-4 menu-links">
                    <a href="#" class="hover:underline underline-offset-4 text-3xl">Original</a>
                    <a href="#" class="flex items-center">
                      <span class="text-3xl hover:underline underline-offset-4">Mystic Night</span>
                      &nbsp;&nbsp;<span class="inline-block px-2 py-1 2xl uppercase tracking-[1px] text-black bg-[#E4E2DA]">Limited Edition</span>
                    </a>
                    <a href="#" class="hover:underline underline-offset-4 text-3xl">Real Photo</a>
                    <a href="#" class="hover:underline underline-offset-4 text-3xl">Starlight</a>
                    <a href="#" class="flex items-center">
                      <span class="text-3xl hover:underline underline-offset-4">Watercolour</span>
                      &nbsp;&nbsp;<span class="inline-block px-2 py-1 2xl uppercase tracking-[1px] text-black bg-[#D7D8D9]">New</span>
                    </a>

                  </nav>
                </div>

                <div>
                  <a href="#" class="block uppercase font-normal font-lato text-3xl tracking-[1.6px] mb-6 hover:underline underline-offset-4">
                    Jewellery
                  </a>
                  <nav class="flex flex-col space-y-4 menu-links">
                    <a href="#" class="hover:underline underline-offset-4 text-3xl">Star Map Jewellery</a>
                    <a href="#" class="hover:underline underline-offset-4 text-3xl">Location Map Jewellery</a>
                  </nav>
                </div>
              </div>

              <div>
                <nav class="flex flex-col space-y-6">
                  <a href="#" class="uppercase font-normal font-lato hover:underline underline-offset-4 text-3xl tracking-[1.6px]">
                    Deep Space
                  </a>
                  <a href="#" class="uppercase font-normal font-lato hover:underline underline-offset-4 text-3xl tracking-[1.6px]">
                    Location Map
                  </a>
                  <a href="#" class="uppercase font-normal font-lato hover:underline underline-offset-4 text-3xl tracking-[1.6px]">
                    FAQ
                  </a>
                  <a href="#" class="hover:underline underline-offset-4">
                    <span class="uppercase font-normal font-lato text-3xl tracking-[1.6px]">
                      The Science Behind
                    </span>
                    <span class="whitespace-nowrap text-2xl font-light">Star Maps</span>
                  </a>
                  <a href="#" class="hover:underline underline-offset-4">
                    <span class="uppercase font-normal font-lato text-3xl tracking-[1.6px]">
                      The Science Behind
                    </span>
                    <span class="whitespace-nowrap text-2xl font-light">Moon Maps</span>
                  </a>
                  <a href="#" class="uppercase font-normal font-lato hover:underline underline-offset-4 text-3xl tracking-[1.6px]">
                    How it Works
                  </a>
                  <a href="#" class="uppercase font-normal font-lato hover:underline underline-offset-4 text-3xl tracking-[1.6px]">
                    Spotlight blog
                  </a>
                  <a href="#" class="uppercase font-normal font-lato hover:underline underline-offset-4 text-3xl tracking-[1.6px]">
                    Contact
                  </a>
                </nav>
              </div>
            </div>
            <div class="w-full">
              <div class="w-full flex flex-col justify-center gap-4 mt-10 md:flex-row md:flex-nowrap md:justify-start xl:mt-0">
                <NuxtLink
                    to="/create"
                    class="w-full xl:max-w-[280px] flex items-center justify-center h-[60px] bg-white/95 text-gray-800 rounded-2xl font-lato font-extrabold text-[16px] md:text-[18px] tracking-[1px] leading-[1.25] uppercase backdrop-blur-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
                >
                  Create Star Map
                </NuxtLink>

                <NuxtLink
                    to="/create"
                    class="w-full xl:max-w-[280px] flex items-center justify-center h-[60px] bg-white/95 text-gray-800 rounded-2xl font-lato font-extrabold text-[16px] md:text-[18px] tracking-[1px] leading-[1.25] uppercase backdrop-blur-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
                >
                  Create Moon Map
                </NuxtLink>

                <NuxtLink
                    to="/create"
                    class="w-full xl:max-w-[280px] flex items-center justify-center h-[60px] bg-white/95 text-gray-800 rounded-2xl font-lato font-extrabold text-[16px] md:text-[18px] tracking-[1px] leading-[1.25] uppercase backdrop-blur-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.15)]"
                >
                  Create Location Map
                </NuxtLink>
              </div>

              <div class="flex xl:hidden items-center justify-center md:justify-start flex-nowrap space-x-6 mt-6">

                <a href="tel:0161 528 9460" class="flex items-center space-x-2 shrink-0">
                  <img src="/images/icons/phone.svg" alt="Phone" class="h-6" />
                  <span class="text-xl">0161 528 9460</span>
                </a>

                <div class="hidden md:flex items-center space-x-2 shrink-0">
                  <img src="/images/icons/location.svg" alt="Location" class="h-6" />
                  <span class="text-xl">1-2 FREE DAY SHIPPING</span>
                </div>

                <div class="flex items-center space-x-2 shrink-0">
                  <img src="/images/icons/globe.svg" alt="Globe" class="h-6" />
                  <span class="text-xl">UK (GBP)</span>
                </div>

              </div>

              <div class="flex mt-6 p-3 justify-center items-center md:hidden w-[100vw] ml-[-24px] bg-[#CDCAC1]">

                <div class="flex items-center space-x-2 shrink-0">
                  <img src="/images/icons/location-black.svg" alt="Location" class="h-6" />
                  <span class="text-xl text-black">1-2 FREE DAY SHIPPING</span>
                </div>

              </div>
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

watch(showMenu, (value) => {
  if (value) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
});

onUnmounted(() => {
  document.body.classList.remove("overflow-hidden");
});

const router = useRouter()
router.afterEach(() => {
  showMenu.value = false
})
</script>

<style scoped>
.menu-links {
  color: #d3d4d5;
}
</style>