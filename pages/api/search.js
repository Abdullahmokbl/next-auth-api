import connectDB from "./backend/mongodb";
import Product from './backend/product';

const handler = async (req, res) => {
    if(req.method === 'POST'){
        const { search } = req.body;
        Product.find({"name": new RegExp('^'+search+'')})
          .then(product => {
            res.status(200).json(product)
          })
          .catch(e => console.log(e))

    }
}

export default connectDB(handler);