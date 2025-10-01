<script setup lang="ts">
import {useBasketStore} from "~/stores";
// Set page title
useHead({
  title: 'Payment Successful - Picture the Stars'
})

// Clear basket after successful payment
const basketStore = useBasketStore()

onMounted(() => {
  // Clear basket on successful payment
  basketStore.clearBasket();
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Payment Successful!
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          Thank you for your order. You will receive a confirmation email shortly.
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">What's Next?</h3>
        <ul class="space-y-2 text-sm text-gray-600">
          <li class="flex items-center">
            <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Order confirmation email sent
          </li>
          <li class="flex items-center">
            <svg class="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Processing your custom star map
          </li>
          <li class="flex items-center">
            <svg class="h-4 w-4 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Shipping within 3-5 business days
          </li>
        </ul>
      </div>

      <div class="flex space-x-4">
        <NuxtLink
          to="/"
          class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-center font-medium hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </NuxtLink>
        <button
          @click="window.print()"
          class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md font-medium hover:bg-gray-300 transition-colors"
        >
          Print Receipt
        </button>
      </div>
    </div>
  </div>
</template>
