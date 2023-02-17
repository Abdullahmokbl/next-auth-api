import { buffer } from 'micro'
import connectDB from '../backend/mongodb'
import Order from '../backend/order'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export const config = {
  api: {
    bodyParser: false,
  },
}

const createOrder = async (customer, data) => {
  const cart = JSON.parse(customer.metadata.cart)
  console.log(cart)

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: cart,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    shipping: data.customer_details,
    payment_status: data.payment_status,
  })

  newOrder
    .save()
    .then(order => {
      console.log(order)
      // send email to user
    })
    .catch(e => console.log(e))
}

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']

    let data
    // let eventType

    // if (endpointSecret) {
    let event

    try {
      // console.log(req.body)
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret)
      data = event.data.object
      console.log('webhook verified..')
    } catch (err) {
      console.log('webhook errorrrrrr ' + err.message)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    // data = event.data.object
    //   eventType = event.type
    // } else {
    //   data = req.body.data.object
    //   eventType = req.body.type
    // }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      try {
        const customer = await stripe.customers.retrieve(data.customer)
        createOrder(customer, data)
      } catch (e) {
        console.log(e)
      }
      // stripe.customers
      //   .retrive(data.customer)
      //   .then(customer => {
      //     console.log(customer)
      //     console.log('data:', data)
      //   })
      //   .catch(err => console.log(err.message))
    }
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
    res.send()
    // res.send().end()
    // });
  }
}

export default connectDB(handler)
