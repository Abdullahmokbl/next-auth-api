import React from 'react';
import Image from 'next/image';
import styles from '../styles/Product.module.css';
import Link from 'next/link';

export default function Product(props) {
  const { id, name, price, img } = props;
  return (
    <Link className={styles.product} href={'/product/'+id}>
        <Image src={img.url} width={273} height={250} alt='' />
        <div className={styles.name}>{name}</div>
        <div className={styles.price}>{price}$</div>
    </Link>
  )
}
