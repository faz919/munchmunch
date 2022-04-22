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
    await stripe.paymentMethods.attach(
      payment_method,
      {
        customer: existingCustomerData.data[0].id,
      }
    )
    customer = await stripe.customers.update(
      existingCustomerData.data[0].id,
      { 
        name: name,
        invoice_settings: {
          default_payment_method: payment_method
        },
        shipping
      }
    )
  }

  console.log(existingCustomerData)

  // const product = await stripe.products.create({
  //   name: 'custom subscription for ' + name,
  //   metadata: {
  //     orderID: order_id,
  //     ...Object.fromEntries(Object.entries(form_inputs).map(([k, v]) => [k, JSON.stringify(v)])),
  //     ...Object.fromEntries(Object.entries(extra_metadata).map(([k, v]) => [k, JSON.stringify(v)])),
  //     orderWeight: `${orderWeight} kgs`,
  //     kgsPerMeatType: Object.fromEntries(Object.entries(extra_metadata).map(([k, v]) => [k, `${v} kgs`])),
  //   }
  // })

  const items = form_inputs.meatTypes.map((meat, index) => {
    switch (meat) {
      case 'beef':
        return {
          price: 'price_1KrIvyD7lOuiuDEBcOXVbIl5',
          quantity: extra_metadata.kgsPerMeatType['beef'] / 0.5
        }
      case 'chicken':
        return {
          price: 'price_1KrIyZD7lOuiuDEBHOEHTOLA',
          quantity: extra_metadata.kgsPerMeatType['chicken'] / 0.5
        }
      case 'lamb':
        return {

        }
      case 'turkey':
        return {

        }
      case 'kangaroo':
        return {

        }
    }
  })

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items,
    // [{
    //   price_data: {
    //     unit_amount: Math.round(unit_amount * 100),
    //     currency: 'aud',
    //     product: product.id,
    //     recurring: {
    //       interval: 'month',
    //     },
    //   },
    // }],
    coupon: 'trial-discount',
    metadata: {
      ...Object.fromEntries(Object.entries(form_inputs).map(([k, v]) => [k, JSON.stringify(v)])),
      ...Object.fromEntries(Object.entries(extra_metadata).map(([k, v]) => [k, JSON.stringify(v)])),
      orderWeight: `${extra_metadata.orderWeight} kgs`,
      kgsPerMeatType: Object.fromEntries(Object.entries(extra_metadata.kgsPerMeatType).map(([k, v]) => [k, `${v} kgs`])),
      orderID: order_id,
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