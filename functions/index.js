// const express = require('express')
// const app = express()
// const cors = require('cors')
// const bodyParser = require('body-parser')
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// const port = 3000

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

// app.use(cors())

// app.post('/create-payment-intent', async (req, res) => {
//   const {paymentMethodType, amount, currency, paymentMethodOptions} = req.body;

//   // Each payment method type has support for different currencies. In order to
//   // support many payment method types and several currencies, this server
//   // endpoint accepts both the payment method type and the currency as
//   // parameters.
//   //
//   // Some example payment method types include `card`, `ideal`, and `alipay`.
//   const params = {
//     payment_method_types: [paymentMethodType],
//     amount: amount,
//     currency: currency,
//   }

//   // If this is for an ACSS payment, we add payment_method_options to create
//   // the Mandate.
//   if(paymentMethodType === 'acss_debit') {
//     params.payment_method_options = {
//       acss_debit: {
//         mandate_options: {
//           payment_schedule: 'sporadic',
//           transaction_type: 'personal',
//         },
//       },
//     }
//   } else if (paymentMethodType === 'konbini') {
//     /**
//      * Default value of the payment_method_options
//      */
//     params.payment_method_options = {
//       konbini: {
//         product_description: 'Tシャツ',
//         expires_after_days: 3,
//       },
//     }
//   }

//   /**
//    * If API given this data, we can overwride it
//    */
//   if (paymentMethodOptions) {
//     params.payment_method_options = paymentMethodOptions
//   }

//   // Create a PaymentIntent with the amount, currency, and a payment method type.
//   //
//   // See the documentation [0] for the full list of supported parameters.
//   //
//   // [0] https://stripe.com/docs/api/payment_intents/create
//   try {
//     const paymentIntent = await stripe.paymentIntents.create(params);

//     // Send publishable key and PaymentIntent details to client
//     res.json({
//       clientSecret: paymentIntent.client_secret
//     });
//   } catch (e) {
//     return res.json({
//       error: {
//         message: e.message,
//       },
//     });
//   }
// });

// app.post('/sub', async (req, res) => {
//   const { email, payment_method, unit_amount, shipping_address, name } = req.body
//   const customer = await stripe.customers.create({
//     payment_method: payment_method,
//     address: shipping_address,
//     email: email,
//     name: name,
//     invoice_settings: {
//       default_payment_method: payment_method
//     },
//     shipping: {
//       address: shipping_address,
//       name: name
//     }
//   })

//   const product = await stripe.products.create({ name: 'custom subscription for ' + customer.id })

//   const subscription = await stripe.subscriptions.create({
//     customer: customer.id,
//     items: [{
//       price_data: {
//         unit_amount: unit_amount,
//         currency: 'aud',
//         product: product.id,
//         recurring: {
//           interval: 'month',
//         },
//       },
//     }],
//     expand: ['latest_invoice.payment_intent']
//   })

//   const status = subscription['latest_invoice']['payment_intent']['status']
//   const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

//   res.json({client_secret: client_secret, status: status, customer_id: customer.id})
// })

// app.post('/portal', async (req, res) => {
//   const { customer, return_url } = req.body
//   const portalSession = await stripe.billingPortal.sessions.create({
//     customer: customer,
//     return_url: return_url
//   });
//   res.json({redirect: portalSession.url});
// })

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))