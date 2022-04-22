const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)

exports.handler = async (req) => {
  const { payment_method, unit_amount, name, email, form_inputs, extra_metadata, shipping } = JSON.parse(req.body)
  const order_id = (new Date()).getTime()

  try {
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
            price: `${process.env.PRICE_ID_BEEF}`,
            quantity: extra_metadata.kgsPerMeatType['beef'] * (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          }
        case 'chicken':
          return {
            price: `${process.env.PRICE_ID_CHICKEN}`,
            quantity: extra_metadata.kgsPerMeatType['chicken'] * (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          }
        case 'lamb':
          return {
            price: `${process.env.PRICE_ID_LAMB}`,
            quantity: extra_metadata.kgsPerMeatType['chicken'] * (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          }
        case 'turkey':
          return {
            price: `${process.env.PRICE_ID_TURKEY}`,
            quantity: extra_metadata.kgsPerMeatType['chicken'] * (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          }
        case 'kangaroo':
          return {
            price: `${process.env.PRICE_ID_KANGAROO}`,
            quantity: extra_metadata.kgsPerMeatType['chicken'] * (parseInt(process.env.GRAMS_PER_UNIT) / 1000)
          }
      }
    })
  
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items,
      automatic_tax: {
        enabled: true
      },
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
        kgsPerMeatType: JSON.stringify(Object.fromEntries(Object.entries(extra_metadata.kgsPerMeatType).map(([k, v]) => [k, `${v} kgs`]))),
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
  } catch (e) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: e.message
      })
    }
  }
}