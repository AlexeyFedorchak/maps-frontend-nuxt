<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import {
  loadStripe,
  type Stripe,
  type StripeElements,
  type StripeCardNumberElement,
  type StripeCardExpiryElement,
  type StripeCardCvcElement,
} from '@stripe/stripe-js';
import type { CheckoutFormContext } from '@/types/checkout';

interface Props {
  form?: CheckoutFormContext;
}
defineProps<Props>();

// --- State for errors ---
const cardNumberError = ref<string | null>(null);
const cardExpiryError = ref<string | null>(null);
const cardCvcError = ref<string | null>(null);
const generalError = ref<string | null>(null); // For setup issues

// --- Template refs for mounting Stripe Elements ---
const cardNumberElement = ref<HTMLDivElement | null>(null);
const cardExpiryElement = ref<HTMLDivElement | null>(null);
const cardCvcElement = ref<HTMLDivElement | null>(null);

// --- Stripe variables ---
let stripe: Stripe | null = null;
let elements: StripeElements | null = null;
let cardNumber: StripeCardNumberElement | null = null;
let cardExpiry: StripeCardExpiryElement | null = null;
let cardCvc: StripeCardCvcElement | null = null;

// --- Stripe initialization ---
const config = useRuntimeConfig();
const stripePublishableKey = config.public.stripePublishableKey as string;

onMounted(async () => {
  if (!stripePublishableKey) {
    console.error('Stripe publishable key is not set in nuxt.config.ts.');
    generalError.value = 'Payment system is currently unavailable.';
    return;
  }

  stripe = await loadStripe(stripePublishableKey);
  if (!stripe) {
    generalError.value = 'Could not connect to the payment system.';
    return;
  }

  elements = stripe.elements();

  // Common styling for Stripe Elements (content inside the iframe)
  const elementStyles = {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  };

  // --- Create and mount each element, attaching an error listener ---
  if (cardNumberElement.value) {
    cardNumber = elements.create('cardNumber', { style: elementStyles });
    cardNumber.mount(cardNumberElement.value);
    cardNumber.on('change', event => {
      cardNumberError.value = event.error ? event.error.message : null;
    });
  }

  if (cardExpiryElement.value) {
    cardExpiry = elements.create('cardExpiry', { style: elementStyles });
    cardExpiry.mount(cardExpiryElement.value);
    cardExpiry.on('change', event => {
      cardExpiryError.value = event.error ? event.error.message : null;
    });
  }

  if (cardCvcElement.value) {
    cardCvc = elements.create('cardCvc', { style: elementStyles });
    cardCvc.mount(cardCvcElement.value);
    cardCvc.on('change', event => {
      cardCvcError.value = event.error ? event.error.message : null;
    });
  }
});

// --- Cleanup: Destroy Stripe Elements to avoid memory leaks ---
onBeforeUnmount(() => {
  if (cardNumber) cardNumber.destroy();
  if (cardExpiry) cardExpiry.destroy();
  if (cardCvc) cardCvc.destroy();
});

// --- Expose methods for the parent component to call ---
async function createPaymentMethod() {
  if (!stripe || !cardNumber) {
    throw new Error('Stripe is not initialized or card element is missing.');
  }
  // Clear previous errors before attempting to create a payment method
  cardNumberError.value = null;
  cardExpiryError.value = null;
  cardCvcError.value = null;

  const { error, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardNumber,
  });

  if (error) {
    // Stripe's top-level error often refers to the card number
    cardNumberError.value = error.message ?? 'An unknown error occurred.';
    throw error;
  }
  return paymentMethod;
}

async function confirmCardPayment(clientSecret: string) {
  if (!stripe || !cardNumber) {
    throw new Error('Stripe is not initialized or card element is missing.');
  }

  // Clear previous errors
  cardNumberError.value = null;
  cardExpiryError.value = null;
  cardCvcError.value = null;

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardNumber,
    }
  });

  if (error) {
    cardNumberError.value = error.message ?? 'Payment failed.';
    throw error;
  }

  return paymentIntent;
}

defineExpose({ createPaymentMethod, confirmCardPayment });
</script>

<template>
  <div class="space-y-4 md:space-y-2.5 md:w-1/2">
    <div>
      <label for="card-number-element" class="block text-sm font-medium text-gray-700 mb-1">
        Card Number
      </label>
      <div
        id="card-number-element"
        ref="cardNumberElement"
        class="bg-white border border-gray-300 rounded-md shadow-sm p-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500"
      ></div>
      <div v-if="cardNumberError" class="text-[#FA755A] text-sm mt-1" role="alert">
        {{ cardNumberError }}
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="card-expiry-element" class="block text-sm font-medium text-gray-700 mb-1">
          Expiry Date
        </label>
        <div
          id="card-expiry-element"
          ref="cardExpiryElement"
          class="bg-white border border-gray-300 rounded-md shadow-sm p-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500"
        ></div>
        <div v-if="cardExpiryError" class="text-[#FA755A] text-sm mt-1" role="alert">
          {{ cardExpiryError }}
        </div>
      </div>
      <div>
        <label for="card-cvc-element" class="block text-sm font-medium text-gray-700 mb-1">
          CVC
        </label>
        <div
          id="card-cvc-element"
          ref="cardCvcElement"
          class="bg-white border border-gray-300 rounded-md shadow-sm p-3 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500"
        ></div>
        <div v-if="cardCvcError" class="text-[#FA755A] text-sm mt-1" role="alert">
          {{ cardCvcError }}
        </div>
      </div>
    </div>
    <div v-if="generalError" class="text-[#FA755A] text-sm mt-2" role="alert">
      {{ generalError }}
    </div>
  </div>
</template>
