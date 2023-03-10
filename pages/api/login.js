import connectDB from './database/mongodb'
import bcrypt from 'bcryptjs'
import User from './models/user'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // return new Promise((resolve, reject) => {

    // })
    // Check if email or password is provided
    const { email, password } = req.body
    // simple validation
    if (!email || !password) return res.status(401).json({ msg: 'Please enter all fields' })
    // check for existing user
    User.findOne({ email }, (err, user) => {
      // if(!user) return res.status(404).send({msg: "User does not exist"})
      if (!user) return res.status(401).json({ msg: 'User does not exist' })
      // validate password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' })
        return res.json({ id: user.id, name: user.name, email: user.email, cart: user.cart, isAdmin: user.isAdmin })
      })
    })
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)
