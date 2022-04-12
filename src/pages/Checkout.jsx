import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Fade,
  Box,
  Collapse,
} from '@mui/material';
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';
import {
  PaymentRequestButtonElement,
  useStripe,
  useElements,
  CardElement,
} from '@stripe/react-stripe-js';
import Layout from '../components/Layout';
import { useAppState } from '../context';
import CardInput from '../components/CardInput';
import calculatePrice from '../formulae/formula';
import { AddPercent } from '../context/appStateActions';
import FormInputElement from '../components/FormInputElem';

const Checkout = () => {
  const { state, dispatch } = useAppState();
  const [metadata, setMetadata] = useState({});
  const [clientInfo, setClientInfo] = useState({
    shippingAndBillingSame: true,
  });
  const [finalPrice, setFinalPrice] = useState({ subtotal: (0).toFixed(2) });
  const [paymentRequest, setPaymentRequest] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const dataFromState = {
    dogName: state.dogName,
    gender: state.gender,
    weight: state.weight,
    age_years: state.age_years,
    age_months: state.age_months,
    weightType: state.weightType,
    targetWeight: state.targetWeight,
    meatTypes: state.meatTypes,
  };

  const stylesText = {
    fontFamily: 'Bubblegum Sans',
    fontSize: '18px',
    lineHeight: '22px',
  };

  useEffect(() => {
    dispatch(AddPercent(100));
  }, []);

  useEffect(() => {
    finalPrice.subtotal &&
      setFinalPrice((val) => ({
        ...val,
        tax: (finalPrice.subtotal / 10).toFixed(2),
        total: (finalPrice.subtotal * 1.1).toFixed(2),
      }));
  }, [finalPrice.subtotal]);

  useEffect(() => {
    const {
      subtotal,
      dailyKCalRequirement,
      orderWeight,
      kgsPerMeatType,
      orderKCalRequirement,
    } = calculatePrice(state);

    setFinalPrice((val) => ({ ...val, subtotal }));
    setMetadata((val) => ({
      ...val,
      dailyKCalRequirement,
      orderWeight,
      kgsPerMeatType,
      orderKCalRequirement,
    }));
  }, [state]);

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'AU',
      currency: 'aud',
      total: {
        label: 'MunchMunch Subscription Total',
        amount: 51,
        pending: true,
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestShipping: true,
      shippingOptions: [
        {
          id: 'basic',
          label: 'Ground shipping',
          detail: 'Ground shipping via UPS or FedEx',
          amount: 0,
        },
      ],
    });
    // Check the availability of the Payment Request API first.
    pr.canMakePayment().then((result) => {
      if (result) {
        setPaymentRequest(pr);
      }
    });

    const handlePaymentMethodReceived = async (event) => {
      console.log('event is: ', event);
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
      };
      const response = await fetch('/.netlify/functions/third-party-pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentDetails }),
      }).then((res) => {
        return res.json();
      });
      const { setupIntent } = response;
      console.log('response is: ', response);
      console.log('payment intent is: ', setupIntent);
      if (response.error) {
        // Report to the browser that the payment failed.
        console.log(response.error);
        event.complete('fail');
      } else {
        if (response.setupIntent.status === 'requires_confirmation') {
          stripe
            .confirmCardSetup(response.setupIntent.client_secret)
            .then(async function (result) {
              if (result.error) {
                console.log('Error: ', result.error.message);
              } else {
                const res = await fetch('/.netlify/functions/subscribe', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    payment_method: response.setupIntent.payment_method,
                    name: event.payerName,
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
                      name: event.shippingAddress.recipient,
                      phone: event.shippingAddress.phone,
                      address: {
                        line1: event.shippingAddress.addressLine[0],
                        city: event.shippingAddress.city,
                        postal_code: event.shippingAddress.postalCode,
                        state: event.shippingAddress.region,
                        country: event.shippingAddress.country,
                      },
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
                      meatTypes: state.meatTypes,
                    },
                    extra_metadata: metadata,
                  }),
                }).then((res) => res.json());

                const { client_secret, customer_id } = res;

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
                        return_url: 'https://munchmunch.com.au/',
                      }),
                    }
                  ).then((res) => res.json());
                  const { redirect } = result;
                  window.location.assign(redirect);
                };
                if (customer_id) {
                  console.log('Success!');
                  openCustomerPortal();
                  event.complete('success');
                }
              }
            });
        } else {
          console.log('no confirmation needed');
        }
      }
    };

    pr.on('paymentmethod', handlePaymentMethodReceived);

    finalPrice.total > 0 &&
      pr.update({
        total: {
          label: 'MunchMunch Subscription Total',
          amount: Math.round(finalPrice.total * 100),
          pending: false,
        },
      });
  }, [stripe, finalPrice.total]);

  const handleSubmitSub = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name: clientInfo.name,
        email: clientInfo.email,
        address: clientInfo.billing,
      },
    });

    if (result.error) {
      console.log('Error while processing payment method: ', result.error);
    }

    const res = await fetch('/.netlify/functions/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method: result.paymentMethod.id,
        name: clientInfo.name,
        email: clientInfo.email,
        billing_address: clientInfo.billing,
        shipping_address: clientInfo.shippingAndBillingSame
          ? clientInfo.billing
          : clientInfo.shipping,
        unit_amount: finalPrice.total,
      }),
    }).then((res) => res.json());

    const { client_secret, status, customer_id } = res;

    const openCustomerPortal = async () => {
      const result = await fetch('/.netlify/functions/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: customer_id,
          return_url: 'https://munchmunch.com.au/',
        }),
      }).then((res) => res.json());
      const { redirect } = result;
      window.location.assign(redirect);
    };

    if (status === 'requires_action') {
      stripe.confirmCardPayment(client_secret).then(function (result) {
        if (result.error) {
          console.log('Error: ', result.error.message);
        } else {
          console.log('Success!');
          openCustomerPortal();
        }
      });
    } else {
      console.log('Success!');
      openCustomerPortal();
    }
  };

  const options = {
    paymentRequest,
    style: {
      paymentRequestButton: {
        height: '40px',
      },
    },
  };

  const paymentInfo = [
    {
      text: 'Subtotal',
      value: `$${finalPrice.subtotal}`,
    },
    {
      text: '10% Food Tax',
      value: `+ $${finalPrice.tax}`,
    },
    {
      text: 'Shipping',
      value: 'FREE',
    },
    {
      text: 'Total',
      value: `= $${finalPrice.total}`,
    },
  ];

  return (
    <Layout percent={state.progressInPercent}>
      <form onSubmit={handleSubmitSub}>
        <Fade in={true} timeout={500}>
          <Box component='div'>
            {paymentInfo.map((item, idx) => (
              <React.Fragment key={idx}>
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
                <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.3)' }} />
              </React.Fragment>
            ))}

            {paymentRequest && (
              <PaymentRequestButtonElement options={options} />
            )}
            <Typography
              variant='h6'
              sx={{
                fontFamily: 'Bubblegum Sans',
                fontSize: '24px',
                lineHeight: '30px',
                marginTop: '25px',
                textTransform: 'uppercase',
              }}
            >
              Billing Information
            </Typography>

            <FormInputElement
              type='text'
              label='Full Name'
              value={clientInfo.name}
              callback={(e) =>
                setClientInfo((val) => ({ ...val, name: e.target.value }))
              }
            />
            <FormInputElement
              type='email'
              label='Email'
              value={clientInfo.email}
              callback={(e) => (e) =>
                setClientInfo((val) => ({ ...val, email: e.target.value }))}
            />
            <FormInputElement
              type='text'
              label='Address'
              value={clientInfo.billing?.line1}
              callback={(e) =>
                setClientInfo((val) => ({
                  ...val,
                  billing: { ...clientInfo.billing, line1: e.target.value },
                }))
              }
            />
            <FormInputElement
              type='text'
              label='City'
              value={clientInfo.billing?.city}
              callback={(e) =>
                setClientInfo((val) => ({
                  ...val,
                  billing: { ...clientInfo.billing, city: e.target.value },
                }))
              }
            />
            <FormInputElement
              type='text'
              label='State'
              value={clientInfo.billing?.state}
              callback={(e) =>
                setClientInfo((val) => ({
                  ...val,
                  billing: { ...clientInfo.billing, state: e.target.value },
                }))
              }
            />
            <FormInputElement
              type='number'
              label='ZIP Code'
              value={clientInfo.billing?.postal_code}
              callback={(e) =>
                setClientInfo((val) => ({
                  ...val,
                  billing: {
                    ...clientInfo.billing,
                    postal_code: e.target.value,
                  },
                }))
              }
            />
            <Box
              component='div'
              sx={{
                backgroundColor: '#fff',
                border: '1px solid transparent',
                borderRadius: '4px',
              }}
            >
              <CardInput required />
            </Box>

            <Typography
              variant='subtitle1'
              sx={{
                fontFamily: 'Bubblegum Sans',
                fontSize: '24px',
                lineHeight: '30px',
                marginTop: '20px',
                textTransform: 'uppercase',
              }}
            >
              Shipping Address
            </Typography>

            <FormControlLabel
              label='Same as Billing Address'
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: 'Bubblegum Sans',
                  fontSize: '18px',
                  lineHeight: '22px',
                  textTransform: 'lowercase',
                },
              }}
              control={
                <Checkbox
                  checked={clientInfo.shippingAndBillingSame}
                  onChange={(e) =>
                    setClientInfo((val) => ({
                      ...val,
                      shippingAndBillingSame: e.target.checked,
                    }))
                  }
                  sx={{
                    'input[type="checkbox"]': {
                      opacity: '1',
                      position: 'relative',
                      zIndex: '0',
                      width: '25px',
                      height: '25px',
                    },
                    '.MuiSvgIcon-root': {
                      display: 'none',
                    },
                  }}
                />
              }
            />

            <Collapse in={!clientInfo.shippingAndBillingSame} timeout={500}>
              <Box component='div'>
                <FormInputElement
                  type='text'
                  label='Address'
                  value={clientInfo.shipping?.line1}
                  callback={(e) =>
                    setClientInfo((val) => ({
                      ...val,
                      shipping: {
                        ...clientInfo.shipping,
                        line1: e.target.value,
                      },
                    }))
                  }
                />
                <FormInputElement
                  type='text'
                  label='City'
                  value={clientInfo.shipping?.city}
                  callback={(e) =>
                    setClientInfo((val) => ({
                      ...val,
                      shipping: {
                        ...clientInfo.shipping,
                        city: e.target.value,
                      },
                    }))
                  }
                />
                <FormInputElement
                  type='text'
                  label='State'
                  value={clientInfo.shipping?.state}
                  callback={(e) =>
                    setClientInfo((val) => ({
                      ...val,
                      shipping: {
                        ...clientInfo.shipping,
                        state: e.target.value,
                      },
                    }))
                  }
                />
                <FormInputElement
                  type='number'
                  label='ZIP Code'
                  value={clientInfo.shipping?.postal_code}
                  callback={(e) =>
                    setClientInfo((val) => ({
                      ...val,
                      shipping: {
                        ...clientInfo.shipping,
                        postal_code: e.target.value,
                      },
                    }))
                  }
                />
              </Box>
            </Collapse>

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
                }}
              >
                <Link to='/dog-weight-required'>
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
                    <KeyboardBackspaceSharpIcon sx={{ color: '#F64740' }} />
                    <Typography
                      component='p'
                      sx={{
                        fontFamily: 'Bubblegum Sans',
                        fontSize: '18px',
                        lineHeight: '22px',
                        fontWeight: 500,
                        color: '#F64740',
                        marginLeft: '2px',
                      }}
                    >
                      Back
                    </Typography>
                  </Box>
                </Link>
                <Button
                  variant='contained'
                  type='submit'
                  sx={{
                    padding: '8px 25px',
                    backgroundColor: 'rgba(9, 188, 138, 0.7)',
                    // textTransform: 'none',
                    fontFamily: 'Bubblegum Sans',
                    fontSize: '18px',
                    lineHeight: '22px',
                    fontWeight: '400',

                    ':hover': {
                      backgroundColor: 'rgba(9, 188, 138, 1.0)',
                    },
                  }}
                >
                  Order Now for {state.dogName}
                </Button>
              </Box>
            </Fade>
          </Box>
        </Fade>
      </form>
    </Layout>
  );
};
export default Checkout;
