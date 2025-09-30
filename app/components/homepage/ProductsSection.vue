<template>
  <section class="bg-gray-50 py-8">
    <div class="max-w-[1600px] mx-40">

      <div class="mb-10 overflow-x-auto scrollbar-hide">
        <div class="flex gap-2 px-4 justify-center min-w-max min-h-11">
          <button
            v-for="(tab, index) in tabs"
            :key="index"
            @click="activeTab = index"
            class="px-4 py-2 rounded-full font-lato font-semibold text-[14px] leading-[0.22px] tracking-[0.7px] uppercase tracking-wider transition-colors duration-300 whitespace-nowrap flex-shrink-0"
            :class="activeTab === index 
              ? 'bg-[#CDCAC1] text-black-800' 
              : 'bg-white text-gray-700'"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <div class="product-section">
        <div :class="activeTab === 'bestsellers' ? 'block' : 'hidden'">
        <HomepageProductSlider :products="bestsellersProduct"/>
        </div>
        <div :class="activeTab === 'star_map' ? 'block' : 'hidden'">
          <HomepageProductSlider 
            :products="starMapProducts"
            titleClass="font-lato font-extrabold text-[16px] leading-[120%] tracking-[1.2px] uppercase mb-1"
            priceClass="font-lato font-bold text-[16px] leading-auto tracking-[0.9px] text-[#25282D] mb-1"
            shippingClass="font-roboto font-normal text-[16px] leading-[16.5px] tracking-[0px] text-[#a5a5a5] mb-1"
            descriptionClass="font-lato font-normal leading-[125%] tracking-[0px] text-[#787878] text-[14px]"
            itemBasisClass="md:basis-1/2 lg:basis-1/5"
          />
        </div>
        <div :class="activeTab === 'custom_jewellery' ? 'block' : 'hidden'">
          <HomepageProductSlider 
            :products="customJewelleryProducts"
            titleClass="font-lato font-extrabold text-[16px] leading-[120%] tracking-[1.2px] uppercase mb-1"
            priceClass="font-lato font-bold text-[16px] leading-auto tracking-[0.9px] text-[#25282D] mb-1"
            shippingClass="font-roboto font-normal text-[16px] leading-[16.5px] tracking-[0px] text-[#a5a5a5] mb-1"
            descriptionClass="font-lato font-normal leading-[125%] tracking-[0px] text-[#787878] text-[14px]"
            itemBasisClass="md:basis-1/2 lg:basis-1/5"
          />
        </div>
        <div :class="activeTab === 'moon_map' ? 'block' : 'hidden'">
          <HomepageProductSlider 
            :products="moonMapProducts"
            titleClass="font-lato font-extrabold text-[18px] leading-[120%] tracking-[1.2px] uppercase mb-1 mt-2"
            priceClass="font-lato font-bold text-[16px] leading-auto tracking-[1.2px] text-[#25282D] mb-1"
            shippingClass="font-roboto font-normal text-[16px] leading-[22px] tracking-[0px] text-[#a5a5a5] mb-1"
            descriptionClass="font-lato font-normal leading-[125%] tracking-[0px] text-[#787878] text-[16px]"
            itemBasisClass="md:basis-1/1 lg:basis-1/3"
          />
        </div>
        <div :class="activeTab === 'location_map' ? 'block' : 'hidden'" class="min-h-[600px] w-full bg-transparent">
         
        </div>
        <div :class="activeTab === 'deep_space' ? 'block' : 'hidden'">
          <HomepageProductSlider :products="deepSpaceProducts"
          titleClass="font-lato font-extrabold text-[14px] leading-[120%] tracking-[1.6px] uppercase mb-1 mt-2"
          priceClass="font-lato font-bold text-[14px] leading-auto tracking-[1.2px] mb-1"
          shippingClass="font-lato font-bold text-[14px] leading-[auto] tracking-[1.2px] text-[#787878] mb-1"
          itemBasisClass="md:basis-1/2 lg:basis-1/6"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

const activeTab = ref('bestsellers')

