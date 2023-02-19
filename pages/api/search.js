import connectDB from './database/mongodb'
import Product from './models/product'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { search } = req.body
    Product.find({ name: new RegExp('^' + search + '') })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(e => console.log(e))
  }
}

export default connectDB(handler)
