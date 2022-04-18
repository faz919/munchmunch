const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async (req) => {
  console.log(req)
  if (req.body) {
    try {
      const { paymentDetails } = JSON.parse(req.body)
      const setupIntent = await stripe.setupIntents.create({
        // amount: Math.round(paymentDetails.dollar_amount * 100), 
        // currency: paymentDetails.currency, 
        payment_method_types: [paymentDetails.payment_method_type],
        payment_method: paymentDetails.payment_method,
        // metadata: {
        //   formResponses: JSON.stringify(paymentDetails.form_inputs)
        // },
      })
      // Send publishable key and PaymentIntent details to client
      return {
        statusCode: 200,
        body: JSON.stringify({ setupIntent })
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 400,
        body: JSON.stringify({ error })
      }
    }
  }
}