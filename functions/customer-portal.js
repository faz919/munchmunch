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
      const API_KEY = `${process.env.MAILGUN_API_KEY}`
      const DOMAIN = `${process.env.MAILGUN_DOMAIN}`

      const formData = require('form-data')
      const Mailgun = require('mailgun.js')

      const mailgun = new Mailgun(formData)
      const client = mailgun.client({ username: 'api', key: API_KEY })

      const messageData = {
        from: 'Excited User <me@samples.mailgun.org>',
        to: 'faizit9@gmail.com',
        subject: 'Hello',
        text: 'Testing some Mailgun awesomeness!'
      }

      client.messages.create(DOMAIN, messageData)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.error(err)
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