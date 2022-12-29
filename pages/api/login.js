import connectDB from './backend/mongodb';
import bcrypt from 'bcryptjs';
import User from './backend/user';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Check if email or password is provided
    const { email, password } = req.body;
    // simple validation
    if(!email || !password) return res.status(401).json({msg: "Please enter all fields"})
    // check for existing user  
    User.findOne({email}, (err, user) => {
      if(!user) return res.status(400).json({msg: "User does not exist"})
      // validate password
      bcrypt.compare(password, user.password)
          .then(isMatch => {
              if(!isMatch) return res.status(400).json({msg: "Invalid credentials"});
              return res.json({id: user.id, name:user.name, email: user.email, cart: user.cart})
          })
    })
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);