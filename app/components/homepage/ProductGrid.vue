<template>
    <div class="w-ful max-h-[1600px]">
      <div class="flex gap-4">
        <div 
          v-for="(product, index) in products" 
          :key="product.id || index"
          class="flex-1"
        >
          <div class="p-1">
            <div>
              <img 
                :src="product.image || '/images/Component 28.png'" 
                :alt="product.name || `Product ${index + 1}`"
                class="w-full h-full object-cover transition-transform mx-auto"
              />
            </div>
          </div>
          
          <div :class="titleClass">
            {{ product.name }}
          </div>
          
          <div :class="priceClass">
            {{ product.price }}
            <span v-if="product.freeShipping" :class="shippingClass">
              {{ product.freeShipping }}
            </span>
          </div>
          
          <div v-if="product.description" :class="descriptionClass" class="whitespace-pre-line">
            {{ product.description }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  interface Product {
    id?: string | number
    name?: string
    price?: string
    image?: string
    description?: string
    freeShipping?: string
    [key: string]: any
  }
  
  interface Props {
    products?: Product[]
    titleClass?: string
    priceClass?: string
    shippingClass?: string
    descriptionClass?: string
  }
  
  const props = withDefaults(defineProps<Props>(), {
    products: () => [],
    titleClass: 'font-lato font-extrabold text-[18px] leading-[120%] tracking-[1.6px] uppercase',
    priceClass: 'font-lato font-bold text-[16px] leading-auto tracking-[1.2px] text-[#25282D]',
    shippingClass: 'font-roboto font-normal text-[16px] leading-[22px] tracking-[0px] text-[#a5a5a5]',
    descriptionClass: 'font-lato font-normal text-[16px] leading-[125%] tracking-[0px] text-[#787878]'
  })
  </script>