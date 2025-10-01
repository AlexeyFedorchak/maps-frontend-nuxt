import { loadStripe, type Stripe, type StripeElements, type StripePaymentRequestButtonElement, type PaymentRequest } from '@stripe/stripe-js'

// Payment method constants
export const PAYMENT_METHODS = {
  CARD: 'card',
  APPLE_PAY: 'applepay',
  PAYPAL: 'paypal',
  KLARNA: 'klarna',
} as const

export type PaymentMethodType = typeof PAYMENT_METHODS[keyof typeof PAYMENT_METHODS]

export const useStripePayment = () => {
  const config = useRuntimeConfig()
  const stripePublishableKey = config.public.stripePublishableKey as string

  let stripe: Stripe | null = null
  let elements: StripeElements | null = null

  const initializeStripe = async () => {
    // Only run on client-side
    if (import.meta.server) {
      return null
    }

    if (!stripePublishableKey) {
      throw new Error('Stripe publishable key not configured')
    }

    stripe = await loadStripe(stripePublishableKey)
    if (!stripe) {
      throw new Error('Failed to load Stripe')
    }

    return stripe
  }

  const createPaymentIntent = async (amount: number, currency = 'usd', orderId?: string, customerEmail?: string) => {
    try {
      const response = await $fetch('/api/payment/create-intent', {
        method: 'POST',
        body: {
          amount: Math.round(amount * 100), // Convert to cents
          currency,
          orderId,
          customerEmail,
        },
      })

      return response
    } catch (error) {
      console.error('Error creating payment intent:', error)
      throw error
    }
  }

  // Initialize Apple Pay and return button element
  const initializeApplePay = async (
    amount: number,
    currency = 'usd',
    country = 'US',
    onPaymentMethod: (event: any) => Promise<void>
  ) => {
    // Only run on client-side
    if (import.meta.server) {
      return { isAvailable: false, buttonElement: null, paymentRequest: null }
    }

    if (!stripe) {
      await initializeStripe()
    }

    if (!stripe) {
      throw new Error('Failed to initialize Stripe')
    }

    const paymentRequest = stripe.paymentRequest({
      country,
      currency,
      total: {
        label: 'Total',
        amount: Math.round(amount * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
    })

    const canMakePayment = await paymentRequest.canMakePayment()

    if (canMakePayment && canMakePayment.applePay) {
      // Setup payment handler
      paymentRequest.on('paymentmethod', onPaymentMethod)

      // Create button element
      if (!elements) {
        elements = stripe.elements()
      }

      const buttonElement = elements.create('paymentRequestButton', {
        paymentRequest,
      })

      return {
        isAvailable: true,
        buttonElement,
        paymentRequest,
      }
    }

    return {
      isAvailable: false,
      buttonElement: null,
      paymentRequest: null,
    }
  }

  const confirmPayment = async (clientSecret: string, paymentMethod?: any) => {
    if (!stripe) {
      throw new Error('Stripe not initialized')
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements: elements!,
      clientSecret,
      confirmParams: {
        payment_method: paymentMethod,
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: 'if_required',
    })

    if (error) {
      throw error
    }

    return paymentIntent
  }

  const confirmCardPayment = async (clientSecret: string) => {
    if (!stripe || !elements) {
      throw new Error('Stripe or Elements not initialized')
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret)

    if (error) {
      throw error
    }

    return paymentIntent
  }

  // Normalize country codes to ISO 3166-1 alpha-2 format
  const normalizeCountryCode = (countryCode: string): string => {
    const countryMap: Record<string, string> = {
      'uk': 'GB',
      'en': 'GB',
      'us': 'US',
      'usa': 'US',
    }

    const upperCode = countryCode.toUpperCase()
    return countryMap[countryCode.toLowerCase()] || upperCode
  }

  // Process Klarna payment
  const processKlarnaPayment = async ({
    amount,
    currency = 'usd',
    orderId,
    customerEmail,
    billingDetails,
  }: {
    amount: number
    currency?: string
    orderId: string
    customerEmail: string
    billingDetails: {
      firstName: string
      lastName: string
      country: string
    }
  }) => {
    if (!stripe) {
      await initializeStripe()
    }

    if (!stripe) {
      throw new Error('Stripe not initialized')
    }

    // Create payment intent for Klarna
    const { clientSecret } = await $fetch('/api/payment/create-intent', {
      method: 'POST',
      body: {
        amount: Math.round(amount * 100),
        currency,
        orderId,
        customerEmail,
        paymentMethodType: PAYMENT_METHODS.KLARNA,
      },
    })

    if (!clientSecret) {
      throw new Error('Failed to create payment intent')
    }

    // Confirm Klarna payment
    const { error, paymentIntent } = await stripe.confirmKlarnaPayment(
      clientSecret,
      {
        payment_method: {
          billing_details: {
            email: customerEmail,
            name: `${billingDetails.firstName} ${billingDetails.lastName}`,
            address: {
              country: normalizeCountryCode(billingDetails.country || 'US'),
            },
          },
        },
        return_url: `${window.location.origin}/checkout/success`,
      }
    )

    if (error) {
      throw error
    }

    return paymentIntent
  }

  // Process PayPal payment
  const processPayPalPayment = async ({
    amount,
    currency = 'usd',
    orderId,
    customerEmail,
    billingDetails,
  }: {
    amount: number
    currency?: string
    orderId: string
    customerEmail: string
    billingDetails: {
      firstName: string
      lastName: string
    }
  }) => {
    if (!stripe) {
      await initializeStripe()
    }

    if (!stripe) {
      throw new Error('Stripe not initialized')
    }

    // Create payment intent for PayPal
    const { clientSecret } = await $fetch('/api/payment/create-intent', {
      method: 'POST',
      body: {
        amount: Math.round(amount * 100),
        currency,
        orderId,
        customerEmail,
        paymentMethodType: PAYMENT_METHODS.PAYPAL,
      },
    })

    if (!clientSecret) {
      throw new Error('Failed to create payment intent')
    }

    // Confirm PayPal payment
    const { error, paymentIntent } = await stripe.confirmPayPalPayment(
      clientSecret,
      {
        payment_method: {
          billing_details: {
            email: customerEmail,
            name: `${billingDetails.firstName} ${billingDetails.lastName}`,
          },
        },
        return_url: `${window.location.origin}/checkout/success`,
      }
    )

    if (error) {
      throw error
    }

    return paymentIntent
  }

  // Process Apple Pay payment
  const processApplePayPayment = async ({
    event,
    amount,
    currency = 'usd',
    orderId,
    customerEmail,
  }: {
    event: any
    amount: number
    currency?: string
    orderId: string
    customerEmail: string
  }) => {
    if (!stripe) {
      throw new Error('Stripe not initialized')
    }

    // Create payment intent
    const { clientSecret } = await createPaymentIntent(
      amount,
      currency,
      orderId,
      customerEmail
    )

    if (!clientSecret) {
      throw new Error('Failed to create payment intent')
    }

    // Confirm payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: event.paymentMethod.id },
      { handleActions: false }
    )

    if (error) {
      event.complete('fail')
      throw error
    }

    event.complete('success')
    return paymentIntent
  }

  return {
    initializeStripe,
    createPaymentIntent,
    initializeApplePay,
    processKlarnaPayment,
    processPayPalPayment,
    processApplePayPayment,
    confirmPayment,
    confirmCardPayment,
    stripe: readonly(ref(stripe)),
    elements: readonly(ref(elements)),
    PAYMENT_METHODS,
  }
}
