const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async (req) => {
  console.log(req)
  try {
    // const paymentDetails = JSON.parse(req.body)
    const paymentIntent = await stripe.paymentIntents.create({ amount: 1, currency: 'aud' })
    console.log(JSON.stringify(paymentIntent))
    // Send publishable key and PaymentIntent details to client
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent })
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 400,
      body: JSON.stringify({ e })
    }
  }
}