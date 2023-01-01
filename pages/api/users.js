import { getSession } from 'next-auth/react';
import connectDB from './backend/mongodb';
import User from './backend/user';
// const { cloudinaryUpload, cloudinaryDestroy } = require('../../utils/cloudinary')
// const { formatBufferTo64 } = require('../../utils/data-uri');
// const { upload } = require('../../utils/multer');

export const config = {
    api: {
      bodyParser: false,
    },
}

const handler = async (req, res) => {
  const session = await getSession({req});
    if(req.method === 'GET' && req.query.page){
      if(!session) return res.status(401).json({msg:"Unauthorized"})
      const { page } = req.query;
      User.find()
        .then( users => {
            const usersCount = users.length;
            const pagesCount = Math.ceil(usersCount /5)
            return res.json({users: users.slice(page*5 - 5,page*5), pagesCount, usersCount})
        })
        .catch(e => console.log(e))
    }else if(req.method === 'GET'){
      if(!session) return res.status(401).json({msg:"Unauthorized"})
      User.find()
      .then(users => {
          return res.status(200).json(users)
      })
      .catch(e => console.log(e))
    }else if(req.method === 'POST'){
        // upload(req, res, async function(err){
        //     if(err) throw err;
        //     const { name, price, info, seller } = JSON.parse(req.body.user);
        //     if(!name || !price || !req.file) return res.status(400).json({msg: "Please enter all fields"})
        //     try {
        //         const file64 = formatBufferTo64(req.file);
        //         const uploadResult = await cloudinaryUpload(file64.content);
        //         const newuser = new User({
        //             name,
        //             price,
        //             info,
        //             img: {id: uploadResult.public_id, url: uploadResult.secure_url},
        //             seller
        //         })
        //         newuser.save()
        //             .then(user => {
        //               res.json({id: user._id})
        //             })
        //             .catch((err)=> {
        //               res.status(400).json({msg: "Something went wrong"})
        //             })
        //     } catch(e) {
        //         return res.status(422).send({message: e.message})
        //     }  
        // })
    }else if(req.method === 'DELETE' && req.query.id){
      if(!session) return res.status(401).json({msg:"Unauthorized"})
      const {id} = req.query;
      User.findByIdAndDelete(id)
        .then(async user => {
          // await cloudinaryDestroy(user.img.id)
          return res.json({id})
        })
        .catch(e => {
          console.log(e)
          return res.json({succeed: false})
        })
    }else if(req.method === 'DELETE'){
      if(!session) return res.status(401).json({msg:"Unauthorized"})
      User.deleteMany()
        .then(async (r) => {
          console.log(r)
          // await cloudinaryDestroy()
          return res.json({msg: "All users deleted"})
        })
        .catch(e => {
          console.log(e)
          return res.json({succeed: false})
        })
    }
}

export default connectDB(handler);