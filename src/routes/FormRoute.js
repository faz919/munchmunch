import React from "react"
import { Navigate } from "react-router-dom"
import { useAppState } from "../context"
import { LogRedirect } from "../context/appStateActions"

export default function FormRoute({ children }) {
    const { state, dispatch } = useAppState()
    const formResponses = window.localStorage.getItem('form_responses')
    const formPercent = window.localStorage.getItem('form_percent')
    console.log(formPercent)
    let correctPage = '/'
    if (formResponses != null && formPercent != null) {
        switch (parseInt(formPercent)) {
            case 0:
                correctPage = '/dog-name'
                break
            case 16:
                correctPage = '/dog-weight-and-age'
                break
            case 33:
                correctPage = '/dog-weight-required'
                break
            case 50:
                correctPage = '/health-problems'
                break
            case 67:
                correctPage = '/meat-types'
                break
            case 83:
                correctPage = '/shipping-info'
                break
            case 100:
                correctPage = '/checkout'
                break
            default:
                correctPage = '/'
                break
        }
    } else {
        correctPage = '/'
    }

    const LogThenRedirect = () => {
        dispatch(LogRedirect(true))
        return <Navigate to={correctPage} />
    }

    console.log(state.redirected)

    return state.redirected ? children : LogThenRedirect()
}