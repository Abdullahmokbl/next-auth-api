import Product from "./Product";
import styles from "../styles/Products.module.css";

export default function products({ products }) {
  const product = products?.map((product) => {
    return (
      <Product
        key={product._id}
        id={product._id}
        name={product.name}
        price={product.price}
        img={product.img}
      />
    );
  });
  return <div className={styles.products}>{product}</div>;
}
