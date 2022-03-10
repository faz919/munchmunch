import React from 'react';
// Components
import HomePage from './components/HomePage';
// Stripe
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
// Styles
import './index.scss';
import './App.css'

const stripePromise = loadStripe('pk_test_51KYsBGD7lOuiuDEB5ig73NxDsBtnKmH4tWDKulPcsIc2Qs2Lymk2GuqBjncI41IzSBzuNIsvhMqolfh0qCISX1B200Knp6fjm5');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <HomePage />
    </Elements>
  );
}

export default App;
