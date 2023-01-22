import { getSession } from "next-auth/react";
import connectDB from "./backend/mongodb";
import Product from "./backend/product";
const {
  cloudinaryUpload,
  cloudinaryDestroy,
} = require("../../utils/cloudinary");
const { formatBufferTo64 } = require("../../utils/data-uri");
const { upload } = require("../../utils/multer");

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (req.method === "GET" && req.query.id) {
    const { id } = req.query;
    Product.findById(id)
      .then((product) => {
        if (!product)
          return res.status(400).json({ msg: "This Item doesn't exist" });
        return res.status(200).json(product);
      })
      .catch((e) => {
        return res.status(400).json({ msg: "failed" });
      });
  } else if (req.method === "GET" && req.query.page) {
    const { page } = req.query;
    const count = await Product.count();
    // limit 12
    Product.find()
      .skip(page * 5 - 5)
      .limit(5)
      .then((products) => {
        const productsCount = count;
        const pagesCount = Math.ceil(productsCount / 5);
        return res.json({ products, pagesCount, productsCount });
      })
      .catch((e) => console.log(e));
  } else if (req.method === "GET") {
    return new Promise((resolve, reject) => {
      Product.find()
        .then((products) => {
          res.status(200).json(products);
          resolve();
        })
        .catch((e) => {
          res.status(405).json({ success: false });
          resolve();
        });
    });
  } else if (req.method === "POST") {
    if (!session) return res.status(401).json({ msg: "Unauthorized" });
    upload(req, res, async function (err) {
      if (err) throw err;
      if (!req.body)
        return res.status(401).json({ msg: "Please enter all fields" });
      const { name, price, info, seller } = JSON.parse(req.body.product);
      if (!name || !price || !req.file)
        return res.status(400).json({ msg: "Please enter all fields" });
      try {
        const file64 = formatBufferTo64(req.file);
        const uploadResult = await cloudinaryUpload(file64.content);
        const newProduct = new Product({
          name,
          price,
          info,
          img: { id: uploadResult.public_id, url: uploadResult.secure_url },
          seller,
        });
        newProduct
          .save()
          .then((product) => {
            res.json({ id: product._id });
          })
          .catch((err) => {
            res.status(400).json({ msg: "Something went wrong" });
          });
      } catch (e) {
        return res.status(422).send({ message: e.message });
      }
    });
  } else if (req.method === "DELETE" && req.query.id) {
    if (!session) return res.status(401).json({ msg: "Unauthorized" });
    const { id } = req.query;
    Product.findByIdAndDelete(id)
      .then(async (product) => {
        await cloudinaryDestroy(product.img.id);
        return res.json({ id });
      })
      .catch((e) => {
        console.log(e);
        return res.json({ succeed: false });
      });
  } else if (req.method === "DELETE") {
    if (!session) return res.status(401).json({ msg: "Unauthorized" });
    Product.deleteMany()
      .then(async (r) => {
        console.log(r);
        // await cloudinaryDestroy()
        return res.json({ msg: "All products deleted" });
      })
      .catch((e) => {
        console.log(e);
        return res.json({ succeed: false });
      });
  }
};

export default connectDB(handler);
