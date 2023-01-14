import { getSession } from "next-auth/react";
import connectDB from "./backend/mongodb";
import User from "./backend/user";

const handler = async (req, res) => {
  // const session = await getSession({ req });
  // if (!session) return res.status(401).json({ msg: "Unauthorized" });
  if (req.method === "POST") {
    const { user_id, product } = req.body;
    User.updateOne({ _id: user_id }, { $push: { cart: product } })
      .then(() => {
        return res.json(product);
      })
      .catch((e) => console.log(e));
  } else if (req.method === "DELETE") {
    const { user_id, product_id } = req.body;
    User.updateOne({ _id: user_id }, { $pull: { cart: { _id: product_id } } })
      .then(() => {
        return res.json(product_id);
      })
      .catch((e) => console.log(e));
  }
};

export default connectDB(handler);
