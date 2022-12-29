import connectDB from './backend/mongodb';
import bcrypt from 'bcryptjs';
import User from './backend/user';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    // Check if all fields is provided
    const { name, email, password, gender } = req.body;
    // simple validation
    if(!name || !email || !password) return res.status(400).json({msg: "Please enter all fields"})
    // check for existing user
    User.findOne({email}, (err, user) => {
        if(user) return res.status(400).json({msg: "User already exists"})
        let newUser = new User({
            name,
            email,
            password,
            gender: gender === 'female'? false: true
        })
        // create salt & hash
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash
                newUser.save((err, user) => {
                    if(err) throw err;
                    return res.status(200).json({success:true})
                })
            })
        })
    })
  } else {
    res.status(422).send('req_method_not_supported');
  }
};

export default connectDB(handler);