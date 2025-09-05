<template>
    <section class="relative min-h-screen flex items-end justify-center overflow-hidden font-lato">
      <div class="absolute inset-0 z-[1]">
        <img 
          src="/images/hero-background.png" 
          alt="Hero Background" 
          class="w-full h-full object-cover object-center min-h-screen"
        />
        <div class="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div class="relative z-[2] w-full text-center text-white pb-[5vh]">
        <div class="max-w-[1200px] mx-auto px-5">
          <div class="max-w-[800px] mx-auto">

            <NuxtLink 
              to="/create" 
              class="inline-flex items-center justify-center w-[424px] h-[70px] bg-white/95 text-gray-800 rounded-2xl font-lato font-extrabold text-[20px] tracking-[2.4px] leading-[1.25] uppercase transition-all duration-300 backdrop-blur-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.15)] mb-3 hover:bg-white hover:shadow-[0_3px_15px_rgba(0,0,0,0.25)] hover:-translate-y-0.5"
            >
              CREATE YOUR STAR MAP >
            </NuxtLink>
  
            <div class="flex items-center justify-center gap-1 mb-[14px] text-white">
              <img src="/images/Frame 89.png" alt="Trustpilot Rating" class="h-[14px] w-auto" />
              <span class="font-lato font-medium text-[20px]">Excellent</span>
              <span class="font-lato font-medium text-[20px]">4.8 out of 5</span>
              <img src="/images/Vector.png" alt="Trustpilot Rating" class="h-[14px] w-auto" />
              <span class="font-lato font-medium text-[20px]">Trustpilot</span>
            </div>
  
            <h1 class="font-lato font-extrabold text-[28px] text-black tracking-[2.4px] leading-[1.35] mb-3 whitespace-nowrap overflow-visible max-w-none">
              CAPTURE YOUR MOMENT IN THE STARS
            </h1>
            
            <div class="max-w-[600px] mx-auto">
              <p class="font-lato font-medium text-[20px] text-black/90 leading-[1.4]">
                Start with a time and place that means everything. Picture the stars<br>
                at that exact moment. The perfect personalised star gift.
              </p>
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
  