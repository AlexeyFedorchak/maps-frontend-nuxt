<template>
  <section 
    class="relative py-3 bg-cover bg-center bg-no-repeat"
    style="background-image: url('/images/chocolate.png')"
  >
    <div class="absolute inset-0 bg-black bg-opacity-20"></div>
    
    <div class="relative max-w-7xl mx-auto px-6">
      <div class="flex items-center justify-center gap-8">
        <div class="flex items-center gap-6">
          <h3 class="font-lato font-black text-[20px] leading-[38px] tracking-[0px] text-black">
            10% OFF Join the Free Newsletter
          </h3>
          <p class="font-lato text-black text-sm whitespace-nowrap">
            Sign up and receive 10% off your first order
          </p>
        </div>
        <div class="flex items-center rounded-full w-80 h-10 bg-white border border-gray-300">
  <input
    v-model="email"
    type="email"
    placeholder="ENTER EMAIL ADDRESS"
    class="flex-1 h-full px-3 text-sm text-gray-700 placeholder-gray-500 focus:outline-none bg-transparent"
  />
  <button
    @click="handleSubmit"
    class="h-full px-3 bg-[#A5A5A5] hover:bg-[#8f8f8f] text-black font-lato font-semibold transition-colors duration-300 whitespace-nowrap text-[11px] border-l border-gray-300 rounded-full"
  >
    GET MY 10% CODE
  </button>
</div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')

const handleSubmit = () => {
  if (!email.value) {
    alert('Please enter your email address')
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    alert('Please enter a valid email address')
    return
  }
  
  console.log('Newsletter signup:', email.value)
  alert('Thank you for subscribing! Check your email for the 10% discount code.')
  
  email.value = ''
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    handleSubmit()
  }
}
</script>

<style scoped>
section {
  min-height: 50px;
}

</style>
