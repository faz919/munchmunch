import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AppStateProvider } from './context'
import { theme } from './theme'
// Stripe
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`)

ReactDOM.render(
  <>
    <CssBaseline />
    <AppStateProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </ThemeProvider>
      </BrowserRouter>
    </AppStateProvider>
  </>,
  document.getElementById('root')
)
