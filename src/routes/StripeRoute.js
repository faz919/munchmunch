import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`)

const StripeRoute = ({ children }) => {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    )
}

export default StripeRoute