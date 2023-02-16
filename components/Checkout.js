// import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function Checkout({ cart }) {
  const handleCheckout = async () => {
    try {
      // const stripe = await stripePromise
      // const checkoutSession = await axios.post('/api/checkout-session', {
      //   cart,
      // })
      // const result = await stripe.redirectToCheckout({
      //   sessionId: checkoutSession.data.id,
      // })
      // if (result.error) {
      //   alert(result.error.message)
      // }
      const res = await axios.post('/api/checkout-session', {
        cart,
      })
      const body = await res.data
      window.location.href = body.url
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button style={{ padding: '1em', cursor: 'pointer' }} onClick={handleCheckout}>
      Checkout
    </button>
  )
}
