import React, { useEffect } from 'react'
import './index.scss'
import { Routes, Route } from 'react-router-dom'
import SuccessRoute from './routes/SuccessRoute'

import Home from './pages/Home'
import PetName from './pages/PetName'
import WeightAndAge from './pages/WeightAndAge'
import TargetWeight from './pages/TargetWeight'
import Checkout from './pages/Checkout'
import MeatTypes from './pages/MeatTypes'
import ShippingInfo from './pages/ShippingInfo'
import HealthProblems from './pages/HealthProblems'
import Success from './pages/Success'
import { useAppState } from './context'

function App() {

  const { state } = useAppState()

  console.log('hello')

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='dog-name' element={<PetName />} />
      <Route path='dog-weight-and-age' element={<WeightAndAge />} />
      <Route path='dog-weight-required' element={<TargetWeight />} />
      <Route path='health-problems' element={<HealthProblems />} />
      <Route path='meat-types' element={<MeatTypes />} />
      <Route path='shipping-info' element={<ShippingInfo />} />
      <Route path='checkout' element={<Checkout />} />
      <Route path='success' element={<SuccessRoute>
        <Success />
      </SuccessRoute>} />
    </Routes>
  )
}

export default App
