import { buffer } from 'micro'
import connectDB from '../database/mongodb'
import Order from '../models/order'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export const config = {
  api: {
    bodyParser: false,
  },
}

const createOrder = async (customer, data) => {
  const products = JSON.parse(customer.metadata.products)

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products,
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
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']

    let data
    let event

    try {
      event = stripe.webhooks.constructEvent(buf, sig, endpointSecret)
      data = event.data.object
      console.log('webhook verified..')
    } catch (err) {
      console.log('webhook errorrrrrr ' + err.message)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      try {
        const customer = await stripe.customers.retrieve(data.customer)
        createOrder(customer, data)
      } catch (e) {
        console.log(e)
      }
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send()
  }
}

export default connectDB(handler)
