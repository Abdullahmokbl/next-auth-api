import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'
import { addCart, decCart, delCart } from '../../redux/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Checkout from '../../components/Checkout'

export default function Cart() {
  const { data: session } = useSession()
  const user = session?.user
  // console.log(user)

  const dispatch = useDispatch()
  const [carts, setCarts] = useState(null)
  const { cart } = useSelector(state => state.cart)
  // if(cart.length !== 0) return <div>Loading</div>
  useEffect(() => {
    setCarts(cart)
  }, [cart])
  if (!carts) return <></>
  let totalPrice = 0
  carts?.map(p => (totalPrice += p.price * p.qty))

  const Items =
    carts?.length > 0 &&
    carts?.map(item => {
      return (
        <div className={styles.product} key={item._id}>
          <Link href={'/product/' + item._id}>
            <Image src={item.img.url} width={50} height={50} alt="" />
            <h3>{item.name}</h3>
            <div className={styles.price}>${item.price}</div>
          </Link>
          <div>
            <div className={styles.remove} onClick={() => dispatch(delCart(item._id))}>
              <FontAwesomeIcon icon={faTrash} />
              Remove
            </div>
            <div className={styles.qty}>
              <div className={item.qty <= 1 ? 'disable' : undefined} onClick={() => dispatch(decCart(item))}>
                -
              </div>
              <span>{item.qty}</span>
              <div onClick={() => dispatch(addCart(item))}>+</div>
            </div>
          </div>
        </div>
      )
    })

  const Summary = () => {
    return (
      <div className={styles.summary}>
        <div>CART SUMMARY</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Subtotal price :</div>
          <div>${totalPrice}</div>
        </div>
        <div>
          {/* <a href="/checkout">CHECKOUT(${totalPrice})</a> */}
          <Checkout cart={cart} userId={user?.id} />
        </div>
      </div>
    )
  }

  const Empty = () => {
    return (
      <div>
        <h3>Your cart is empty.</h3>
        <Link href="/" className="button">
          Continue browsing here
        </Link>
      </div>
    )
  }
  return (
    <div className={`${styles.cart} container navpd`}>
      <h2>Your Cart</h2>
      {Items ? (
        <div className={styles.items}>
          <div className={styles.products}>{Items}</div>
          <Summary />
        </div>
      ) : (
        <Empty />
      )}
    </div>
  )
}
// export default dynamic(() => Promise.resolve(Cart), {
//   ssr: false,
// });

// export const getServerSideProps = async (ctx) => {
//   const session = await getSession(ctx);
//   if(!session) return{props:{}}
//   return{
//     props: {user: session.user}
//   }
// }
