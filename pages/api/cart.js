import { unstable_getServerSession } from 'next-auth/next'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { getSession } from 'next-auth/react'
import connectDB from './database/mongodb'
import User from './models/user'

const handler = async (req, res) => {
  // const session = await getSession({ req })
  const session = await unstable_getServerSession(req, res, authOptions)
  // if (!session) return res.status(401).json({ msg: "Unauthorized" });
  if (req.method === 'GET' && req.query.userId) {
    const { userId } = req.query
    User.find({ _id: userId }, { cart: 1, _id: 0 })
      .then(result => {
        return res.json(result[0].cart)
      })
      .catch(e => console.log(e))
  } else if (req.method === 'POST') {
    const { user_id, product } = req.body
    User.updateOne({ _id: user_id }, { $push: { cart: product } })
      .then(() => {
        return res.json(product)
      })
      .catch(e => console.log(e))
  } else if (req.method === 'DELETE') {
    const { user_id, product_id } = req.body
    User.updateOne({ _id: user_id }, { $pull: { cart: { _id: product_id } } })
      .then(() => {
        return res.json(product_id)
      })
      .catch(e => console.log(e))
  }
}

export default connectDB(handler)
