import React from 'react'
// Components
import HomePage from './components/HomePage'
// Stripe
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
// Styles
import './index.scss'
import './App.css'

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`)

function App() {
  return (
    <Elements stripe={stripePromise}>
      <HomePage />
    </Elements>
  )
}

export default App
