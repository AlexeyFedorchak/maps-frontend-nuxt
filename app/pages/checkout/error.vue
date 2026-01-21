<script setup lang="ts">
import {useBasketStore} from "~/stores";

// Set page title
useHead({
  title: 'Payment Failed - Picture the Stars'
})

// Get basket store to potentially retry payment
const basketStore = useBasketStore()

// Get error details from query params if available
const route = useRoute()
const errorMessage = route.query.message as string || 'Payment could not be processed'
const errorCode = route.query.code as string || null

// Function to retry payment
const retryPayment = () => {
  navigateTo('/checkout')
}

// Function to contact support
const contactSupport = () => {
  // You can customize this to open email client or support chat
  window.open('mailto:support@picturethestars.com?subject=Payment Error&body=I encountered a payment error. Error code: ' + (errorCode || 'Unknown'), '_blank')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
          <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          Payment Failed
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ errorMessage }}
        </p>
        <p v-if="errorCode" class="mt-1 text-xs text-gray-500">
          Error Code: {{ errorCode }}
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-lg font-medium text-gray-900 mb-4">What can you do?</h3>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <svg class="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <strong>Check your payment details</strong> - Ensure your card information is correct and you have sufficient funds
            </div>
          </li>
          <li class="flex items-start">
            <svg class="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <strong>Try a different payment method</strong> - Use another card or payment option
            </div>
          </li>
          <li class="flex items-start">
            <svg class="h-4 w-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
            <div>
              <strong>Contact your bank</strong> - Your bank may have blocked the transaction for security reasons
            </div>
          </li>
        </ul>
      </div>

      <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-yellow-800">
              Your order is saved
            </h3>
            <div class="mt-2 text-sm text-yellow-700">
              <p>Don't worry - your items are still in your basket. You can try the payment again or contact our support team if you continue to experience issues.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
        <button
          @click="retryPayment"
          class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-center font-medium hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <NuxtLink
          to="/"
          class="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-center font-medium hover:bg-gray-300 transition-colors"
        >
          Continue Shopping
        </NuxtLink>
        <button
          @click="contactSupport"
          class="flex-1 bg-white text-blue-600 border border-blue-600 py-2 px-4 rounded-md font-medium hover:bg-blue-50 transition-colors"
        >
          Contact Support
        </button>
      </div>
    </div>
  </div>
</template>
