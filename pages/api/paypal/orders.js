import connectDB from '../database/mongodb'

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env
const base = 'https://api-m.sandbox.paypal.com'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    console.log('get')
    return
  } else if (req.method === 'POST') {
    // create a new order
    console.log('post')
    const order = await createOrder()
    return res.status(200).json(order)
  } else if (req.method === 'POST' && req.query.orderID) {
    // capture payment & store order information or fullfill order
    const orderID = req.query
    const captureData = await capturePayment(orderID)
    // TODO: store payment information such as the transaction ID
    return res.status(200).json(captureData)
  }
}

export default connectDB(handler)

// PayPal API helpers

//////////////////////

// use the orders api to create an order

async function createOrder() {
  const accessToken = await generateAccessToken()

  const url = `${base}/v2/checkout/orders`

  const response = await fetch(url, {
    method: 'post',

    headers: {
      'Content-Type': 'application/json',

      Authorization: `Bearer ${accessToken}`,
    },

    body: JSON.stringify({
      intent: 'CAPTURE',

      purchase_units: [
        {
          amount: {
            currency_code: 'USD',

            value: '100.00',
          },
        },
      ],
    }),
  })

  const data = await response.json()

  return data
}

// use the orders api to capture payment for an order

async function capturePayment(orderId) {
  const accessToken = await generateAccessToken()

  const url = `${base}/v2/checkout/orders/${orderId}/capture`

  const response = await fetch(url, {
    method: 'post',

    headers: {
      'Content-Type': 'application/json',

      Authorization: `Bearer ${accessToken}`,
    },
  })

  const data = await response.json()

  return data
}

// generate an access token using client id and app secret

async function generateAccessToken() {
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64')

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'post',

    body: 'grant_type=client_credentials',

    headers: {
      Authorization: `Basic ${auth}`,
    },
  })

  const data = await response.json()

  return data.access_token
}
