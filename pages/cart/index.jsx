import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.css'
import { addItemToCart, clearAllCart, delItemFromCart, makeCart } from '../../redux/cartSlice'
import Checkout from '../../components/Checkout'
import axios from 'axios'
import AsyncButton from '../../components/AsyncButton'
import CartItem from '../../components/CartItem'
import { ToastContainer } from 'react-toastify'
import { wrapper } from '../../redux/store'

export default function Cart({ userId }) {
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const { cart } = useSelector(state => state.cart)
  console.log(cart)

  // if (cart === null) return <Loading />
  let totalPrice = 0
  cart?.map(p => (totalPrice += p.price * p.qty))

  const handleCart = async (type, product) => {
    if (disabled) return
    setDisabled(true)
    if (type === 'inc' || type === 'dec') await dispatch(addItemToCart({ type, userId, product }))
    if (type === 'del') await dispatch(delItemFromCart({ userId, productId: product }))
    if (type === 'clear') await dispatch(clearAllCart({ userId }))
    setDisabled(false)
  }

  const Items =
    cart?.length > 0 &&
    cart?.map(product => {
      return <CartItem key={product._id} product={product} disabled={disabled} handleCart={handleCart} />
    })

  const Summary = () => {
    return (
      <div className={styles.summary}>
        <div>CART SUMMARY</div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>Subtotal price :</div>
          <div>${totalPrice}</div>
        </div>
        <Checkout cart={cart} userId={userId} />
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
      <ToastContainer />
      {Items ? (
        <div className={styles.items}>
          <div className={styles.products}>
            {Items}
            <div className={styles.clear} onClick={() => handleCart('clear')}>
              <AsyncButton title="Clear Cart" disabled={disabled} />
            </div>
          </div>
          <Summary />
        </div>
      ) : (
        <Empty />
      )}
    </div>
  )
}

// export const getServerSideProps = async ctx => {
//   const session = await getSession(ctx)
//   let user = null
//   if (!session) return { props: { user, cart: null, userId: null } }
//   if (session) user = session.user

//   try {
//     const res = await axios.get(process.env.NEXT_PUBLIC_API + '/cart?userId=' + user.id)
//     return {
//       props: { cart: res.data, userId: user.id },
//     }
//   } catch (e) {
//     console.log(e)
//     return {
//       props: { cart: null, userId: null },
//     }
//   }
// }
export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  // console.log(store.getState())
  const session = await getSession(ctx)
  let user = null
  if (!session) return { props: { user, cart: null, userId: null } }
  if (session) user = session.user

  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_API + '/cart?userId=' + user.id)
    store.dispatch(makeCart(res.data))
    return {
      props: { cart: res.data, userId: user.id },
    }
  } catch (e) {
    console.log(e)
    return {
      props: { cart: null, userId: null },
    }
  }
})
