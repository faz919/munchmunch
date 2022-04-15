import React from "react"
import { Navigate } from "react-router-dom"
import { useAppState } from "../context"

export default function SuccessRoute({ children }) {
  const { state } = useAppState()

  return state.success ? children : <Navigate to='/' />
}