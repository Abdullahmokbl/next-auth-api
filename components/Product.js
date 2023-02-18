import React from 'react'
import Image from 'next/image'
import styles from '../styles/Product.module.css'
import Link from 'next/link'
// import { CldImage } from 'next-cloudinary'

export default function Product(props) {
  const { id, name, price, img } = props
  return (
    <Link className={styles.product} href={'/product/' + id}>
      <Image src={img.url} width={200} height={200} alt={name} />
      {/* you must asset cloud name when initalize the asset */}
      {/* <CldImage src={img.url} width={200} height={200} alt={name} /> */}
      <div className={styles.name}>{name}</div>
      <div className={styles.price}>{price}$</div>
    </Link>
  )
}
