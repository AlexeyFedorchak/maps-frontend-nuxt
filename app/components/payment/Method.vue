<script setup lang="ts">
interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  mobileDescription: string;
  image: string;
}

interface Props {
  method: PaymentMethod;
  isMobile: boolean;
  isSelected?: boolean;
  isLoading?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <div
    class="flex items-center gap-3 border rounded-xl px-5 py-4 md:px-6 md:py-5 cursor-pointer hover:bg-[#F9F9F9] transition-all duration-200 ease-in-out"
    :class="[
      props.isLoading && 'opacity-50 cursor-not-allowed'
    ]"
  >
    <div class="flex-[1] md:flex-1 flex justify-between items-center">
      <div class="flex">
        <div
          class="h-4 w-4 border border-[#D9D9D9] rounded-full flex items-center justify-center"
        >
          <div
            v-if="props.isSelected"
            class="h-2 w-2 bg-[#070707] rounded-full"
          ></div>
        </div>
      </div>
      <div class="flex items-center justify-end">
        <NuxtImg
          :src="method.image"
          :alt="method.name"
          class="h-8 md:h-10 object-contain "
        />
      </div>
    </div>
    <div class="flex-[2] md:flex-1 flex flex-col items-start">
      <span class="font-medium text-sm md:text-base">{{ method.name }}</span>
      <span class="text-xs md:text-sm text-gray-500">{{
          isMobile ? method.mobileDescription : method.description
        }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
