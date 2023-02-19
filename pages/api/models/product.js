import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: Object, required: true },
  info: { type: String },
  category: { type: String },
  rating: { type: Number },
  supply: { type: Number },
  seller: { type: String },
})
mongoose.models = {}
const Product = mongoose.model('item', ProductSchema)

export default Product
