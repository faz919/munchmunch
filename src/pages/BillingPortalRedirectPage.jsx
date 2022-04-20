import React, { useEffect } from 'react'

const BillingPortalRedirectPage = () => {

    let email = prompt('Please enter your email.')

    const openCustomerPortal = async () => {
        const result = await fetch(
            '/.netlify/functions/customer-portal',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    return_url: 'https://munchmunch.com.au/',
                }),
            }
        ).then((res) => res.json())
        const { res } = result
        console.log(res)
    }

    useEffect(() => {
        if (email != null) {
            openCustomerPortal()
        }
    }, [email])

    return null
}

export default BillingPortalRedirectPage