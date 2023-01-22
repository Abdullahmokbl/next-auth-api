import {
  faArrowDown,
  faList,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import Products from "../../components/Products";
import Slider from "../../components/Slider";
import Pagination from "../../components/Pagination";
import styles from "./index.module.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSomeProducts } from "../../redux/productsSlice";
import { getSession } from "next-auth/react";

export default function search({ products, p_pagesCount, productsCount }) {
  const dispatch = useDispatch();
  const { someProducts } = useSelector((state) => state.products);
  const [productPage, setProductPage] = useState(1);

  const productsPag = someProducts || products;

  const product_previous = async () => {
    if (productPage > 1) {
      await dispatch(getSomeProducts(productPage - 1));
      setProductPage(productPage - 1);
    }
  };
  const product_next = async () => {
    if (productPage < p_pagesCount) {
      await dispatch(getSomeProducts(productPage + 1));
      setProductPage(productPage + 1);
    }
  };
  return (
    <div className={`${styles.search} container navpd`}>
      <div className={styles.left}>
        <div className={styles.category}>
          <div>CATEGORY</div>
          <Link href="/electronics">Electronics</Link>
          <Link href="/fashion">Fashion</Link>
          <Link href="/baby">Baby</Link>
          <Link href="/home-office">Home & Office</Link>
          <Link href="/toys-games">Toys & Games</Link>
          <Link href="/musical-instruments">Musical Instruments</Link>
        </div>
        <hr></hr>
        <div className={styles.size}>
          <div>SIZE</div>
          <section>
            <Link href="/search?size=xs">XS</Link>
            <Link href="/search?size=s">S</Link>
            <Link href="/search?size=m">M</Link>
            <Link href="/search?size=l">L</Link>
            <Link href="/search?size=xl">XL</Link>
          </section>
        </div>
        <hr></hr>
        <div className={styles.price}>
          <div>PRICE</div>
          <Slider />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.sort}>
          <div>
            <span>Sort by: </span>
            Popularity
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>
        <hr></hr>
        <div className={styles.view}>
          <p>1900438 products found</p>
          <div>
            <Link href="#">
              <FontAwesomeIcon icon={faList} />
            </Link>
            <Link href="#">
              <FontAwesomeIcon icon={faListCheck} />
            </Link>
          </div>
        </div>
        <hr></hr>
        <Products products={productsPag} />
        <Pagination
          page={productPage}
          pagesCount={p_pagesCount}
          count={productsCount}
          previous={product_previous}
          next={product_next}
        />
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  let user = null;
  if (session) user = session.user;
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API + "/products?page=1"
    );
    return {
      props: {
        products: res.data.products,
        p_pagesCount: res.data.pagesCount,
        productsCount: res.data.productsCount,
        user,
      },
    };
  } catch (e) {
    return { props: { products: null, user } };
  }
};
