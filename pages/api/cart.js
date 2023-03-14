import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getSession } from 'next-auth/react'
import connectDB from './database/mongodb'
import User from './models/user'

const handler = async (req, res) => {
  // const session = await getSession({ req })

  // const session = await unstable_getServerSession(req, res, authOptions)
  // if (!session) return res.status(401).json({ msg: "Unauthorized" });
  if (req.method === 'GET') {
    const { userId } = req.query
    User.find({ _id: userId }, { cart: 1, _id: 0 })
      .then(result => {
        return res.json(result[0].cart)
      })
      .catch(e => console.log(e))
  } else if (req.method === 'POST') {
    const { type, userId, product } = req.body

    User.find({ _id: userId }, { cart: { $elemMatch: { _id: product._id } } })
      .then(r => {
        if (r[0].cart.length > 0) {
          let cart = product
          cart.qty++
          User.updateOne({ _id: userId, 'cart._id': product._id }, { $inc: { 'cart.$.qty': type === 'inc' ? 1 : -1 } })
            .then(r => {
              return res.json({ product: cart, type })
            })
            .catch(e => console.log(e))
        } else {
          let cart = product
          cart.qty = 1
          User.updateOne({ _id: userId }, { $push: { cart } })
            .then(r => {
              return res.json({ product: cart, type })
            })
            .catch(e => console.log(e))
        }
      })
      .catch(e => console.log(e))
  } else if (req.method === 'DELETE') {
    const { userId, productId } = req.body

    User.updateOne({ _id: userId }, { $pull: { cart: { _id: productId } } })
      .then(r => res.json(productId))
      .catch(e => console.log(e))
  } else if (req.method === 'clear') {
    const { userId } = req.body

    User.updateOne({ _id: userId }, { $unset: { cart: 1 } }, false, true)
      .then(r => console.log(r))
      .catch(e => console.log(e))
  }
}

export default connectDB(handler)
