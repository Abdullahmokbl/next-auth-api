import styles from "../styles/Home.module.css";
import Product from "../components/Product";
import axios from "axios";
import { getSession } from "next-auth/react";

Shopping.title ='fff'
export default function Shopping({ products }) {
  const product =
    products &&
    products.map((product) => {
      return (
        <Product
          key={product._id.toString()}
          id={product._id}
          name={product.name}
          price={product.price}
          img={product.img}
        />
      );
    });
  return (
    <div className={styles.home}>
      <div className={styles.hero}></div>
      <h2>Featured Products</h2>
      <div className="container">
        <div className={styles.products}>{product}</div>
      </div>
      <div className={styles.shop}>
        <div>Shop Here Whatever You Want</div>
      </div>
    </div>
  );
}

// export const getServerSideProps = async (ctx) => {
//     const session = await getSession(ctx);
//     try{
//       const res = await axios.get(process.env.NEXT_PUBLIC_HOST+"/api/products")
//       return{
//         props: {
//           session,
//           products: res.data
//         }
//       }
//     }catch(e){
//       return{
//         props: {
//           session,
//           products: null
//         }
//       }
//     }
// }
export const getStaticProps = async (ctx) => {
  const session = await getSession(ctx);
    try{
      const res = await axios.get(process.env.NEXT_PUBLIC_HOST+"/api/products")
      return{
        props: {
          session,
          products: res.data,
        },
        revalidate: 60
      }
    }catch(e){
      return{
        props: {
          session,
          products: null
        }
      }
    }
}