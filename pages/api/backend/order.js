import { model, models, Schema } from 'mongoose'

const orderSchema = new Schema({
  userID: {
    type: String,
  },
  products: {
    type: Array,
  },
  subtotal: {
    type: Number,
  },
  total: {
    type: Number,
  },
  shipping: {
    type: Object,
  },
  delivery_status: {
    type: Boolean,
  },
  payment_status: {
    type: Boolean,
  },
})

models = {}
const Order = model('order', orderSchema)

export default Order
