const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)
const API_KEY = `${process.env.MAILGUN_API_KEY}`
const DOMAIN = `${process.env.MAILGUN_DOMAIN}`

const formData = require('form-data')
const Mailgun = require('mailgun.js')

const mailgun = new Mailgun(formData)
const client = mailgun.client({ username: 'api', key: API_KEY })

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
            res: `Oops! Looks like we don't have this email on our records. Please try again.`
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
      const messageData = {
        from: 'MunchMunch Support <support@munchmunch.com.au>',
        to: email,
        subject: 'Welcome!',
        template: "welcome",
        'v:RECIPIENT_PORTAL': `${portalSession.url}`
      }
      try {
        await client.messages.create(DOMAIN, messageData)
      } catch (e) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            res: `Error: ${e.message}`
          })
        }
      }
      return {
        statusCode: 200,
        body: JSON.stringify({
          res: 'Success! Please check your email for a link to your billing portal.',
          redirect: portalSession.url
        })
      }
    } catch (e) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          res: `Error: ${e.message}`
        })
      }
    }
  }
}