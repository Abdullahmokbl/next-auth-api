import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/Search.module.css";

export default function Search() {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
    if(e.target.value.length > 1){
      axios.post(process.env.NEXT_PUBLIC_API + "/search", {search: e.target.value})
        .then(res => setProducts(res.data))
        .catch(e => console.log(e))
    }else{setProducts(null)}
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.search}>
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="search"
          name="search"
          placeholder="Search products"
          value={search}
          onChange={handleChange}
          autoComplete="off"
          required
        />
        {search && <span onClick={() => {setSearch(''); setProducts(null)}}><FontAwesomeIcon icon={faClose} /></span>}
        <div className={styles.products}>
          {/* <a>dsff</a>
          <a>dsff</a>
          <a>dsff</a>
          <a>dsff</a> */}
          {products && products.map(product => {
            return <Link key={product._id} href={'/product/'+product._id}>{product.name}</Link>
          })}
        </div>
      </div>
      <button className={styles.button}>Search</button>
    </form>
  );
}
