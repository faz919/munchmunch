import React from 'react'
import './index.scss'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import PetName from './pages/PetName'
import WeightAndAge from './pages/WeightAndAge'
import TargetWeight from './pages/TargetWeight'
import Checkout from './pages/Checkout'
import MeatTypes from './pages/MeatTypes'
import ShippingInfo from './pages/ShippingInfo'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='dog-name' element={<PetName />} />
        <Route path='dog-weight-and-age' element={<WeightAndAge />} />
        <Route path='dog-weight-required' element={<TargetWeight />} />
        <Route path='meat-types' element={<MeatTypes />} />
        <Route path='shipping-info' element={<ShippingInfo />} />
        <Route path='checkout' element={<Checkout />} />
      </Routes>
  )
}

export default App
