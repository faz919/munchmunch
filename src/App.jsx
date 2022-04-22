import React, { useEffect, useState } from 'react'
import './index.scss'
import { Routes, Route, NavigationType, Navigate } from 'react-router-dom'
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
import FormRoute from './routes/FormRoute'
import { useAppState } from './context'
import { SetState } from './context/appStateActions'
import BillingPortalRedirectPage from './pages/BillingPortalRedirectPage'
// import Home from './pages/Home'

function App() {

  const { state, dispatch } = useAppState()
  const [initialLocalStorageRetrieval, syncedLocalStorage] = useState(false)

  useEffect(() => {
    const formResponses = window.localStorage.getItem('form_responses')
    if (formResponses != null) {
      let checkedFormResponses = JSON.parse(formResponses)
      if (!checkedFormResponses.success) {
        dispatch(SetState(checkedFormResponses))
      } else {
        dispatch(SetState('default'))
      }
    } else {
      dispatch(SetState('default'))
    }
    syncedLocalStorage(true)
  }, [])

  useEffect(() => {
    initialLocalStorageRetrieval && window.localStorage.setItem('form_responses', JSON.stringify(state))
    initialLocalStorageRetrieval && window.localStorage.setItem('form_percent', JSON.stringify(state.progressInPercent))
  }, [state])

  return (
    <Routes>
      <Route path='/' element={<FormRoute>
        <Home />
      </FormRoute>} />
      <Route path='dog-name' element={<FormRoute>
        <PetName />
      </FormRoute>} />
      <Route path='dog-weight-and-age' element={<FormRoute>
        <WeightAndAge />
      </FormRoute>} />
      <Route path='dog-weight-required' element={<FormRoute>
        <TargetWeight />
      </FormRoute>} />
      <Route path='health-problems' element={<FormRoute>
        <HealthProblems />
      </FormRoute>} />
      <Route path='meat-types' element={<FormRoute>
        <MeatTypes />
      </FormRoute>} />
      <Route path='shipping-info' element={<FormRoute>
        <ShippingInfo />
      </FormRoute>} />
      <Route path='checkout' element={<FormRoute>
        <Checkout />
      </FormRoute>} />
      <Route path='success' element={<SuccessRoute>
        <Success />
      </SuccessRoute>} />
      {/* <Route path='/billing-portal-redirect' element={<BillingPortalRedirectPage />} /> */}
    </Routes>
  )
}

export default App
