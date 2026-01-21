import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripeSecretKey = config.stripeSecretKey as string

  if (!stripeSecretKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Stripe secret key not configured'
    })
  }

  const stripe = new Stripe(stripeSecretKey)
  const body = await readBody(event)

  try {
    // Determine payment method types based on request
    const paymentMethodTypes = body.paymentMethodType 
      ? [body.paymentMethodType] 
      : ['card'];

    // Create payment intent configuration
    const paymentIntentConfig: any = {
      amount: body.amount, // Amount in cents
      currency: body.currency || 'usd',
      metadata: {
        orderId: body.orderId || '',
        customerEmail: body.customerEmail || '',
      },
      // Add customer information for better payment method support
      ...(body.customerEmail && {
        receipt_email: body.customerEmail,
      }),
    };

    // Use specific payment method types or automatic payment methods
    if (body.paymentMethodType) {
      paymentIntentConfig.payment_method_types = paymentMethodTypes;
    } else {
      // Enable automatic payment methods (includes card, Apple Pay, etc.)
      paymentIntentConfig.automatic_payment_methods = {
        enabled: true,
      };
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentConfig);

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    }
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create payment intent'
    })
  }
})
