<template>
    <section class="relative min-h-screen flex items-center md:items-end justify-center overflow-hidden font-lato">
      <div class="absolute inset-0 z-[1]">
        <img 
          src="/images/hero-background.png" 
          alt="Hero Background" 
          class="w-full h-full object-cover object-center min-h-screen md:mt-16"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
      </div>
      
      <div class="relative z-[2] w-full text-center text-white px-4 md:px-0 pt-[70vh] md:pt-0">
        <div class="max-w-[1200px] mx-auto px-5">
          <div class="max-w-[800px] mx-auto">

            <NuxtLink 
            to="/create" 
            class="inline-flex items-center justify-center w-full max-w-[424px] h-[70px] bg-white/95 text-gray-800 rounded-2xl font-lato font-extrabold text-[16px] md:text-[20px] tracking-[1.6px] md:tracking-[2.4px] leading-[1.25] uppercase backdrop-blur-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.15)] mb-3 mx-auto"
            >
            CREATE YOUR STAR MAP >
            </NuxtLink>
  
            <div class="flex items-center justify-center space-x-2 mb-[14px] text-white text-center flex-wrap">
              <img src="/images/icons/5stars.svg" alt="Trustpilot Rating" class="h-[14px] w-auto" />
              <span class="font-lato font-medium text-[16px] text-black md:text-[20px]">Excellent 4.8 out of 5</span>
              <img src="/images/icons/trustpilot.svg" alt="Trustpilot Logo" class="h-[20px] w-auto" />
            </div>
  
            <h1 class="font-lato font-extrabold text-[24px] md:text-[28px] text-black tracking-[1.8px] md:tracking-[2.4px] leading-[1.35] mb-3 px-4 md:px-0 text-center">
              CAPTURE YOUR MOMENT IN THE STARS
            </h1>
            
            <div class="max-w-[600px] mx-auto px-2 pb-[3vh] md:px-0">
              <p class="font-lato font-medium text-[16px] md:text-[20px] text-black/90 leading-[1.4] text-center">
                <span class="block md:hidden">
                  <span class="whitespace-nowrap">Start with a time and place that means everything.</span><br>
                  Picture the stars at that exact moment.
                </span>
                <span class="hidden md:block">
                  Start with a time and place that means everything. Picture the stars<br>
                  at that exact moment. The perfect personalised star gift.
                </span>
              </p>
            </div>

            <div class="flex justify-center w-full pb-[2vh]">
              <hr class="border-[#D9D9D9] w-[254px]" />
            </div>

          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  useHead({
    link: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect', 
        href: 'https://fonts.gstatic.com',
        crossorigin: ''
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700;800;900&display=swap'
      }
    ]
  })
  </script>
  