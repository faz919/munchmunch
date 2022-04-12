import React, { useEffect, useState } from 'react'
// MUI Components
import {
  Button,
  Input,
  // Card,
  // CardContent,
  Divider,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  // Select,
  // MenuItem,
  InputLabel,
  RadioGroup,
  Radio,
  LinearProgress
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
// stripe
import {
  PaymentRequestButtonElement,
  useStripe,
  useElements,
  CardElement
} from '@stripe/react-stripe-js'
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

  const [formResponses, setFormResponses] = useState({
    dogName: '',
    gender: '',
  })
  const [metadata, setMetadata] = useState({})
  const [finalPrice, setFinalPrice] = useState({ subtotal: (0).toFixed(2) })
  const [formPage, setFormPage] = useState(1)
  const [clientInfo, setClientInfo] = useState({ shippingAndBillingSame: true })
  const [meatTypesPicked, setMeatTypesPicked] = useState(false)
  const [paymentRequest, setPaymentRequest] = useState(null)
  const [percent, setPercent] = useState(0)

  const stripe = useStripe()
  const elements = useElements()

  const mobileScreen = useMediaQuery('(max-width:1024px)');

  useEffect(() => {
    finalPrice.subtotal && setFinalPrice(val => ({ ...val, tax: (finalPrice.subtotal / 10).toFixed(2), total: (finalPrice.subtotal * 1.1).toFixed(2) }))
  }, [finalPrice.subtotal])

  useEffect(() => {
    const { subtotal, dailyKCalRequirement, orderWeight, kgsPerMeatType, orderKCalRequirement } = calculatePrice(formResponses)
    setFinalPrice(val => ({ ...val, subtotal }))
    setMetadata(val => ({ ...val, dailyKCalRequirement, orderWeight, kgsPerMeatType, orderKCalRequirement }))
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
        amount: 51,
        pending: true
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestShipping: true,
      shippingOptions: [{
        id: 'basic',
        label: 'Ground shipping',
        detail: 'Ground shipping via UPS or FedEx',
        amount: 0,
      }]
    })
    // Check the availability of the Payment Request API first.
    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr)
      }
    })

    const handlePaymentMethodReceived = async (event) => {
      console.log('event is: ', event)
      // Send the cart details and payment details to our function.
      const paymentDetails = {
        dollar_amount: finalPrice.total,
        currency: 'aud',
        payment_method_type: event.paymentMethod.type,
        payment_method: event.paymentMethod.id,
        name: event.payerName,
        email: event.payerEmail,
        // form_inputs: formResponses
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
      const { setupIntent } = response
      console.log('response is: ', response)
      console.log('payment intent is: ', setupIntent)
      if (response.error) {
        // Report to the browser that the payment failed.
        console.log(response.error)
        event.complete('fail')
      } else {
        if (response.setupIntent.status === 'requires_confirmation') {
          stripe.confirmCardSetup(response.setupIntent.client_secret).then(async function (result) {
            if (result.error) {
              console.log("Error: ", result.error.message)
            } else {
              const res = await fetch('/.netlify/functions/subscribe', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  payment_method: response.setupIntent.payment_method,
                  name: event.payerName,
                  billing: {
                    name: event.paymentMethod.billing_details.name,
                    email: event.paymentMethod.billing_details.email,
                    address: {
                      line1: event.paymentMethod.billing_details.address.line1,
                      line2: event.paymentMethod.billing_details.address.line2,
                      city: event.paymentMethod.billing_details.address.city,
                      postal_code: event.paymentMethod.billing_details.address.postal_code,
                      state: event.paymentMethod.billing_details.address.state,
                      country: event.paymentMethod.billing_details.address.country
                    }
                  },
                  shipping: {
                    name: event.shippingAddress.recipient,
                    phone: event.shippingAddress.phone,
                    address: {
                      line1: event.shippingAddress.addressLine[0],
                      city: event.shippingAddress.city,
                      postal_code: event.shippingAddress.postalCode,
                      state: event.shippingAddress.region,
                      country: event.shippingAddress.country
                    }
                  },
                  unit_amount: finalPrice.total,
                  form_inputs: formResponses,
                  extra_metadata: metadata
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
              if (customer_id) {
                console.log('Success!')
                openCustomerPortal()
                event.complete('success')
              }
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
        amount: Math.round(finalPrice.total * 100),
        pending: false
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
    <div className='page-container'>
        
        <Box sx={{
          display: 'block',
          position: 'fixed',
          width: '100%'
        }}>
        <LinearProgress
          variant="determinate"
          value={percent}
          sx={{
            height: '10px',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#4caf50'
            },
            '&.MuiLinearProgress-determinate': {
              backgroundColor: '#e6ee9c'
            }
          }} />
        </Box>
    
      <div className="signup-container">
        
        <div>
          <div className='signup-form dark'>
            <form onSubmit={handleSubmitSub}>
              <div className="animate__fade-in">
                <div>
                  <div className="padding-bottom" />
                  <img src={logo} className="signup-logo" alt="MunchMunch logo" />
                </div>
                {/* <h2 className="signup-heading">About your dog</h2> */}

                <Typography component="h2" sx={{fontFamily: 'Bubblegum Sans', fontSize: '38px', lineHeight: '48px', color: '#bbc592', marginBottom: '20px', textAlign: 'center', textTransform: 'none'}}>
                  About your dog
                </Typography>
                {formPage === 1 &&
                  <div className='animate__fade-in'>
                    <div className="padding-bottom">
                      {/* <div> */}
                        {/* <label className="label" htmlFor="name-field">My dog is named...</label>
                        <input
                          type="text"
                          name="name"
                          maxLength="25"
                          required
                          id="name-field"
                          placeholder="Your pet’s name"
                          onChange={e => setFormResponses(val => ({ ...val, dogName: e.target.value }))}
                          value={formResponses.dogName}
                      /> */}
                      <InputLabel
                        htmlFor="name-field"
                        sx={{
                          width: 'fit-content',
                          cursor: 'pointer',
                          fontFamily: 'Bubblegum Sans',
                          fontSize: '18px',
                          lineHeight: '22px',
                          fontWeight: 700,
                          marginBottom: '5px',
                          marginLeft: '15px'
                        }}
                      >
                        My dog is named...
                      </InputLabel>
                      <Input
                        id="name-field"
                        name="name"
                        // className={classes.inputDogName}
                        value={formResponses.dogName}
                        onChange={e => setFormResponses(val => ({ ...val, dogName: e.target.value }))}
                        placeholder='Your pet’s name'
                        autoComplete='off'
                        disableUnderline={true}
                        fullWidth={true}
                        sx={{
                          backgroundColor: "#fff",
                          borderRadius: '10px',
                          border: 'none',
                          '.MuiInput-input': {
                            display: 'block',
                            position: 'relative',
                            height: '40px',
                            padding: '5px 8px',
                            border: '2px solid',
                            borderColor: `${formResponses.dogName.length > 0 ? '#6d4c41' : '#bbc592'}`,
                            borderRadius: '10px',
                            fontFamily: 'Bubblegum Sans',
                            fontSize: '18px',
                            lineHeight: '26px'
                          },
                          '& .MuiInput-input:focus': {
                            outline: 'none',
                            appearance: 'none',
                            border: '2px solid #6d4c41'
                          },
                          '& .MuiInput-input::placeholder': {
                            fontSize: '18px',
                            lineHeight: '26px'
                          }
                        }}
                      />
                      {/* </div> */}
                    </div>
                  </div>
                }
              </div>
              {formResponses.dogName && formPage === 1 &&
                <div className="animate__fade-in">
                  <InputLabel
                    // className='label'
                    id='meat-select-label'
                    sx={{
                      width: 'fit-content',
                      cursor: 'pointer',
                      fontFamily: 'Bubblegum Sans',
                      fontSize: '18px',
                      fontWeight: 700,
                      marginBottom: '5px',
                      marginLeft: '15px'
                    }}
                  >
                    {formResponses.dogName} is...
                  </InputLabel>

                  <RadioGroup
                    // className='padding-bottom'
                    required
                    name="radio-buttons-group"
                    value={formResponses.gender}
                    onChange={(e) => setFormResponses(val => ({ ...val, gender: e.target.value }))}
                    sx={{
                      paddingBottom: '20px'
                    }}
                  >
                    <Box sx={{ display: 'flex', flexWrap: 1 }}>
                      <FormControlLabel
                        value="male"
                        label="Male"
                        labelPlacement='end'
                        control={
                          <Radio
                            // className='regular-radio'
                            checked={formResponses.gender === 'male'}
                            sx={{
                              color: '#bbc592', //#fff
                              '& .MuiSvgIcon-root': {
                                width: '36px',
                                height: '36px'
                              },  
                              '&.Mui-checked': { color: '#6d4c41' }, //#E6A65D 
                              '&:hover': { color: '#6d4c41' }
                            }}
                          />}
                        sx={{
                          marginRight: '60px',
                          '& .MuiTypography-root': {
                            fontFamily: 'Bubblegum Sans',
                            fontSize: '18px',
                            lineHeight: '22px',
                            color: '#bbc592',
                          },
                          '&:checked': {
                            color: '#6d4c41'
                          }
                        }}
                      />
                      <FormControlLabel
                        value="female"
                        label="Female"
                        labelPlacement='end'
                        control={
                          <Radio
                            // className='regular-radio'
                            checked={formResponses.gender === 'female'}
                            sx={{
                              color: '#bbc592', //#fff
                              '& .MuiSvgIcon-root': {
                                width: '36px',
                                height: '36px'
                              },  
                              '&.Mui-checked': { color: '#6d4c41' }, //#E6A65D 
                              '&:hover': { color: '#6d4c41' }
                            }}
                          />}
                        sx={{
                          '& .MuiTypography-root': {
                            fontFamily: 'Bubblegum Sans',
                            fontSize: '18px',
                            lineHeight: '22px',
                            color: '#bbc592'
                          },
                          '&:checked': {
                            color: '#6d4c41'
                          }
                        }}
                      />
                    </Box>
                  </RadioGroup>
                </div>}
              {formResponses.dogName && formResponses.gender && formPage === 1 &&
                <div className="animate__fade-in">
                  <Button
                    variant="contained"
                    // color="primary"
                    // style={classes.button}
                    onClick={() => {
                      setFormPage(2);
                      setPercent(33)
                    }}
                    sx={{
                      // width: '50px',
                      padding: '8px 25px',
                      margin: '2em auto 0.5em',
                      backgroundColor: '#bbc592',
                      textTransform: 'none',
                      fontFamily: 'Bubblegum Sans',
                      fontSize: '18px',
                      // lineHeight: '22px',
                      fontWeight: '400',
                      color: 'rgba(0, 0, 0, 0.6)',
                      ':hover': {
                        backgroundColor: '#6d4c41',
                        color: '#bbc592'
                      }
                    }}
                  >
                    Next
                  </Button>
                </div>
              }
              {formPage === 2 &&
                <div className="animate__fade-in">
                  <InputLabel className='label' id='meat-select-label'>{formResponses.dogName} currently weighs...</InputLabel>
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
                <div className="animate__fade-in">
                  <InputLabel className='label' id='meat-select-label'>{formResponses.dogName} is...</InputLabel>
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
                    <Typography className='label' variant='subtitle2'> years and </Typography>
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
                    <Typography className='label' variant='subtitle2'> months old.</Typography>
                  </Box>
                </div>
              }
              {formResponses.age_years && formResponses.age_months && formPage === 2 &&
                <div className="animate__fade-in">
                  <Button
                    variant="contained"
                    color="primary" 
                    style={classes.button}
                    onClick={() => {
                      setFormPage(3);
                      setPercent(66);
                    }}
                  >
                    Next
                  </Button>
                </div>
              }
              {formPage === 2 &&
                <div className="animate__fade-in">
                  <a className='form_back' target='_blank' onClick={() => setFormPage(1)}>
                    Back
                  </a>
                </div>
              }
              {formPage === 3 &&
                <div className="animate__fade-in">
                  <InputLabel className='label' id='meat-select-label'>{formResponses.dogName} can be described as...</InputLabel>
                  <RadioGroup required name="radio-buttons-group" value={formResponses.weightType} onChange={(e) => setFormResponses(val => ({ ...val, weightType: e.target.value }))} >
                    <Box sx={{ display: 'flex', flexWrap: 1 }}>
                      <FormControlLabel value="underweight" control={<Radio className='regular-radio' sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} />} label="Underweight" />
                      <FormControlLabel value="inshape" control={<Radio className='regular-radio' sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} />} label="In Shape" />
                      <FormControlLabel value="overweight" control={<Radio className='regular-radio' sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} />} label="Overweight" />
                    </Box>
                  </RadioGroup>
                </div>
              }
              {formResponses.weightType && formResponses.weightType !== 'inshape' && formPage === 3 &&
                <div className="animate__fade-in">
                  <InputLabel className='label' id='meat-select-label'>{formResponses.dogName} has an adult target weight of...</InputLabel>
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
                  {formResponses.targetWeight && <InputLabel className='label' id='meat-select-label'>{formResponses.targetWeight - formResponses.weight >= 0 ? `${formResponses.dogName} is going to gain ${formResponses.targetWeight - formResponses.weight} kgs.` : `${formResponses.dogName} is going to lose ${formResponses.weight - formResponses.targetWeight} kgs.`}</InputLabel>}
                </div>
              }
              {formResponses.weightType && formResponses.targetWeight && formPage === 3 &&
                <div className="animate__fade-in">
                  <InputLabel className='label' id='meat-select-label'>{formResponses.dogName} would like to eat...</InputLabel>
                  <InputLabel className='label' id='meat-select-label'>(Choose at least 2 options)</InputLabel>
                  <FormControlLabel control={<Checkbox sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} onChange={e => setFormResponses(val => ({ ...val, meatTypes: { ...formResponses.meatTypes, beef: e.target.checked } }))} />} label="Beef" />
                  <FormControlLabel control={<Checkbox sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} onChange={e => setFormResponses(val => ({ ...val, meatTypes: { ...formResponses.meatTypes, chicken: e.target.checked } }))} />} label="Chicken" />
                  <FormControlLabel control={<Checkbox sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} onChange={e => setFormResponses(val => ({ ...val, meatTypes: { ...formResponses.meatTypes, lamb: e.target.checked } }))} />} label="Lamb" />
                  <FormControlLabel control={<Checkbox sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} onChange={e => setFormResponses(val => ({ ...val, meatTypes: { ...formResponses.meatTypes, turkey: e.target.checked } }))} />} label="Turkey" />
                  <FormControlLabel control={<Checkbox sx={{ color: '#fff', '&.Mui-checked': { color: '#E6A65D' } }} onChange={e => setFormResponses(val => ({ ...val, meatTypes: { ...formResponses.meatTypes, kangaroo: e.target.checked } }))} />} label="Kangaroo" />
                </div>
              }
              {formResponses.weightType && formResponses.targetWeight && meatTypesPicked && formPage === 3 &&
                <div className="animate__fade-in">
                  <Button
                    variant="contained"
                    color="primary"
                    style={classes.button}
                    onClick={() => {
                      setFormPage(4);
                      setPercent(100);
                    }}
                  >
                    Next
                  </Button>
                </div>
              }
              {formPage === 3 &&
                <div className="animate__fade-in">
                  <a className='form_back' target='_blank' onClick={() => setFormPage(2)}>
                    Back
                  </a>
                </div>
              }
              {formResponses.dogName && formResponses.gender && formResponses.age_years && formResponses.age_months && formResponses.weightType && formResponses.targetWeight && meatTypesPicked && formPage === 4 &&
                <div className="animate__fade-in">
                  <Box className="receipt-line receipt-line-border" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle'>
                      Subtotal
                    </Typography>
                    <Typography variant='subtitle'>
                      ${finalPrice.subtotal}
                    </Typography>
                  </Box>
                  <Box className="receipt-line receipt-line-border" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle'>
                      10% Food Tax
                    </Typography>
                    <Typography variant='subtitle'>
                      + ${finalPrice.tax}
                    </Typography>
                  </Box>
                  <Box className="receipt-line receipt-line-border" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='subtitle'>
                      Shipping
                    </Typography>
                    <Typography variant='subtitle'>
                      FREE
                    </Typography>
                  </Box>
                  <Box className="receipt-line receipt-line-border" sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                    <div className="animate__fade-in">
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
                <div className="animate__fade-in">
                  <a className='form_back' target='_blank' onClick={() => setFormPage(3)}>
                    Back
                  </a>
                </div>
              }
            </form>
          </div>
        </div>
        <div className="animate__fade-in">
          <div className="padding-block-medium">
            {/* <h1 className="facts-heading">Welcome</h1> */}
            <Typography
              component="h1"
              sx={{
                fontFamily: 'Bubblegum Sans',
                fontSize: '62px',
                lineHeight: '70px',
                textAlign: 'center',
                color: '#6d4c41',
                marginBottom: `${mobileScreen ? '20px' : '40px'}`
              }}
            >
              Welcome
            </Typography>
            <ul className="bullets-lined--bowl">
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
            {/* <Typography
              component="p"
              sx={{
                fontFamily: 'Bubblegum Sans',
                fontSize: '18px',
                lineHeight: '24px',
                color: '#6d4c41'
              }}
            >
              We&apos;ve helped thousands of pets achieve healthy weight goals with personalized meal plans.
            </Typography> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage