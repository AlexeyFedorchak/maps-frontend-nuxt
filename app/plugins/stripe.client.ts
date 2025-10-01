import { loadStripe } from '@stripe/stripe-js'

export default defineNuxtPlugin(async () => {
  const config = useRuntimeConfig()
  const stripePublishableKey = config.public.stripePublishableKey as string

  if (!stripePublishableKey) {
    console.error('Stripe publishable key is not configured')
    return
  }

  const stripe = await loadStripe(stripePublishableKey)

  return {
    provide: {
      stripe
    }
  }
})
