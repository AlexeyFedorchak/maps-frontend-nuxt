<script setup lang="ts">
import type {StripePaymentRequestButtonElement} from '@stripe/stripe-js';
import type {CheckoutFormContext} from '@/types/checkout'
import {useBasketStore} from '~/stores/basketStore'
import {useStripePayment} from "~/composables/useStripePayment";

interface Props {
  form: CheckoutFormContext
}

const props = defineProps<Props>();
const {isMobile} = useBreakpoints();
const basketStore = useBasketStore();

const isLoading = ref(false);
const error = ref<string | null>(null);
const cardDetailsRef = ref();

const {
  initializeStripe,
  createPaymentIntent,
  initializeApplePay,
  processKlarnaPayment,
  processPayPalPayment,
  processApplePayPayment,
  PAYMENT_METHODS,
} = useStripePayment();

const selectedPaymentMethod = ref<string>(PAYMENT_METHODS.CARD);

// Apple Pay button
let applePayButton: StripePaymentRequestButtonElement | null = null;

// Template refs
const applePayButtonContainer = ref<HTMLDivElement | null>(null);

// Availability flags
const isApplePayAvailable = ref(false);

const paymentMethods = computed(() => [
  {
    id: PAYMENT_METHODS.APPLE_PAY,
    name: 'Apple Pay',
    description: 'Quick payments',
    mobileDescription: 'Quick payments',
    image: '/images/payment-methods/apple-pay.png',
    available: isApplePayAvailable.value,
  },
  {
    id: PAYMENT_METHODS.PAYPAL,
    name: 'PayPal',
    description: 'or Pay in 3 with Paypal Pay Later. 0% interest',
    mobileDescription: 'or Pay in 3 with 0% interest',
    image: '/images/payment-methods/paypal.png',
    available: true,
  },
  {
    id: PAYMENT_METHODS.KLARNA,
    name: 'Klarna',
    description: 'Pay in 3, 0% interest payments.',
    mobileDescription: 'or Pay in 3 with 0% interest',
    image: '/images/payment-methods/klarna.png',
    available: true,
  },
]);

// Initialize client-side state
const isClient = ref(false);

onMounted(async () => {
  isClient.value = true;

  try {
    await initializeStripe();
    await setupApplePay();
  } catch (err) {
    console.error('Error initializing Stripe:', err);
  }
});

onBeforeUnmount(() => {
  // Cleanup
  if (applePayButton) applePayButton.destroy();
});

// Setup Apple Pay
const setupApplePay = async () => {
  const totalAmount = basketStore.basketTotal || 100;

  const {isAvailable, buttonElement} = await initializeApplePay(
    totalAmount,
    'usd',
    'US',
    (event: any) => handlePayment(PAYMENT_METHODS.APPLE_PAY, event)
  );

  if (isAvailable && buttonElement && applePayButtonContainer.value) {
    isApplePayAvailable.value = true;
    applePayButton = buttonElement;
    applePayButton.mount(applePayButtonContainer.value);
  }
};


// Function to handle payment method selection
const selectPaymentMethod = async (selectedMethodId: string) => {
  if (isLoading.value) return;

  selectedPaymentMethod.value = selectedMethodId;
  error.value = null;

  // Only auto-process non-card methods
  if (selectedMethodId === PAYMENT_METHODS.PAYPAL || selectedMethodId === PAYMENT_METHODS.KLARNA) {
    await handlePayment(selectedMethodId as typeof PAYMENT_METHODS.PAYPAL | typeof PAYMENT_METHODS.KLARNA);
  }
};

// Unified payment handler
const handlePayment = async (paymentType: typeof PAYMENT_METHODS.KLARNA | typeof PAYMENT_METHODS.PAYPAL | typeof PAYMENT_METHODS.APPLE_PAY, event?: any) => {
  if (isLoading.value) return;

  isLoading.value = true;
  error.value = null;

  try {
    const totalAmount = basketStore.basketTotal || 100;
    const orderId = `order-${Date.now()}`;
    const customerEmail = props.form.values.email;

    let paymentIntent;

    if (paymentType === PAYMENT_METHODS.KLARNA) {
      paymentIntent = await processKlarnaPayment({
        amount: totalAmount,
        currency: 'usd',
        orderId,
        customerEmail,
        billingDetails: {
          firstName: props.form.values.firstName,
          lastName: props.form.values.lastName,
          country: props.form.values.country || 'US',
        },
      });
    } else if (paymentType === PAYMENT_METHODS.PAYPAL) {
      paymentIntent = await processPayPalPayment({
        amount: totalAmount,
        currency: 'usd',
        orderId,
        customerEmail,
        billingDetails: {
          firstName: props.form.values.firstName,
          lastName: props.form.values.lastName,
        },
      });
    } else if (paymentType === PAYMENT_METHODS.APPLE_PAY) {
      paymentIntent = await processApplePayPayment({
        event,
        amount: totalAmount,
        currency: 'usd',
        orderId,
        customerEmail,
      });
    }

    if (paymentIntent?.status === 'succeeded') {
      await navigateTo('/checkout/success');
    }
  } catch (err: any) {
    const errorMessages = {
      [PAYMENT_METHODS.KLARNA]: 'Klarna payment failed. Please try again.',
      [PAYMENT_METHODS.PAYPAL]: 'PayPal payment failed. Please try again.',
      [PAYMENT_METHODS.APPLE_PAY]: 'Apple Pay payment failed. Please try again.',
    };

    error.value = err.message || errorMessages[paymentType];
    console.error(`${paymentType} payment error:`, err);
  } finally {
    isLoading.value = false;
  }
};


