import Link from "next/link";
import Slider from "../../components/Slider";
import styles from "../../styles/SearchPage.module.css";

export default function search() {
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
      <div className={styles.right}></div>
    </div>
  );
}
