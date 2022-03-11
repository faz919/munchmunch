const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async (req) => {
  const { amount, currency, paymentDetails } = JSON.parse(req.body)

  try {
    const paymentIntent = await stripe.paymentIntents.create({ amount, currency, ...paymentDetails })
    // Send publishable key and PaymentIntent details to client
    return {
      statusCode: 200,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret
      })
    }
  } catch (e) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: {
          message: e.message,
        }
      })
    }
  }
}