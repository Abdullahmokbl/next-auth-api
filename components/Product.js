import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Product.module.css';

export default function Product(props) {
  const router = useRouter();
  const { id, name, price, img } = props;
  return (
    <div className={styles.product} onClick={() => router.push('/product/'+id)}>
        <Image src={img.url} width={273} height={250} alt='' />
        <div className={styles.name}>{name}</div>
        <div className={styles.price}>{price}$</div>
    </div>
  )
}
