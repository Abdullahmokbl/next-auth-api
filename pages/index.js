import styles from "./index.module.css";
import Products from "../components/Products";
import axios from "axios";
import { getSession } from "next-auth/react";

Shopping.title = "fff";
export default function Shopping({ products }) {
  return (
    <div className={styles.home}>
      <div className={styles.hero}></div>
      <h2>Featured Products</h2>
      <div className="container">
        <Products products={products} />
      </div>
      <div className={styles.shop}>
        <div>Shop Here Whatever You Want</div>
      </div>
    </div>
  );
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx);
  console.log(session);
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST + "/api/products");
    return {
      props: {
        session,
        products: res.data,
      },
      // revalidate: 60,
    };
  } catch (e) {
    return {
      props: {
        session,
        products: null,
      },
    };
  }
};
