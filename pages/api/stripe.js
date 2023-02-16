const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = 'whsec_967e2351db40b9c1b16c31fd28e305d5f1a26b0ef5483503f2f38054e049f15e'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const sig = req.headers['stripe-signature']

    let event

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
      console.log('webhook verified..')
    } catch (err) {
      console.log('webhook errorrrrrr ' + err.message)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    // Handle the event
    // switch (event.type) {
    //   case 'payment_intent.succeeded':
    //     const paymentIntentSucceeded = event.data.object
    //     // Then define and call a function to handle the event payment_intent.succeeded
    //     break
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`)
    // }

    // Return a 200 response to acknowledge receipt of the event
    // res.send()
    res.send().end()
    // });
  }
}
