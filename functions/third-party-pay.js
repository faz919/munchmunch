const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async (req) => {
  try {
    const paymentDetails = JSON.parse(req.body)
    const paymentIntent = await stripe.paymentIntents.create({ ...paymentDetails })
    // Send publishable key and PaymentIntent details to client
    return {
      statusCode: 200,
      body: JSON.stringify({
        paymentIntent
      })
    }
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: {
          message: e.message
        }
      })
    }
  }
}