import connectDB from './database/mongodb'
import Guest from './models/guest'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { guestId } = req.body
    // check for existing Guest
    Guest.findOne({ guestId }, (err, guest) => {
      if (guest) return res.status(400).json({ msg: 'Guest already exists' })
      let newGuest = new Guest({ guestId })
      newGuest.save((err, guest) => {
        if (err) throw err
        return res.status(200).json({ success: true })
      })
    })
  } else {
    res.status(422).send('req_method_not_supported')
  }
}

export default connectDB(handler)
