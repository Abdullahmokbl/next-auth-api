import mongoose, { model, Schema } from 'mongoose'

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    customerId: { type: String },
    paymentIntentId: { type: String },
    products: { type: Array },
    // products: [
    //   {
    //     id: {type: String},
    //     name: {type: String},
    //     info: {type: String},
    //     price: {type: String},
    //     img: {type: String},
    //     qty: {type: Number},
    //   }
    // ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    delivery_status: { type: String, default: 'pending' },
    payment_status: { type: String, required: true },
  },
  { timestamps: true }
)

mongoose.models = {}
const Order = model('order', orderSchema)

export default Order
