const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler =  async (req) => {
  const { customer, return_url } = req.body
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customer,
    return_url: return_url
  });
  return { redirect: portalSession.url }
}