import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FormControlLabel,
  Typography,
  Divider,
  Fade,
  Box,
  RadioGroup,
  Radio,
  CircularProgress
} from '@mui/material'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import {
  PaymentRequestButtonElement,
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js'
import Layout from '../components/Layout'
import { useAppState } from '../context'
import CardInput from '../components/CardInput'
import calculatePrice from '../formulae/formula'
import { AddPercent, ChangePortionSize, ChangeSuccessState, SetBillingPortalUrl } from '../context/appStateActions'
import { LoadingButton } from '@mui/lab'
import styled from "styled-components";
const ReactPixel = require('react-facebook-pixel');

const StyledHeading1 = styled.p`
    margin:0px;
    background: rgba(0, 0, 0, 0) linear-gradient(0deg, rgb(255, 204, 51) 0%, rgb(254, 101, 79) 100%) repeat scroll 0% 0%;
    background: rgba(0, 0, 0, 0) -webkit-linear-gradient(0deg, rgb(255, 204, 51) 0%, rgb(254, 101, 79) 100%) repeat scroll 0% 0%;
    background: rgba(0, 0, 0, 0) -moz-linear-gradient(0deg, rgb(255, 204, 51) 0%, rgb(254, 101, 79) 100%) repeat scroll 0% 0%;
    text-shadow: none;
    padding: 15px 25px;
    border-radius: 33px;
`;

const Checkout = () => {
  const navigate = useNavigate()
  const { state, dispatch } = useAppState()
  const [metadata, setMetadata] = useState({})
  const [finalPrice, setFinalPrice] = useState({ subtotal: (0).toFixed(2) })
  const [paymentRequest, setPaymentRequest] = useState(null)
  const [loading, setLoading] = useState(false)
  const [priceCalculated, setCalculated] = useState(false)
  const [errorText, setErrorText] = useState(null)

  const stripe = useStripe()
  const elements = useElements()

  const stylesText = {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '18px',
    lineHeight: '22px',
  }

  useEffect(() => {
    dispatch(AddPercent(100))
    ReactPixel.default.init('426736622778173');
  }, [])

  useEffect(() => {
    if (finalPrice.subtotal > 0) {

      // release
      setFinalPrice((val) => ({
        ...val,
        tax: (finalPrice.subtotal / 10).toFixed(2),
        trialDiscount: (finalPrice.subtotal / 2).toFixed(2),
        discountTotal: (finalPrice.subtotal / 2).toFixed(2),
        total: (finalPrice.subtotal * 1).toFixed(2),
      }))

      // // testing
      // setFinalPrice((val) => ({
      //   ...val,
      //   tax: (0.10).toFixed(2),
      //   trialDiscount: (0.55).toFixed(2),
      //   discountTotal: (0.55).toFixed(2),
      //   total: (1.10).toFixed(2),
      // }))

      setCalculated(true)
    } else {
      setCalculated(false)
    }
  }, [finalPrice.subtotal])

  useEffect(() => {
    setCalculated(false)
    const calculateSubtotal = async () => {
      const {
        dailyKCalRequirement,
        orderWeight,
        kgsPerMeatType,
        orderKCalRequirement,
      } = calculatePrice(state)

      const calculator = await fetch('/.netlify/functions/calculate-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ meatTypes: state.meatTypes, kgsPerMeatType }),
      }).then((res) => {
        return res.json()
      })

      const { error, subtotal } = calculator

      if (error) {
        console.error(error)
        setErrorText(error)
        return
      } else {
        setPaymentRequest(null)
        setFinalPrice((val) => ({ ...val, subtotal: state.portionSize === 'half' ? (subtotal * 0.6).toFixed(2) : subtotal }))
        setMetadata((val) => ({
          ...val,
          dailyKCalRequirement,
          orderWeight,
          kgsPerMeatType,
          orderKCalRequirement,
        }))
      }
    }

    calculateSubtotal()
  }, [state.portionSize])

  const showSuccessScreen = (url) => {
    dispatch(SetBillingPortalUrl(url))
    dispatch(ChangeSuccessState(true))
    navigate('/success')
    setLoading(false)
    dispatch(AddPercent(''))
  }

  useEffect(() => {
    if (!stripe || !elements) {
      return
    }

    const pr = stripe.paymentRequest({
      country: 'AU',
      currency: 'aud',
      total: {
        label: 'Munch+Munch Subscription Total',
        amount: 51,
        pending: true
      },
    })
    // Check the availability of the Payment Request API first.
    pr.canMakePayment().then((result) => {
      if (result && finalPrice.total > 0) {
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
        name: state.shippingInfo.name,
        email: state.shippingInfo.email,
      }

      const response = await fetch('/.netlify/functions/third-party-pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentDetails }),
      }).then((res) => {
        return res.json()
      })
      const { setupIntent } = response
      console.log('response is: ', response)
      console.log('payment intent is: ', setupIntent)
      if (response.error) {
        // Report to the browser that the payment failed.
        console.error(response.error)
        setErrorText(response.error.message)
        setLoading(false)
        event.complete('fail')
        return
      } else {
        if (response.setupIntent.status === 'requires_confirmation') {
          stripe
            .confirmCardSetup(response.setupIntent.client_secret)
            .then(async function (result) {
              if (result.error) {
                console.error('Error: ', result.error.message)
                setErrorText(result.error.message)
                setLoading(false)
                event.complete('fail')
              } else {
                const res = await fetch('/.netlify/functions/subscribe', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    payment_method: response.setupIntent.payment_method,
                    name: state.shippingInfo.name,
                    email: state.shippingInfo.email,
                    billing: {
                      name: event.paymentMethod.billing_details.name,
                      email: event.paymentMethod.billing_details.email,
                      address: {
                        line1:
                          event.paymentMethod.billing_details.address.line1,
                        line2:
                          event.paymentMethod.billing_details.address.line2,
                        city: event.paymentMethod.billing_details.address.city,
                        postal_code:
                          event.paymentMethod.billing_details.address
                            .postal_code,
                        state:
                          event.paymentMethod.billing_details.address.state,
                        country:
                          event.paymentMethod.billing_details.address.country,
                      },
                    },
                    shipping: {
                      name: state.shippingInfo.name,
                      address: {
                        ...state.shippingInfo.shipping,
                        country: 'AU'
                      }
                    },
                    unit_amount: finalPrice.total,
                    form_inputs: {
                      dogName: state.dogName,
                      gender: state.gender,
                      weight: state.weight,
                      age_years: state.age_years,
                      age_months: state.age_months,
                      weightType: state.weightType,
                      targetWeight: state.targetWeight,
                      healthProblems: state.healthProblems,
                      meatTypes: state.meatTypes,
                    },
                    extra_metadata: metadata,
                  }),
                }).then((res) => res.json())

                const { customer_id } = res

                const openCustomerPortal = async () => {
                  const result = await fetch(
                    '/.netlify/functions/customer-portal',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        customer: customer_id,
                        email: state.shippingInfo.email,
                        return_url: 'https://munchmunch.com.au/',
                      }),
                    }
                  ).then((res) => res.json())
                  const { redirect } = result
                  return redirect
                }
                if (customer_id) {
                  console.log('Success!')
                  let url = await openCustomerPortal()
                  showSuccessScreen(url)
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
        label: 'Munch+Munch Subscription Total',
        amount: Math.round(Math.round(finalPrice.total * 100) / 2),
        pending: false
      },
      displayItems: [
        {
          label: 'First Month Total',
          amount: Math.round(Math.round(finalPrice.total * 100) / 2),
        },
        {
          label: 'Subsequent Month Total',
          amount: Math.round(finalPrice.total * 100),
        }
      ]
    })
  }, [stripe, finalPrice.total])

  const handleSubmitSub = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErrorText(null)
    if (!stripe || !elements) {
      return
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: state.shippingInfo.name,
        email: state.shippingInfo.email,
      },
    })

    if (result.error) {
      console.error('Error while processing payment method: ', result.error)
      setErrorText(result.error.message)
      setLoading(false)
      return
    }

    const form_inputs = [{
      unit_amount: finalPrice.total,
      dogName: state.dogName,
      gender: state.gender,
      weight: state.weight,
      age_years: state.age_years,
      age_months: state.age_months,
      weightType: state.weightType,
      targetWeight: state.targetWeight,
      healthProblems: state.healthProblems,
      meatTypes: state.meatTypes,
    }]

    const res = await fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method: result.paymentMethod.id,
        name: state.shippingInfo.name,
        email: state.shippingInfo.email,
        shipping: {
          name: state.shippingInfo.name,
          address: {
            ...state.shippingInfo.shipping,
            country: 'AU'
          }
        },
        unit_amount: finalPrice.total,
        form_inputs: {
          dogName: state.dogName,
          gender: state.gender,
          weight: state.weight,
          age_years: state.age_years,
          age_months: state.age_months,
          weightType: state.weightType,
          targetWeight: state.targetWeight,
          healthProblems: state.healthProblems,
          meatTypes: state.meatTypes,
        },
        extra_metadata: metadata
      }),
    }).then((res) => res.json()).then(
      window.fbq('track', 'ViewContent', {
        content_type: form_inputs,
      }),
      window.fbq('track', 'Purchase', {
        value: finalPrice.total,
        currency: 'AUD',
      })
    );

    const { client_secret, status, customer_id, error } = res

    if (error) {
      console.error('Error: ', error)
      setErrorText(error)
      setLoading(false)
      return
    }

    const openCustomerPortal = async () => {
      const result = await fetch('/.netlify/functions/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customer_id,
          email: state.shippingInfo.email,
          return_url: 'https://munchmunch.com.au/',
        }),
      }).then((res) => res.json())
      const { redirect } = result
      return redirect
    }

    if (status === 'requires_action') {
      stripe.confirmCardPayment(client_secret).then(async function (result) {
        if (result.error) {
          console.error('Error: ', result.error.message)
          setErrorText(result.error.message)
          setLoading(false)
          return
        } else {
          console.log('Success!')
          let url = await openCustomerPortal()
          showSuccessScreen(url)
          return
        }
      })
    } else {
      console.log('Success!')
      let url = await openCustomerPortal()
      showSuccessScreen(url)
      return
    }
  }

  const paymentInfo = [
    {
      text: 'Subtotal',
      value: `$${finalPrice.subtotal}`,
    },
    // {
    //   text: 'Pet Food Tax (10%) (Included)',
    //   value: `$${finalPrice.tax}`,
    // },
    {
      text: 'Trial Discount (50% off)',
      value: `- $${finalPrice.trialDiscount}`,
    },
    {
      text: 'Shipping',
      value: 'FREE',
    },
    {
      text: 'First Month',
      value: `= $${finalPrice.discountTotal}`,
    },
    {
      text: 'Subsequent Months',
      value: `= $${finalPrice.total}`,
    },
  ]

  const changePortionSizeHandler = (e) => {
    dispatch(ChangePortionSize(e.target.value))
  }

  const options = {
    paymentRequest,
    style: {
      paymentRequestButton: {
        height: '40px',
      },
    },
  }

  return (
    <Layout percent={state.progressInPercent}>
      <form onSubmit={handleSubmitSub}>
        <Fade in={true} timeout={500}>
          <Box component='div'>
            <Fade in={true} timeout={500}>
              <Box component='div'>
                <RadioGroup
                  required
                  name='radio-buttons-group'
                  value={state.portionSize}
                  onChange={(e) => changePortionSizeHandler(e)}
                  sx={{
                    paddingBottom: '20px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexWrap: 1 }}>
                    <FormControlLabel
                      value='half'
                      label='Half Portions'
                      labelPlacement='end'
                      control={
                        <Radio
                          checked={state.portionSize === 'half'}
                          sx={{
                            color: '#000',
                            '& .MuiSvgIcon-root': {
                              width: '36px',
                              height: '36px',
                            },
                            '&.Mui-checked': { color: '#FE654F' }, //#E6A65D
                            '&:hover': { color: '#FE654F' },
                          }}
                        />
                      }
                      sx={{
                        marginRight: '60px',
                        '& .MuiTypography-root': {
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          fontSize: {
                            xs: '18px',
                            xl: '24px',
                          },
                          lineHeight: {
                            xs: '22px',
                            xl: '30px',
                          },
                          fontWeight: state.portionSize === 'half' ? '600' : '400',
                          color: state.portionSize === 'half' ? '#FE654F' : '#000',
                        },
                      }}
                    />
                    <FormControlLabel
                      value='full'
                      label='Full Portions (save 17%)'
                      labelPlacement='end'
                      control={
                        <Radio
                          checked={state.portionSize === 'full'}
                          sx={{
                            color: '#000',
                            '& .MuiSvgIcon-root': {
                              width: '36px',
                              height: '36px',
                            },
                            '&.Mui-checked': { color: '#FE654F' }, //#E6A65D
                            '&:hover': { color: '#FE654F' },
                          }}
                        />
                      }
                      sx={{
                        '& .MuiTypography-root': {
                          fontFamily: 'system-ui, -apple-system, sans-serif',
                          fontSize: {
                            xs: '18px',
                            xl: '24px',
                          },
                          lineHeight: {
                            xs: '22px',
                            xl: '30px',
                          },
                          fontWeight: state.portionSize === 'full' ? '600' : '400',
                          color: state.portionSize === 'full' ? '#FE654F' : '#000',
                        },
                      }}
                    />
                  </Box>
                </RadioGroup>
              </Box>
            </Fade>
            {priceCalculated ?
              paymentInfo.map((item, idx) => (
                <React.Fragment key={idx}>
                  <Fade in={priceCalculated} timeout={500} style={{ transitionDelay: idx * 100 }}>
                    <Box
                      component='div'
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '10px 0 8px',
                      }}
                    >
                      <Typography
                        component='p'
                        variant='subtitle2'
                        sx={{ ...stylesText }}
                      >
                        {item.text}
                      </Typography>
                      <Typography
                        component='p'
                        variant='subtitle2'
                        sx={{ ...stylesText }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Fade>
                  <Fade in={priceCalculated} timeout={500} style={{ transitionDelay: (idx * 100) }}>
                    <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.3)' }} />
                  </Fade>
                </React.Fragment>
              )) :
              <Box
                component='div'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '200px'
                }}
              >
                <CircularProgress color='mm_orange' />
              </Box>
            }
            {paymentRequest && <PaymentRequestButtonElement options={options} />}
            <Box
              component='div'
              sx={{
                backgroundColor: '#fff',
                border: '1px solid transparent',
                borderRadius: '4px',
                marginTop: paymentRequest ? '30px' : '10px'
              }}
            >
              <CardInput required />
            </Box>
            {errorText &&
              <Box
                component='div'
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginTop: '5px'
                }}
              >
                <ErrorOutlineIcon sx={{ color: '#F64740', width: 20, height: 20 }} />
                &nbsp;
                <Typography
                  sx={{
                    color: '#F64740',
                    fontSize: '11'
                  }}
                >
                  <strong>Error:</strong> {errorText}
                </Typography>
              </Box>}
            <Divider
              sx={{ borderColor: 'rgba(0, 0, 0, 0.3)', margin: '10px 0' }}
            />
            <Fade in={true} timeout={500}>
              <Box
                component='div'
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '10px',
                }}
              >
                <Link to='/shipping-info'>
                  <Box
                    component='div'
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      opacity: '0.8',
                      transition: 'opacity 0.3s ease-in',
                      '&:hover': {
                        opacity: '1.0',
                        transition: 'opacity 0.3s ease-in',
                      },
                    }}
                  >
                    <KeyboardBackspaceSharpIcon sx={{ color: '#3d3935' }} />
                    <Typography
                      component='p'
                      sx={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        fontSize: {
                          xs: '18px',
                          xl: '24px',
                        },
                        lineHeight: {
                          xs: '22px',
                          xl: '28px',
                        },
                        fontWeight: 500,
                        color: '#3d3935',
                        marginLeft: '2px',
                      }}
                    >
                      Back
                    </Typography>
                  </Box>
                </Link>
                <LoadingButton
                  loading={loading}
                  variant='contained'
                  type='submit'
                  sx={{
                    // padding: {
                    //   xs: '8px',
                    //   sm: '8px 25px',
                    // },
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: '18px',
                    lineHeight: '22px',
                    fontWeight: '400',
                    ':hover': {
                      backgroundColor: 'rgba(254,101,79, 1.0)',
                    },
                    width: {
                      xs: '200px',
                      sm: 'auto',
                    },
                    height: {
                      xs: 'auto',
                      sm: '38px',
                    },
                    padding: '0px',
                    borderRadius: '33px',
                    backgroundColor: 'transparent',
                    border: '0px',
                    boxShadow: 'none',
                    ':hover': {
                      backgroundColor: 'transparent',
                      border: '0px',
                      boxShadow: 'none',
                    },
                    fontWeight: 'bold'
                  }}
                >
                  <StyledHeading1>Order Now for {state.dogName}</StyledHeading1>
                </LoadingButton>
              </Box>
            </Fade>
          </Box>
        </Fade>
      </form>
    </Layout>
  )
}
export default Checkout
