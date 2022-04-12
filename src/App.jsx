import React from 'react';
import './index.scss';
import { Routes, Route } from 'react-router-dom';
// Stripe
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './pages/Home';
import PetName from './pages/PetName';
import WeightAndAge from './pages/WeightAndAge';
import TargetWeight from './pages/TargetWeight';
import Checkout from './pages/Checkout';

const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='dog-name' element={<PetName />} />
        <Route path='dog-weight-and-age' element={<WeightAndAge />} />
        <Route path='dog-weight-required' element={<TargetWeight />} />
        <Route path='checkout' element={<Checkout />} />
      </Routes>
    </Elements>
  );
}

export default App;
