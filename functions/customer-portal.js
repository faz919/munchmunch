const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler =  async (req) => {
  const { customer, return_url } = JSON.parse(req.body)
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customer,
    return_url: return_url
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      redirect: portalSession.url
    })
  }
}