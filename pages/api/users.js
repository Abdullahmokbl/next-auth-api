import { getSession } from 'next-auth/react'
import connectDB from './database/mongodb'
import User from './models/user'

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req, res) => {
  // console.log(req)
  // const session = await getSession({req});
  // console.log(session)
  if (req.method === 'GET' && req.query.page) {
    // if(!session) return res.status(401).json({msg:"Unauthorized"})
    const { page, limit = 5 } = req.query
    const count = await User.count()
    User.find()
      .skip(page * limit - limit)
      .limit(limit)
      .then(users => {
        const usersCount = count
        const pagesCount = Math.ceil(usersCount / limit)
        return res.json({ users, pagesCount, usersCount })
      })
      .catch(e => console.log(e))
  } else if (req.method === 'GET') {
    // if (!session) return res.status(401).json({ msg: 'Unauthorized' })
    User.find()
      .then(users => {
        return res.status(200).json(users)
      })
      .catch(e => console.log(e))
  } else if (req.method === 'PUT') {
    console.log(req.body)
    console.log(req.data)
    console.log('dfffff')
    // const { id, img } = req.body.user
    // console.log(id)
    // console.log(img)
    // User.findByIdAndUpdate(id)
    //   .then(async user => {
    //     console.log(user)
    //   })
    //   .catch(e => console.log('tt'))
  } else if (req.method === 'DELETE' && req.query.id) {
    if (!session) return res.status(401).json({ msg: 'Unauthorized' })
    const { id } = req.query
    User.findByIdAndDelete(id)
      .then(async user => {
        // await cloudinaryDestroy(user.img.id)
        return res.json({ id })
      })
      .catch(e => {
        console.log(e)
        return res.json({ succeed: false })
      })
  } else if (req.method === 'DELETE') {
    if (!session) return res.status(401).json({ msg: 'Unauthorized' })
    User.deleteMany()
      .then(async r => {
        console.log(r)
        // await cloudinaryDestroy()
        return res.json({ msg: 'All users deleted' })
      })
      .catch(e => {
        console.log(e)
        return res.json({ succeed: false })
      })
  }
}

export default connectDB(handler)
