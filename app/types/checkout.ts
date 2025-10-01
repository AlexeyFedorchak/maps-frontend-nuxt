import type { FormContext } from 'vee-validate'

// Define the form values type based on the checkout form schema
export interface CheckoutFormValues {
  // Shipping and contact fields
  shipping: string
  email: string
  phone?: string
  createAnAccount?: boolean

  // Payment fields (optional on mobile, required on desktop)
  cardNumber?: string
  expiryDate?: string
  cvc?: string
  firstName: string
  lastName: string
  addressLine1: string
  addressLine2?: string
  city: string
  zipCode: string
  country: string
  shipToDifferentAddress?: boolean
  addDeliveryNotes?: boolean

  // Shipping address fields (conditional)
  shippingFirstName?: string
  shippingLastName?: string
  shippingAddressLine1?: string
  shippingAddressLine2?: string
  shippingCity?: string
  shippingZipCode?: string
  shippingCountry?: string

  // Delivery notes (conditional)
  deliveryNotes?: string
}

// Define the form context type
export type CheckoutFormContext = FormContext<CheckoutFormValues>