// Function to process card payment (called from Complete Order button)
const processCardPayment = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  error.value = null;

  try {
    const totalAmount = basketStore.basketTotal || 100;

    // Create payment intent
    const {clientSecret} = await createPaymentIntent(
      totalAmount,
      'usd',
      `order-${Date.now()}`,
      props.form.values.email
    );

    // Handle card payment through the existing CardDetails component
    if (!cardDetailsRef.value) {
      throw new Error('Card details component not available');
    }

    const paymentIntent = await cardDetailsRef.value.confirmCardPayment(clientSecret);

    if (paymentIntent?.status === 'succeeded') {
      // Payment successful - redirect to success page
      await navigateTo('/checkout/success');
    } else {
      throw new Error('Payment was not successful');
    }
  } catch (err: any) {
    error.value = err.message || 'Payment failed. Please try again.';
    console.error('Payment error:', err);
  } finally {
    isLoading.value = false;
  }
};

// Expose the functions for the parent component
defineExpose({
  processCardPayment,
  processKlarnaPayment: () => handlePayment(PAYMENT_METHODS.KLARNA),
  processPayPalPayment: () => handlePayment(PAYMENT_METHODS.PAYPAL),
});

</script>

<template>
  <ClientOnly>
    <div class="p-4 md:px-6 md:py-10 bg-white">
      <!-- Existing Payment Methods Section -->
      <div class="flex flex-col gap-1 mb-5 md:mb-6">
        <div>
          <h2 class="hidden md:block font-extrabold text-lg">Choose your payment method</h2>
          <div class="md:hidden flex gap-6 items-center">
            <h2 class="text-xs font-extrabold">Secure Payment</h2>
            <span class="text-xs">Receipts sent via email only</span>
          </div>
        </div>
        <div class="hidden md:block">
          <span class="text-[#787878]">Guaranteed safe & secure checkout. Receipts sent via email only.</span>
        </div>
      </div>

      <div v-if="isClient" class="grid grid-cols-1 gap-4">
        <div
          v-for="method in paymentMethods.filter(m => m.available)"
          :key="method.id"
          @click="selectPaymentMethod(method.id)"
        >
          <PaymentMethod
            :method="method"
            :is-mobile="isMobile"
            :is-selected="selectedPaymentMethod === method.id"
            :is-loading="isLoading"
          />
        </div>

        <!-- Apple Pay Button (if available) -->
        <div v-if="isApplePayAvailable && selectedPaymentMethod === PAYMENT_METHODS.APPLE_PAY" class="mt-4">
          <div ref="applePayButtonContainer" class="stripe-payment-button"></div>
        </div>
      </div>

      <!-- Loading state for payment methods -->
      <div v-else class="grid grid-cols-1 gap-4">
        <div class="flex items-center gap-3 border border-gray-[#D9D9D9] rounded-xl px-5 py-4 md:px-6 md:py-5">
          <div class="flex-[1] md:flex-1 flex justify-between items-center">
            <div class="flex">
              <div class="h-4 w-4 border border-[#D9D9D9] rounded-full flex items-center justify-center">
              </div>
            </div>
            <div class="flex items-center justify-end">
              <div class="h-8 md:h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
          <div class="flex-[2] md:flex-1 flex flex-col items-start">
            <div class="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1"></div>
            <div class="h-3 w-32 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>

      <!-- Loading indicator -->
      <div
        v-if="isLoading"
        class="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded flex items-center gap-2"
      >
        <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Processing payment...
      </div>

      <!-- Error message -->
      <div v-if="error" class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        {{ error }}
      </div>

      <div class="my-3 md:my-6 text-center"><span class="uppercase text-[#7E7E7E]">- OR -</span></div>

      <!-- DEBIT & CREDIT CARDS  -->
      <div
        class="border border-[#D9D9D9] rounded-xl pt-4.5 px-6 pb-6 cursor-pointer"
        :class="[
        !isMobile && selectedPaymentMethod !== PAYMENT_METHODS.CARD && 'bg-[#F7F7F7]',
        isLoading && 'opacity-50 cursor-not-allowed'
      ]"
        @click="selectPaymentMethod(PAYMENT_METHODS.CARD)"
      >
        <div>
          <div
            class="flex md:block gap-3"
          >
            <div class="flex md:hidden mt-1">
              <div
                class="flex h-4 w-4 border rounded-full items-center justify-center border-[#D9D9D9]"
              >
                <div
                  class="h-2 w-2 rounded-full"
                  :class="selectedPaymentMethod === PAYMENT_METHODS.CARD && 'border-[#D9D9D9]'"
                ></div>
              </div>
            </div>
            <div class="flex items-center gap-3 mb-8 md:mb-12 flex-col-reverse md:flex-row">
              <div class="flex-[1] md:flex-1 flex justify-between items-center">
                <div class="flex">
                  <div
                    class="hidden h-4 w-4 border rounded-full md:flex items-center justify-center border-[#D9D9D9]"
                  >
                    <div
                      class="h-2 w-2 rounded-full"
                      :class="selectedPaymentMethod === PAYMENT_METHODS.CARD && 'bg-[#070707]'"
                    ></div>
                  </div>
                </div>
                <div class="flex items-center justify-end">
                  <NuxtImg
                    alt="Credit and Debit Cards"
                    class="object-contain min-h-[22px]"
                    src="/images/payment-methods/cards.png"
                  />
                  <NuxtImg
                    alt="Gift Cards"
                    class="object-contain min-h-[22px]"
                    src="/images/payment-methods/gift-cards.png"
                  />
                </div>
              </div>
              <div class="flex w-full items-center gap-4 md:flex-1 ">
                <div class="flex flex-col items-start">
                  <span class="font-medium text-sm md:text-base">Pay via DEBIT/CREDIT CARD</span>
                  <span class="text-xs md:text-sm text-gray-500">All Major Credit & Debit Cards Accepted.</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="mb-10">
              <div class="hidden md:block mb-6">
                <span class="text-[#7E7E7E]">Secure Checkout. Complete the card details below</span>
              </div>
              <PaymentCardDetails ref="cardDetailsRef" :form="props.form" />
            </div>

            <PaymentBillingAddressForm :form="props.form" />
          </div>
        </div>
      </div>

    </div>

    <template #fallback>
      <div class="p-4 md:px-6 md:py-10 bg-white">
        <div class="flex flex-col gap-1 mb-5 md:mb-6">
          <div>
            <h2 class="hidden md:block font-extrabold text-lg">Choose your payment method</h2>
            <div class="md:hidden flex gap-6 items-center">
              <h2 class="text-xs font-extrabold">Secure Payment</h2>
              <span class="text-xs">Receipts sent via email only</span>
            </div>
          </div>
          <div class="hidden md:block">
            <span class="text-[#787878]">Guaranteed safe & secure checkout. Receipts sent via email only.</span>
          </div>
        </div>

        <!-- Loading skeleton for payment methods -->
        <div class="grid grid-cols-1 gap-4">
          <div class="flex items-center gap-3 border border-gray-[#D9D9D9] rounded-xl px-5 py-4 md:px-6 md:py-5">
            <div class="flex-[1] md:flex-1 flex justify-between items-center">
              <div class="flex">
                <div class="h-4 w-4 border border-[#D9D9D9] rounded-full flex items-center justify-center">
                </div>
              </div>
              <div class="flex items-center justify-end">
                <div class="h-8 md:h-10 w-20 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
            <div class="flex-[2] md:flex-1 flex flex-col items-start">
              <div class="h-4 w-24 bg-gray-200 animate-pulse rounded mb-1"></div>
              <div class="h-3 w-32 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </div>
        </div>

        <div class="my-3 md:my-6 text-center"><span class="uppercase text-[#7E7E7E]">- OR -</span></div>

        <!-- Loading skeleton for card payment -->
        <div class="border border-[#D9D9D9] rounded-xl pt-4.5 px-6 pb-6 bg-[#F7F7F7]">
          <div class="flex items-center gap-3 mb-8 md:mb-12 flex-col-reverse md:flex-row">
            <div class="flex-[1] md:flex-1 flex justify-between items-center">
              <div class="flex">
                <div class="hidden h-4 w-4 border border-[#D9D9D9] rounded-full md:flex items-center justify-center">
                </div>
              </div>
              <div class="flex items-center justify-end">
                <div class="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
            <div class="flex w-full items-center gap-4 md:flex-1">
              <div class="flex flex-col items-start">
                <span class="font-medium text-sm md:text-base">Pay via DEBIT/CREDIT CARD</span>
                <span class="text-xs md:text-sm text-gray-500">All Major Credit & Debit Cards Accepted.</span>
              </div>
            </div>
          </div>

          <div class="mb-10">
            <div class="hidden md:block mb-6">
              <span class="text-[#7E7E7E]">Secure Checkout. Complete the card details below</span>
            </div>
            <!-- Card details loading skeleton -->
            <div class="space-y-4 md:space-y-2.5 md:w-1/2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <div class="bg-gray-200 border border-gray-300 rounded-md shadow-sm p-3 h-12 animate-pulse"></div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <div class="bg-gray-200 border border-gray-300 rounded-md shadow-sm p-3 h-12 animate-pulse"></div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <div class="bg-gray-200 border border-gray-300 rounded-md shadow-sm p-3 h-12 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </template>
  </ClientOnly>
</template>

<style scoped>
</style>

