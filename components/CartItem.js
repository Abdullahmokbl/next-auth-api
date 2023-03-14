import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/CartItem.module.css'
import AsyncButton from './AsyncButton'

export default function CartItem({ product, disabled, handleCart }) {
  return (
    <div className={styles.product}>
      <Link href={'/product/' + product._id}>
        <Image src={product.img.url} width={50} height={50} alt="" />
        <h3>{product.name}</h3>
        <div className={styles.price}>${product.price}</div>
      </Link>
      <div>
        <div className={styles.remove} onClick={() => handleCart('del', product._id)}>
          <AsyncButton title="Remove" disabled={disabled}>
            <FontAwesomeIcon icon={faTrash} />
          </AsyncButton>
        </div>
        <div className={styles.qty}>
          <div className={product.qty <= 1 ? 'disable' : undefined} onClick={() => handleCart('dec', product)}>
            <AsyncButton title="-" disabled={disabled} size="lg" />
          </div>
          <span>{product.qty}</span>
          <div onClick={() => handleCart('inc', product)}>
            <AsyncButton title="+" disabled={disabled} size="lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
