import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  email: {
      type: String,
      required: true
  },
  password: {
      type: String
  },
  image: {
      type: String
  },
  gender: {
      type: Boolean
  },
  date: {
      type: Date,
      default: Date.now
  },
  isAdmin: {
      type: Boolean,
      default: false
  },
  code: {
      type: Number
  },
  isPending: {
      type: Boolean,
      default: true
  },
  cart: {
      type: Array
  }
  });

mongoose.models = {};

var User = mongoose.model('User', UserSchema);

export default User;