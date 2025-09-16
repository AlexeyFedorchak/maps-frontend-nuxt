<template>   
  <section      
    class="relative py-3 bg-cover bg-center bg-no-repeat newsletter-section"     
    style="background-image: url('/images/chocolate.png')"   
  >          
    <div class="hidden md:block relative max-w-7xl mx-auto px-6">       
      <div class="flex items-center justify-center gap-8">         
        <div class="flex items-center gap-6">           
          <h3 class="font-lato font-black text-[20px] leading-[38px] tracking-[0px] text-black">             
            10% OFF Join the Free Newsletter           
          </h3>           
          <p class="font-lato text-black text-sm whitespace-nowrap">             
            Sign up and receive 10% off your first order           
          </p>         
        </div>         
        
        <div class="input-container">
          <input             
            v-model="email"             
            type="email"             
            placeholder="ENTER EMAIL ADDRESS"             
            class="email-input"
            @keypress="handleKeyPress"           
          />           
          <button             
            @click="handleSubmit"             
            class="submit-button"           
          >             
            GET MY 10% CODE           
          </button>         
        </div>       
      </div>     
    </div>
    
    <div class="block md:hidden relative max-w-sm mx-auto px-6 py-8">
      <div class="flex flex-col space-y-6">
        <div class="text-center">
          <h3 class="font-lato font-black text-xl leading-tight tracking-[0px] text-black mb-3">
            10% OFF Join the Free Newsletter
          </h3>
          <p class="font-lato text-black text-sm">
            Sign up and receive 10% off your first order
          </p>
        </div>
        
        <div class="w-full">
          <input
            v-model="email"
            type="email"
            placeholder="ENTER EMAIL ADDRESS"
            class="w-full h-12 px-4 bg-white border-2 border-gray-200 rounded-full text-sm text-gray-600 placeholder-gray-400 outline-none focus:border-gray-300 transition-colors"
            @keypress="handleKeyPress"
          />
        </div>
        
        <div class="w-full">
          <button
            @click="handleSubmit"
            class="w-full h-12 bg-gray-100 hover:bg-gray-200 text-black font-lato font-bold text-sm rounded-full transition-colors duration-300 border-2 border-gray-200"
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
.newsletter-section {   
  min-height: 50px; 
}  

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 400px;
  height: 50px;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 25px;
  overflow: hidden;
}

.email-input {
  flex: 1;
  height: 100%;
  padding: 0 20px;
  padding-right: 180px;
  font-size: 14px;
  color: #9ca3af;
  background: transparent;
  border: none;
  outline: none;
}

.email-input::placeholder {
  color: #9ca3af;
  font-weight: 500;
}

.submit-button {
  position: absolute;
  right: 2px;
  top: 1px;
  height: 48px;
  padding: 0 26px;
  background-color: #f8f9fa;
  color: #1f2937;
  font-family: 'Lato', sans-serif;
  font-weight: 700;
  font-size: 12px;
  border: none;
  border-radius: 24px;
  white-space: nowrap;
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
  background-color: #f1f3f4;
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}
</style>