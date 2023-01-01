import React from 'react';
import styles from '../../styles/ProductPage.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { addToCart, delFromCart } from '../../redux/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getSession } from 'next-auth/react';

export default function Product({product, id, user}) {
  const dispatch = useDispatch();
  console.log(user)
  const { cart } = useSelector(state => state.users);
  const c = cart || user?.cart
  console.log(c)
  const carts = user?.cart.filter(product => product._id === id);
  console.log(carts)
  const AddButton = () => {
    return(
      <div className='button' onClick={() => dispatch(addToCart({user_id:user._id, product}))}>Add to cart</div>
    )
  }
  const AddedButton = () => {
    return(
      <div className='button active' onClick={() => dispatch(delFromCart({user_id:user._id, product_id:id}))}>Added to cart</div>
    )
  }
  const Product = () => {
    return(
      <>
      <div className={styles.img}>
          <Image src={product.img.url} width={300} height={300} alt='' />
      </div>
      <div className={styles.info}>
          <h1>{product.name}</h1>
          <div>category : <a>sds</a></div>
          <div>
            <FontAwesomeIcon icon={faStar} color='orange' />
            <FontAwesomeIcon icon={faStar} color='orange' />
            <FontAwesomeIcon icon={faStar} color='orange' />
            <FontAwesomeIcon icon={faStar} color='orange' />
            <FontAwesomeIcon icon={faStar} color='orange' />
          </div>
          <h2>{product.price}$</h2>
          <div>free shipping</div>
          {user && carts.length <= 0 ? <AddButton /> : <AddedButton />}
          <div>
            <h3>About</h3>
            <p>{product.info}</p>
          </div>
      </div>
      </>
    )
  }
  return (
    <div className={`${styles.product} container navpd`}>
        {product ? <Product /> : <div className={styles.error}>This item doesn't exist</div>}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const id = ctx.params.id;
  const session = await getSession(ctx);
  let user = null;
  if(session) user = session.user;
  try{
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST+"/api/products?id="+id);
    return {props: {product: res.data, id: id, user}}
  }catch(e){
    return {props: {product: null, user}}
  }
}