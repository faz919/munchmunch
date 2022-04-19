const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async (req) => {
  const { payment_method, unit_amount, name, email, form_inputs, extra_metadata, shipping } = JSON.parse(req.body)
  const order_id = (new Date()).getTime()

  const existingCustomerData = await stripe.customers.list({
    limit: 1,
    email: email
  })

  let customer

  if (existingCustomerData.data.length === 0) {
    customer = await stripe.customers.create({
      payment_method: payment_method,
      email: email,
      name: name,
      invoice_settings: {
        default_payment_method: payment_method
      },
      shipping
    })
  } else {
    customer = existingCustomerData.data[0]
  }

  console.log(existingCustomerData)

  const product = await stripe.products.create({
    name: 'custom subscription for ' + name,
    metadata: {
      orderID: order_id,
      formResponses: JSON.stringify(form_inputs),
      extraMetadata: JSON.stringify(extra_metadata)
    }
  })

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{
      price_data: {
        unit_amount: Math.round(unit_amount * 100),
        currency: 'aud',
        product: product.id,
        recurring: {
          interval: 'month',
        },
      },
    }],
    coupon: 'trial-discount',
    metadata: {
      orderID: order_id,
      formResponses: JSON.stringify(form_inputs),
      extraMetadata: JSON.stringify(extra_metadata)
    },
    expand: ['latest_invoice.payment_intent']
  })

  const status = subscription['latest_invoice']['payment_intent']['status']
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

  return {
    statusCode: 200,
    body: JSON.stringify({
      client_secret: client_secret,
      status: status,
      customer_id: customer.id
    })
  }
}