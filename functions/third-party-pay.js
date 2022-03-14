const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)
const axios = require('axios')

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
    axios.post('https://hooks.slack.com/services/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', {
      text: `New error while awaiting third-party-pay fetch: ${e.message}`
    })
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