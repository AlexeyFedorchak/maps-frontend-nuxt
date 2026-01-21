<script setup lang="ts">
import {toTypedSchema} from '@vee-validate/zod'
import * as z from 'zod'
import {useForm} from 'vee-validate'

const {isMobile} = useBreakpoints();

const shippingOptions: Array<{ value: string }> = [
  {
    value: '1-2 Day Tracked Royal Mail - FREE',
  },
  {
    value: 'Guaranteed Next Working Day (1-Day): 5.95',
  },
];

// Create dynamic schema based on mobile/desktop
// const createFormSchema = (isMobile: boolean) => {
//   return z.object({
//     loginEmail: z.string()
//     .min(1, "Email is required")
//     .email("Invalid email"),
//     loginPassword: z.string()
//     .min(1, "Password is required")
//     .min(6, "Password must be at least 6 characters"),
//     rememberMe: z.boolean().optional(),

//     shipping: z.string(),
//     email: z.string().email(),
//     phone: z.string().optional(),
//     createAnAccount: z.boolean().optional(),
//     // Payment fields - conditional validation based on mobile
//     cardNumber: isMobile
//       ? z.string().optional()
//       : z.string()
//           .min(1, "Card number is required")
//           .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Please enter a valid 16-digit card number"),
//     expiryDate: isMobile
//       ? z.string().optional()
//       : z.string()
//           .min(1, "Expiry date is required")
//           .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Please enter expiry date in MM/YY format"),
//     cvc: isMobile
//       ? z.string().optional()
//       : z.string()
//           .min(1, "CVC is required")
//           .regex(/^\d{3,4}$/, "Please enter a valid CVC (3-4 digits)"),
//     firstName: z.string()
//       .min(1, "First name is required")
//       .min(2, "First name must be at least 2 characters"),
//     lastName: z.string()
//       .min(1, "Last name is required")
//       .min(2, "Last name must be at least 2 characters"),
//     addressLine1: z.string()
//       .min(1, "Address is required")
//       .min(5, "Please enter a complete address"),
//     addressLine2: z.string().optional(),
//     city: z.string()
//       .min(1, "City is required")
//       .min(2, "Please enter a valid city name"),
//     zipCode: z.string()
//       .min(1, "ZIP code is required")
//       .regex(/^[A-Za-z0-9\s-]{3,10}$/, "Please enter a valid ZIP code"),
//     country: z.string()
//       .min(1, "Country is required"),
//     shipToDifferentAddress: z.boolean().optional(),
//     addDeliveryNotes: z.boolean().optional(),
//     // Shipping address fields (conditional)
//     shippingFirstName: z.string().optional(),
//     shippingLastName: z.string().optional(),
//     shippingAddressLine1: z.string().optional(),
//     shippingAddressLine2: z.string().optional(),
//     shippingCity: z.string().optional(),
//     shippingZipCode: z.string().optional(),
//     shippingCountry: z.string().optional(),
//     // Delivery notes (conditional)
//     deliveryNotes: z.string().optional()
//   }).refine((data) => {
//     // If ship to different address is checked, shipping fields are required
//     if (data.shipToDifferentAddress) {
//       return data.shippingFirstName && data.shippingLastName && data.shippingAddressLine1 && data.shippingCity && data.shippingZipCode && data.shippingCountry;
//     }
//     return true;
//   }, {
//     message: "Shipping address fields are required when shipping to a different address",
//     path: ["shippingAddressLine1"] // This will show the error on the first shipping field
//   });
// };

// Create a computed schema that reacts to isMobile changes
// const formSchema = computed(() => toTypedSchema(createFormSchema(isMobile.value)));

const form = useForm({
  // validationSchema: formSchema,
  initialValues: {
    loginEmail: '',
    loginPassword: '',
    email: '',
    phone: '',
    createAnAccount: false,
    shipping: shippingOptions[0]?.value || '',
    email: '',
    // Payment fields
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    zipCode: '',
    country: 'uk',
    shipToDifferentAddress: false,
    addDeliveryNotes: false,
    // Shipping address fields
    shippingFirstName: '',
    shippingLastName: '',
    shippingAddressLine1: '',
    shippingAddressLine2: '',
    shippingCity: '',
    shippingZipCode: '',
    shippingCountry: 'uk',
    // Delivery notes
    deliveryNotes: ''
  },
});

const paymentSectionRef = ref();
const isProcessingPayment = ref(false);
const paymentError = ref<string | null>(null);

const onSubmit = form.handleSubmit(async (values) => {
  console.log('Form submitted!', values);

  // Check if card payment is selected and process it
  if (paymentSectionRef.value) {
    try {
      isProcessingPayment.value = true;
      paymentError.value = null;

      await paymentSectionRef.value.processCardPayment();
    } catch (error: any) {
      paymentError.value = error.message || 'Payment failed. Please try again.';
      console.error('Payment error:', error);
    } finally {
      isProcessingPayment.value = false;
    }
  }
});
</script>

<template>
  <form :form="form" @submit.prevent="onSubmit">
    <div class="max-w-5xl mx-auto px-4 mb-8">
      <div class="p-4 md:px-6 md:py-10 bg-white">
        <CheckoutOrderShipping :options="shippingOptions" />
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 mb-8">
      <CheckoutOrderContactDetails :form="form" />
    </div>


    <div class="bg-[#F7F7F7]">
      <div class="max-w-5xl mx-auto px-4">
        <PaymentSection
          ref="paymentSectionRef"
          :form="form"
        />
      </div>

    </div>

    <!-- Payment Error Display -->
    <div v-if="paymentError" class="max-w-5xl mx-auto px-4 mb-4">
      <div class="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
        {{ paymentError }}
      </div>
    </div>

    <div class="max-w-5xl mx-auto px-4 mb-8">
      <div class="p-4 md:px-6 md:py-10 bg-white">
        <div class="flex justify-end">
          <UiButton
            class="min-h-12 md:min-w-72 bg-[#3C4349] uppercase"
            type="submit"
            :disabled="isProcessingPayment"
          >
            <span v-if="isProcessingPayment">Processing...</span>
            <span v-else>Complete Order</span>
          </UiButton>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>

</style>
