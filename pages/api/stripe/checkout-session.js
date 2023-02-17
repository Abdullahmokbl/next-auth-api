const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, cart } = req.body
    console.log(cart)
    console.log(JSON.stringify(...cart))
    console.log(JSON.stringify(cart))

    const customer = await stripe.customers.create({
      description: 'My First Test Customer (created for API docs at https://www.stripe.com/docs/api)',
      metadata: {
        userId,
        cart: JSON.stringify(...cart),
      },
    })

    const line_items = cart.map(item => {
      const { _id, name, img, info, price, qty } = item
      return {
        price_data: {
          currency: 'egp',
          product_data: {
            name,
            images: [img.url],
            description: info,
            metadata: {
              id: _id,
            },
          },
          unit_amount: price * 100,
        },
        quantity: qty,
      }
    })
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        // shipping_address_collection: { allowed_countries: ['SA', 'EG'] },
        // shipping_options: [
        //   {
        //     shipping_rate_data: {
        //       type: 'fixed_amount',
        //       fixed_amount: { amount: 0, currency: 'egp' },
        //       display_name: 'Free shipping',
        //       delivery_estimate: {
        //         minimum: { unit: 'business_day', value: 5 },
        //         maximum: { unit: 'business_day', value: 7 },
        //       },
        //     },
        //   },
        //   {
        //     shipping_rate_data: {
        //       type: 'fixed_amount',
        //       fixed_amount: { amount: 20, currency: 'egp' },
        //       display_name: 'Next day air',
        //       delivery_estimate: {
        //         minimum: { unit: 'business_day', value: 1 },
        //         maximum: { unit: 'business_day', value: 1 },
        //       },
        //     },
        //   },
        // ],
        line_items,
        customer: customer.id,
        mode: 'payment',
        success_url: `${req.headers.origin}/checkout_success`,
        cancel_url: `${req.headers.origin}/cart`,
      })
      res.json({ url: session.url })
    } catch (e) {
      return res.status(e.statusCode || 500).json(e.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
