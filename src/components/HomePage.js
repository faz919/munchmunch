import React, { useEffect, useState } from 'react'
// MUI Components
import { Button, Card, CardContent, Divider, TextField, Typography, FormControlLabel, Checkbox, Select, MenuItem, InputLabel, RadioGroup, Radio } from '@mui/material'
// stripe
import { PaymentRequestButtonElement, useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
// Custom Components
import CardInput from './CardInput'
import { Box } from '@mui/system'
import calculatePrice from '../formulae/formula'
import logo from '../assets/images/munchmunch-logo.png'

const classes = {
  root: {
    maxWidth: 500,
    margin: '35vh auto',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  div: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
    justifyContent: 'space-between',
  },
  button: {
    margin: '2em auto 0.5em',
  },
}

function HomePage() {

  const [formResponses, setFormResponses] = useState({})
  const [finalPrice, setFinalPrice] = useState({ subtotal: (0).toFixed(2) })
  const [formPage, setFormPage] = useState(1)
  const [clientInfo, setClientInfo] = useState({ shippingAndBillingSame: true })
  const [meatTypesPicked, setMeatTypesPicked] = useState(false)
  const [paymentRequest, setPaymentRequest] = useState(null)

  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    finalPrice.subtotal && setFinalPrice(val => ({ ...val, tax: (finalPrice.subtotal / 10).toFixed(2), total: (finalPrice.subtotal * 1.1).toFixed(2) }))
  }, [finalPrice.subtotal])

  useEffect(() => {
    const { subtotal } = calculatePrice(formResponses)
    setFinalPrice(val => ({ ...val, subtotal }))
  }, [formResponses])

  useEffect(() => {
    if (!stripe || !elements) {
      return
    }

    const pr = stripe.paymentRequest({
      country: 'AU',
      currency: 'aud',
      total: {
        label: 'MunchMunch Subscription Total',
        amount: 51
      },
      requestPayerName: true,
      requestPayerEmail: true
    })
    // Check the availability of the Payment Request API first.
    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr)
      }
    })

    const handlePaymentMethodReceived = async (event) => {
      // Send the cart details and payment details to our function.
      const paymentDetails = {
        dollar_amount: finalPrice.total,
        currency: 'aud',
        payment_method_type: event.paymentMethod.type,
        payment_method: event.paymentMethod.id,
        name: event.payerName,
        email: event.payerEmail,
        // billing: {
        //   name: event.paymentMethod.billing_details.name,
        //   email: event.paymentMethod.billing_details.email,
        //   address: {
        //     line1: event.billing_details.address.line1,
        //     line2: event.billing_details.address.line2,
        //     city: event.billing_details.address.city,
        //     postal_code: event.billing_details.address.postal_code,
        //     state: event.billing_details.address.state,
        //     country: event.billing_details.address.country
        //   }
        // },
        // shipping: {
        //   name: event.shippingAddress.recipient,
        //   phone: event.shippingAddress.phone,
        //   address: {
        //     line1: event.shippingAddress.addressLine[0],
        //     city: event.shippingAddress.city,
        //     postal_code: event.shippingAddress.postalCode,
        //     state: event.shippingAddress.region,
        //     country: event.shippingAddress.country
        //   }
        // }
      }
      const response = await fetch('/.netlify/functions/third-party-pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentDetails })
      }).then((res) => {
        return res.json()
      })
      const { paymentIntent } = response
      console.log('response is: ', response)
      console.log('payment intent is: ', paymentIntent)
      if (response.error) {
        // Report to the browser that the payment failed.
        console.log(response.error)
        event.complete('fail')
      } else {
        if (response.paymentIntent.status === 'requires_confirmation') {
          stripe.confirmCardPayment(response.paymentIntent.client_secret, {
            setup_future_usage: 'on_session'
          }).then(async function (result) {
            if (result.error) {
              console.log("Error: ", result.error.message)
            } else {
              const res = await fetch('/.netlify/functions/subscribe', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  payment_method: response.paymentIntent.payment_method,
                  name: event.payerName,
                  // billing_address: {
                  //   name: event.shippingAddress.recipient,
                  //   phone: event.shippingAddress.phone,
                  //   address: {
                  //     line1: event.shippingAddress.addressLine[0],
                  //     city: event.shippingAddress.city,
                  //     postal_code: event.shippingAddress.postalCode,
                  //     state: event.shippingAddress.region,
                  //     country: event.shippingAddress.country
                  //   },
                  // },
                  // shipping_address: {
                  //   name: event.shippingAddress.recipient,
                  //   phone: event.shippingAddress.phone,
                  //   address: {
                  //     line1: event.shippingAddress.addressLine[0],
                  //     city: event.shippingAddress.city,
                  //     postal_code: event.shippingAddress.postalCode,
                  //     state: event.shippingAddress.region,
                  //     country: event.shippingAddress.country
                  //   },
                  // },
                  unit_amount: finalPrice.total
                })
              }).then((res) => res.json())
          
              const { client_secret, customer_id } = res
          
              const openCustomerPortal = async () => {
                const result = await fetch('/.netlify/functions/customer-portal', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    customer: customer_id,
                    return_url: 'https://munchmunch.com.au/'
                  })
                }).then((res) => res.json())
                const { redirect } = result
                window.location.assign(redirect)
              }
              // const { paymentIntent } = response
              // if (response.paymentIntent.status === 'requires_confirmation') {
              //   stripe.confirmCardPayment(client_secret).then(function (result) {
              //     if (result.error) {
              //       console.log("Error: ", result.error.message)
              //     } else {
              //       console.log('Success!')
              //       openCustomerPortal()
              //     }
              //   })
              // } else {
              //   console.log('Success!')
              //   openCustomerPortal()
              // }
            }
          })
        } else {
          console.log('no confirmation needed')
        }
      }
    }

    pr.on('paymentmethod', handlePaymentMethodReceived)

    finalPrice.total > 0 && pr.update({
      total: {
        label: 'MunchMunch Subscription Total',
        amount: Math.round(finalPrice.total * 100)
      }
    })
  }, [stripe, finalPrice.total])

  // sub button pressed
  const handleSubmitSub = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: clientInfo.name,
        email: clientInfo.email,
        address: clientInfo.billing
      }
    })

    if (result.error) {
      console.log('Error while processing payment method: ', result.error)
    }

    const res = await fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payment_method: result.paymentMethod.id,
        name: clientInfo.name,
        email: clientInfo.email,
        billing_address: clientInfo.billing,
        shipping_address: clientInfo.shippingAndBillingSame ? clientInfo.billing : clientInfo.shipping,
        unit_amount: finalPrice.total
      })
    }).then((res) => res.json())

    const { client_secret, status, customer_id } = res

    const openCustomerPortal = async () => {
      const result = await fetch('/.netlify/functions/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer: customer_id,
          return_url: 'https://munchmunch.com.au/'
        })
      }).then((res) => res.json())
      const { redirect } = result
      window.location.assign(redirect)
    }

    if (status === 'requires_action') {
      stripe.confirmCardPayment(client_secret).then(function (result) {
        if (result.error) {
          console.log("Error: ", result.error.message)
        } else {
          console.log('Success!')
          openCustomerPortal()
        }
      })
    } else {
      console.log('Success!')
      openCustomerPortal()
    }
  }

  useEffect(() => {
    if (formResponses.weightType === 'inshape') {
      setFormResponses(val => ({ ...val, targetWeight: formResponses.weight, meatTypes: null }))
    } else {
      setFormResponses(val => ({ ...val, targetWeight: null, meatTypes: null }))
    }
  }, [formResponses.weightType])

  useEffect(() => {
    if (formResponses.meatTypes) {
      let numSelected = 0
      for (const [, selected] of Object.entries(formResponses.meatTypes)) {
        selected && numSelected++
      }
      numSelected >= 2 ? setMeatTypesPicked(true) : setMeatTypesPicked(false)
    } else {
      setMeatTypesPicked(false)
    }
  }, [formResponses.meatTypes])

  const options = {
    paymentRequest,
    style: {
      paymentRequestButton: {
        height: '40px'
      }
    }
  }

  return (
    <div id='react-container-signup'>
      <div class="signup-container react-opacity-transition-appear-done react-opacity-transition-enter-done">
        <div>
          <div class='signup-form dark'>
            <form onSubmit={handleSubmitSub}>
              <div class="animate__fade-in">
                <div>
                  <div class="padding-bottom" />
                  <img src={logo} class="signup-logo" alt="MunchMunch logo" />
                </div>
                <h2 class="signup-heading">About your dog</h2>
                {formPage === 1 &&
                  <div class='animate__fade-in'>
                    <div class="padding-bottom">
                      <div>
                        <label class="label" for="name-field">My dog is named...</label>
                        <input
                          type="text"
                          name="name"
                          maxlength="25"
                          required
                          id="name-field"
                          placeholder="Your pet’s name"
                          onChange={e => setFormResponses(val => ({ ...val, dogName: e.target.value }))}
                          value={formResponses.dogName}
                        />
                      </div>
                    </div>
                  </div>
                }
              </div>
              {formResponses.dogName && formPage === 1 &&
                <div class="animate__fade-in">
                  <InputLabel class='label' id='meat-select-label'>{formResponses.dogName} is...</InputLabel>
                  <RadioGroup class='padding-bottom' required name="radio-buttons-group" value={formResponses.gender} onChange={(e) => setFormResponses(val => ({ ...val, gender: e.target.value }))} >
                    <Box sx={{ display: 'flex', flexWrap: 1 }}>
                      <FormControlLabel value="male" control={<Radio class='regular-radio' sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} />} label="Male" labelPlacement='End' />
                      <FormControlLabel value="female" control={<Radio class='regular-radio' sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} />} label="Female" labelPlacement='End' />
                    </Box>
                  </RadioGroup>
                </div>}
              {formResponses.dogName && formResponses.gender && formPage === 1 &&
                <div class="animate__fade-in">
                  <Button variant="contained" color="primary" style={classes.button} onClick={() => setFormPage(2)}>
                    Next
                  </Button>
                </div>
              }
              {formPage === 2 &&
                <div class="animate__fade-in">
                  <InputLabel class='label' id='meat-select-label'>{formResponses.dogName} currently weighs...</InputLabel>
                  <TextField
                    label='weight in kgs'
                    margin='normal'
                    variant='outlined'
                    type='number'
                    value={formResponses.weight}
                    onChange={(e) => {
                      if (e.target.value > 200) {
                        e.target.value = 200
                        setFormResponses(val => ({ ...val, weight: e.target.value }))
                      } else if (e.target.value < 0) {
                        e.target.value = 0
                        setFormResponses(val => ({ ...val, weight: e.target.value }))
                      } else {
                        setFormResponses(val => ({ ...val, weight: e.target.value }))
                      }
                    }}
                    fullWidth
                    required
                    inputProps={{ min: 0, max: 200 }}
                  />
                </div>
              }
              {formResponses.weight && formPage === 2 &&
                <div class="animate__fade-in">
                  <InputLabel class='label' id='meat-select-label'>{formResponses.dogName} is...</InputLabel>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                    <TextField
                      margin='normal'
                      variant='outlined'
                      type='number'
                      value={formResponses.age_years}
                      onChange={(e) => {
                        if (e.target.value > 20) {
                          e.target.value = 20
                          setFormResponses(val => ({ ...val, age_years: e.target.value }))
                        } else if (e.target.value < 0) {
                          e.target.value = 0
                          setFormResponses(val => ({ ...val, age_years: e.target.value }))
                        } else {
                          setFormResponses(val => ({ ...val, age_years: e.target.value }))
                        }
                      }}
                      required
                      inputProps={{ min: 0, max: 20 }}
                    />
                    <Typography class='label' variant='subtitle2'> years and </Typography>
                    <TextField
                      margin='normal'
                      variant='outlined'
                      type='number'
                      value={formResponses.age_months}
                      onChange={(e) => {
                        if (e.target.value > 11) {
                          e.target.value = 11
                          setFormResponses(val => ({ ...val, age_months: e.target.value }))
                        } else if (e.target.value < 0) {
                          e.target.value = 0
                          setFormResponses(val => ({ ...val, age_months: e.target.value }))
                        } else {
                          setFormResponses(val => ({ ...val, age_months: e.target.value }))
                        }
                      }}
                      required
                      inputProps={{ min: 0, max: 11 }}
                    />
                    <Typography class='label' variant='subtitle2'> months old.</Typography>
                  </Box>
                </div>
              }
              {formResponses.age_years && formResponses.age_months && formPage === 2 &&
                <div class="animate__fade-in">
                  <Button variant="contained" color="primary" style={classes.button} onClick={() => setFormPage(3)}>
                    Next
                  </Button>
                </div>
              }
              {formPage === 2 &&
                <div class="animate__fade-in">
                  <a class='form_back' target='_blank' onClick={() => setFormPage(1)}>
                    Back
                  </a>
                </div>
              }
              {formPage === 3 &&
                <div class="animate__fade-in">
                  <InputLabel class='label' id='meat-select-label'>{formResponses.dogName} can be described as...</InputLabel>
                  <RadioGroup required name="radio-buttons-group" value={formResponses.weightType} onChange={(e) => setFormResponses(val => ({ ...val, weightType: e.target.value }))} >
                    <Box sx={{ display: 'flex', flexWrap: 1 }}>
                      <FormControlLabel value="underweight" control={<Radio class='regular-radio' sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} />} label="Underweight" />
                      <FormControlLabel value="inshape" control={<Radio class='regular-radio' sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} />} label="In Shape" />
                      <FormControlLabel value="overweight" control={<Radio class='regular-radio' sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} />} label="Overweight" />
                    </Box>
                  </RadioGroup>
                </div>
              }
              {formResponses.weightType && formResponses.weightType !== 'inshape' && formPage === 3 &&
                <div class="animate__fade-in">
                  <InputLabel class='label' id='meat-select-label'>{formResponses.dogName} has an adult target weight of...</InputLabel>
                  <TextField
                    label='weight in kgs'
                    margin='normal'
                    variant='outlined'
                    type='number'
                    value={formResponses.targetWeight}
                    onChange={(e) => {
                      if (e.target.value > 200) {
                        e.target.value = 200
                      } else if (e.target.value < 0) {
                        e.target.value = 0
                      }
                      setFormResponses(val => ({ ...val, targetWeight: e.target.value }))
                    }}
                    fullWidth
                    required
                    inputProps={{ min: 0, max: 200 }}
                  />
                  {formResponses.targetWeight && <InputLabel class='label' id='meat-select-label'>{formResponses.targetWeight - formResponses.weight >= 0 ? `${formResponses.dogName} is going to gain ${formResponses.targetWeight - formResponses.weight} kgs.` : `${formResponses.dogName} is going to lose ${formResponses.weight - formResponses.targetWeight} kgs.`}</InputLabel>}
                </div>
              }
              {formResponses.weightType && formResponses.targetWeight && formPage === 3 &&
                <div class="animate__fade-in">
                  <InputLabel class='label' id='meat-select-label'>{formResponses.dogName} would like to eat...</InputLabel>
                  <InputLabel class='label' id='meat-select-label'>(Choose at least 2 options)</InputLabel>
                  <FormControlLabel control={<Checkbox sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} onChange={e => setFormResponses(val => ({ ...val, meatTypes: { ...formResponses.meatTypes, beef: e.target.checked } }))} />} label="Beef" />
                  <FormControlLabel control={<Checkbox sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} onChange={e => setFormResponses(val => ({ ...val, meatTypes: { ...formResponses.meatTypes, chicken: e.target.checked } }))} />} label="Chicken" />
                  <FormControlLabel control={<Checkbox sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} onChange={e => setFormResponses(val => ({ ...val, meatTypes: { ...formResponses.meatTypes, lamb: e.target.checked } }))} />} label="Lamb" />
                  <FormControlLabel control={<Checkbox sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} onChange={e => setFormResponses(val => ({ ...val, meatTypes: { ...formResponses.meatTypes, turkey: e.target.checked } }))} />} label="Turkey" />
                  <FormControlLabel control={<Checkbox sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} onChange={e => setFormResponses(val => ({ ...val, meatTypes: { ...formResponses.meatTypes, kangaroo: e.target.checked } }))} />} label="Kangaroo" />
                </div>
              }
              {formResponses.weightType && formResponses.targetWeight && meatTypesPicked && formPage === 3 &&
                <div class="animate__fade-in">
                  <Button variant="contained" color="primary" style={classes.button} onClick={() => setFormPage(4)}>
                    Next
                  </Button>
                </div>
              }
              {formPage === 3 &&
                <div class="animate__fade-in">
                  <a class='form_back' target='_blank' onClick={() => setFormPage(2)}>
                    Back
                  </a>
                </div>
              }
              {formResponses.dogName && formResponses.gender && formResponses.age_years && formResponses.age_months && formResponses.weightType && formResponses.targetWeight && meatTypesPicked && formPage === 4 &&
                <div class="animate__fade-in">
                  <Box class="receipt-line receipt-line-border" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle'>
                      Subtotal
                    </Typography>
                    <Typography variant='subtitle'>
                      ${finalPrice.subtotal}
                    </Typography>
                  </Box>
                  <Box class="receipt-line receipt-line-border" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle'>
                      10% Food Tax
                    </Typography>
                    <Typography variant='subtitle'>
                      + ${finalPrice.tax}
                    </Typography>
                  </Box>
                  <Box class="receipt-line receipt-line-border" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle'>
                      Shipping
                    </Typography>
                    <Typography variant='subtitle'>
                      FREE
                    </Typography>
                  </Box>
                  <Box class="receipt-line receipt-line-border" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle'>
                      Total
                    </Typography>
                    <Typography variant='subtitle'>
                      = ${finalPrice.total}
                    </Typography>
                  </Box>
                  <Divider />
                  {paymentRequest && <PaymentRequestButtonElement options={options} />}
                  <Typography mt={2} variant='h6' alignSelf={'center'}>
                    Billing Information
                  </Typography>
                  <TextField
                    label='Full Name'
                    placeholder='John Doe'
                    margin='normal'
                    variant='outlined'
                    type='text'
                    required
                    value={clientInfo.name}
                    onChange={(e) => setClientInfo(val => ({ ...val, name: e.target.value }))}
                    fullWidth />
                  <TextField
                    label='Email'
                    placeholder='john.doe@example.com'
                    margin='normal'
                    variant='outlined'
                    type='email'
                    required
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo(val => ({ ...val, email: e.target.value }))}
                    fullWidth />
                  <TextField
                    label='Address'
                    placeholder='185 Berry St. Suite 550'
                    margin='normal'
                    variant='outlined'
                    type='text'
                    required
                    value={clientInfo.billing?.line1}
                    onChange={(e) => setClientInfo(val => ({ ...val, billing: { ...clientInfo.billing, line1: e.target.value } }))}
                    fullWidth />
                  <TextField
                    label='City'
                    placeholder='San Francisco'
                    margin='normal'
                    variant='outlined'
                    type='text'
                    required
                    value={clientInfo.billing?.city}
                    onChange={(e) => setClientInfo(val => ({ ...val, billing: { ...clientInfo.billing, city: e.target.value } }))}
                    fullWidth />
                  <TextField
                    label='State'
                    placeholder='California'
                    margin='normal'
                    variant='outlined'
                    type='text'
                    required
                    value={clientInfo.billing?.state}
                    onChange={(e) => setClientInfo(val => ({ ...val, billing: { ...clientInfo.billing, state: e.target.value } }))}
                    fullWidth />
                  <TextField
                    label='ZIP Code'
                    placeholder='94103'
                    margin='normal'
                    variant='outlined'
                    type='number'
                    required
                    value={clientInfo.billing?.postal_code}
                    onChange={(e) => setClientInfo(val => ({ ...val, billing: { ...clientInfo.billing, postal_code: e.target.value } }))}
                    fullWidth />
                  <CardInput required />
                  <Typography variant='subtitle1'>
                    Shipping Address
                  </Typography>
                  <FormControlLabel control={<Checkbox checked={clientInfo.shippingAndBillingSame} onChange={e => setClientInfo(val => ({ ...val, shippingAndBillingSame: e.target.checked }))} />} label="Same as Billing Address" />
                  {!clientInfo.shippingAndBillingSame &&
                    <div class="animate__fade-in">
                      <TextField
                        label='Address'
                        placeholder='185 Berry St. Suite 550'
                        margin='normal'
                        variant='outlined'
                        type='text'
                        required
                        value={clientInfo.shipping?.line1}
                        onChange={(e) => setClientInfo(val => ({ ...val, shipping: { ...clientInfo.shipping, line1: e.target.value } }))}
                        fullWidth />
                      <TextField
                        label='City'
                        placeholder='San Francisco'
                        margin='normal'
                        variant='outlined'
                        type='text'
                        required
                        value={clientInfo.shipping?.city}
                        onChange={(e) => setClientInfo(val => ({ ...val, shipping: { ...clientInfo.shipping, city: e.target.value } }))}
                        fullWidth />
                      <TextField
                        label='State'
                        placeholder='California'
                        margin='normal'
                        variant='outlined'
                        type='text'
                        required
                        value={clientInfo.shipping?.state}
                        onChange={(e) => setClientInfo(val => ({ ...val, shipping: { ...clientInfo.shipping, state: e.target.value } }))}
                        fullWidth />
                      <TextField
                        label='ZIP Code'
                        placeholder='94103'
                        margin='normal'
                        variant='outlined'
                        type='number'
                        required
                        value={clientInfo.shipping?.postal_code}
                        onChange={(e) => setClientInfo(val => ({ ...val, shipping: { ...clientInfo.shipping, postal_code: e.target.value } }))}
                        fullWidth />
                    </div>
                  }
                  <Divider />
                  <Button variant="contained" color="primary" style={classes.button} type='submit'>
                    Order Now for {formResponses.dogName}
                  </Button>
                </div>
              }
              {formPage === 4 &&
                <div class="animate__fade-in">
                  <a class='form_back' target='_blank' onClick={() => setFormPage(3)}>
                    Back
                  </a>
                </div>
              }
            </form>
          </div>
        </div>
        <div class="animate__fade-in">
          <div class="padding-block-medium">
            <h1 class="facts-heading">Welcome</h1>
            <ul class="bullets-lined--bowl">
              <li>We’ve helped thousands of pets achieve healthy weight goals with personalized meal plans.</li>
              <li>
                "We’d been trying other food for a year and a half with no results, but after a couple of weeks eating MunchMunch, she’d already lost a pound and half."
                <div>— Corin on her dog, Luna</div>
              </li>
              <li>
                "Having the portioned food, the individual servings, is great. It helps control his weight, and it doesn't let me mess up."
                <div>— Susan on her dog, Harold</div>
              </li>
              <li>
                "She gained a pound and a half, her coat is beautiful, and her meow is back! She was very skinny, but now she is thriving and happy."
                <div>— Jessica on her cat, Oreo</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage