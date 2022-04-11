import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Divider,
  Fade,
  Box,
} from '@mui/material';
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

  const stylesText = {
    fontFamily: 'Bubblegum Sans',
    fontSize: '18px',
    lineHeight: '22px',
  };

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
    <Layout>
      <form onSubmit={handleSubmitSub}>
        <Fade in={true} timeout={500}>
          <Box component='div'>
            {
              paymentInfo.map((item, idx) => (
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
              ))
            }
            
            {paymentRequest && (
              <PaymentRequestButtonElement options={options} />
            )}
            <Typography variant='h6' sx={{
              fontFamily: 'Bubblegum Sans',
              fontSize: '24px',
              lineHeight: '30px',
              marginTop: '25px',
              textTransform: 'uppercase'
            }}>
              Billing Information
            </Typography>
            <TextField
              id='full-name'
              label='Full Name'
              // placeholder='John Doe'
              // margin='normal'
              // variant="standard"
              type='text'
              required
              fullWidth
              value={clientInfo.name}
              onChange={(e) =>
                setClientInfo((val) => ({ ...val, name: e.target.value }))
              }
              
            />
            <TextField
              label='Email'
              placeholder='john.doe@example.com'
              margin='normal'
              variant='outlined'
              type='email'
              required
              value={clientInfo.email}
              onChange={(e) =>
                setClientInfo((val) => ({ ...val, email: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label='Address'
              placeholder='185 Berry St. Suite 550'
              margin='normal'
              variant='outlined'
              type='text'
              required
              value={clientInfo.billing?.line1}
              onChange={(e) =>
                setClientInfo((val) => ({
                  ...val,
                  billing: { ...clientInfo.billing, line1: e.target.value },
                }))
              }
              fullWidth
            />
            <TextField
              label='City'
              placeholder='San Francisco'
              margin='normal'
              variant='outlined'
              type='text'
              required
              value={clientInfo.billing?.city}
              onChange={(e) =>
                setClientInfo((val) => ({
                  ...val,
                  billing: { ...clientInfo.billing, city: e.target.value },
                }))
              }
              fullWidth
            />
            <TextField
              label='State'
              placeholder='California'
              margin='normal'
              variant='outlined'
              type='text'
              required
              value={clientInfo.billing?.state}
              onChange={(e) =>
                setClientInfo((val) => ({
                  ...val,
                  billing: { ...clientInfo.billing, state: e.target.value },
                }))
              }
              fullWidth
            />
            <TextField
              label='ZIP Code'
              placeholder='94103'
              margin='normal'
              variant='outlined'
              type='number'
              required
              value={clientInfo.billing?.postal_code}
              onChange={(e) =>
                setClientInfo((val) => ({
                  ...val,
                  billing: {
                    ...clientInfo.billing,
                    postal_code: e.target.value,
                  },
                }))
              }
              fullWidth
            />
            <CardInput required />
            <Typography variant='subtitle1'>Shipping Address</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={clientInfo.shippingAndBillingSame}
                  onChange={(e) =>
                    setClientInfo((val) => ({
                      ...val,
                      shippingAndBillingSame: e.target.checked,
                    }))
                  }
                />
              }
              label='Same as Billing Address'
            />
            {!clientInfo.shippingAndBillingSame && (
              <div className='animate__fade-in'>
                <TextField
                  label='Address'
                  placeholder='185 Berry St. Suite 550'
                  margin='normal'
                  variant='outlined'
                  type='text'
                  required
                  value={clientInfo.shipping?.line1}
                  onChange={(e) =>
                    setClientInfo((val) => ({
                      ...val,
                      shipping: {
                        ...clientInfo.shipping,
                        line1: e.target.value,
                      },
                    }))
                  }
                  fullWidth
                />
                <TextField
                  label='City'
                  placeholder='San Francisco'
                  margin='normal'
                  variant='outlined'
                  type='text'
                  required
                  value={clientInfo.shipping?.city}
                  onChange={(e) =>
                    setClientInfo((val) => ({
                      ...val,
                      shipping: {
                        ...clientInfo.shipping,
                        city: e.target.value,
                      },
                    }))
                  }
                  fullWidth
                />
                <TextField
                  label='State'
                  placeholder='California'
                  margin='normal'
                  variant='outlined'
                  type='text'
                  required
                  value={clientInfo.shipping?.state}
                  onChange={(e) =>
                    setClientInfo((val) => ({
                      ...val,
                      shipping: {
                        ...clientInfo.shipping,
                        state: e.target.value,
                      },
                    }))
                  }
                  fullWidth
                />
                <TextField
                  label='ZIP Code'
                  placeholder='94103'
                  margin='normal'
                  variant='outlined'
                  type='number'
                  required
                  value={clientInfo.shipping?.postal_code}
                  onChange={(e) =>
                    setClientInfo((val) => ({
                      ...val,
                      shipping: {
                        ...clientInfo.shipping,
                        postal_code: e.target.value,
                      },
                    }))
                  }
                  fullWidth
                />
              </div>
            )}
            <Divider />
            <Button
              variant='contained'
              color='primary'
              // style={classes.button}
              type='submit'
            >
              Order Now for {state.dogName}
            </Button>
          </Box>
        </Fade>
        {/* </div> */})
      </form>
      <div className='animate__fade-in'>
        <Link className='form_back' to='/target-weight'>
          Back
        </Link>
      </div>
    </Layout>
  );
};
export default Checkout;
