import { getSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Cart.module.css';

export default function Cart({user}) {
  const Item = user?.cart.length > 0 && user?.cart.map(cart => {
    return(
      <div key={cart._id}>
        <h3>{cart.name}</h3>
        <div>{cart.price}</div>
      </div>
    )
  })

  const Empty = () => {
    return(
        <div>
            <h3>Your cart is empty.</h3>
            <Link href='/' className='button'>Continue browsing here</Link>
        </div>
    )
  }
  return (
    <div className={`${styles.cart} container navpd`}>
        <h2>Your Cart</h2>
        {Item ? Item : <Empty />}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if(!session) return{props:{}}
  return{
    props: {user: session.user}
  }
}