// import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import AsyncButton from './AsyncButton'

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Checkout({ cart, userId }) {
  const router = useRouter()
  const [disabled, setDisabled] = useState()
  const handleCheckout = async () => {
    try {
      if (!userId) router.push('/login')
      setDisabled(true)
      // const stripe = await stripePromise
      // const checkoutSession = await axios.post('/api/stripe/checkout-session', {
      //   cart,
      // })
      // const result = await stripe.redirectToCheckout({
      //   sessionId: checkoutSession.data.id,
      // })
      // if (result.error) {
      //   alert(result.error.message)
      // }
      const res = await axios.post('/api/stripe/checkout-session', {
        cart,
        userId,
      })
      const body = await res.data
      window.location.href = body.url
    } catch (error) {
      console.log(error)
      setDisabled(false)
    }
  }
  return (
    <div onClick={handleCheckout}>
      <AsyncButton title="checkout" disabled={disabled} />
    </div>
  )
}
