const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async (req) => {
  if (req.body) {
    let { customer, email, return_url } = JSON.parse(req.body)
    if (customer == null) {
      const existingCustomerData = await stripe.customers.list({
        limit: 1,
        email: email
      })
      if (existingCustomerData.data.length === 0) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            error: `Oops! Looks like we don't have this email on our records. Please try again.`
          })
        }
      } else {
        customer = existingCustomerData.data[0].id
      }
    }
    try {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: customer,
        return_url: return_url
      })
      return {
        statusCode: 200,
        body: JSON.stringify({
          redirect: portalSession.url
        })
      }
    } catch (e) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          error: e.message
        })
      }
    }
  }
}