const tabs = {
  'bestsellers': 'Bestsellers',
  'star_map': 'Star Map',
  'custom_jewellery': 'Custom Jewellery',
  'moon_map': 'MOON MAP',
  'location_map': 'LOCATION MAP',
  'deep_space': 'DEEP SPACE'
}

const bestsellersProduct = ref([
  {id: 1, name: 'original star map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
  {id: 2, name: 'mystic night star', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
  {id: 3, name: 'starlight star map', price: 'FROM £ 39.99', freeShipping: 'Free Shipping',description:'Choose the location, date & time and picture the stars at that exact moment'},
  {id: 4, name: 'original moon map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
  {id: 5, name: 'original star map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
  {id: 6, name: 'mystic night star', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
  {id: 7, name: 'starlight star map', price: 'FROM £ 39.99', freeShipping: 'Free Shipping',description:'Choose the location, date & time and picture the stars at that exact moment'},
  {id: 8, name: 'original moon map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
  {id: 9, name: 'original star map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
  {id: 10, name: 'mystic night star', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
  {id: 11, name: 'starlight star map', price: 'FROM £ 39.99', freeShipping: 'Free Shipping',description:'Choose the location, date & time and picture the stars at that exact moment'},
  {id: 12, name: 'original moon map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'}
])

const starMapProducts = ref([
{id: 1, name: 'original star map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
{id: 2, name: 'mystic night star map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
{id: 3, name: 'real photo star map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
{id: 4, name: 'starlight star map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
{id: 5, name: 'watercolour star map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
])

const customJewelleryProducts = ref([
{id: 1, name: 'stainless steel star map', price: 'FROM £ 39.99', freeShipping: 'Free Shipping & Gift Box', description: 'Custom made engraved Star Map Necklace.\nCreated using your chosen location, date & time.'},
{id: 2, name: 'black steel star map', price: 'FROM £ 49.99', freeShipping: 'Free Shipping & Gift Box', description: 'Custom made engraved Star Map Necklace.\nCreated using your chosen location, date & time.'},
{id: 3, name: '9ct solid gold star map', price: 'FROM £ 149.99', freeShipping: 'Free Shipping & Gift Box', description: 'Custom made engraved Star Map Necklace.\nCreated using your chosen location, date & time.'},
{id: 4, name: '925 sterling silver star map', price: 'FROM £ 49.99', freeShipping: 'Free Shipping & Gift Box', description: 'Custom made engraved Star Map Necklace.\nCreated using your chosen location, date & time.'},
{id: 5, name: '9ct solid gold star map', price: 'FROM £ 149.99', freeShipping: 'Free Shipping & Gift Box', description: 'Custom made engraved Star Map Necklace.\nCreated using your chosen location, date & time.'}
])

const moonMapProducts = ref([
{id: 1, name: 'original moon map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
{id: 2, name: 'original moon map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
{id: 3, name: 'original moon map', price: 'FROM £ 21.99', freeShipping: 'Free Shipping', description: 'Choose the location, date & time and picture the stars at that exact moment'},
])

const deepSpaceProducts = ref([
  {id: 1, name: 'tarantula nebula', price: 'FROM £ 19.99', freeShipping: 'Free Shipping', image: '/images/picture_1.png'},
  {id: 2, name: 'tarantula nebula', price: 'FROM £ 19.99', freeShipping: 'Free Shipping', image: '/images/picture_2.png'},
  {id: 3, name: 'tarantula nebula', price: 'FROM £ 19.99', freeShipping: 'Free Shipping', image: '/images/picture_3.png'},
  {id: 4, name: 'tarantula nebula', price: 'FROM £ 19.99', freeShipping: 'Free Shipping', image: '/images/picture_4.png'},
  {id: 5, name: 'tarantula nebula', price: 'FROM £ 19.99', freeShipping: 'Free Shipping', image: '/images/picture_5.png'},
  {id: 6, name: 'tarantula nebula', price: 'FROM £ 19.99', freeShipping: 'Free Shipping', image: '/images/picture_6.png'}
])
</script>