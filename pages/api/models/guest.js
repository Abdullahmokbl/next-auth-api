import mongoose from 'mongoose'

const guestSchema = new mongoose.Schema({
  guestId: { type: String, require: true },
  date: { type: Date, default: Date.now },
  cart: { type: Array },
})

mongoose.models = {}

var Guest = mongoose.model('guest', guestSchema)

export default Guest
