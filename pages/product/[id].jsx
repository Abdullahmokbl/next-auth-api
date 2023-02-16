import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faStar } from '@fortawesome/free-solid-svg-icons'
import { addCart, addToCart, decCart, delFromCart } from '../../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getSession } from 'next-auth/react'

export default function Product({ product, id }) {
  const dispatch = useDispatch()
  // console.log(user)
  const { cart } = useSelector(state => state.cart)
  // console.log(cart)
  // const exist = user?.cart.find(product => product._id === id);
  const item = cart.find(product => product._id === id)
  // console.log(item)
  const [exist, setExist] = useState(null)
  // const [qty, setQty] = useState(null)
  const [disabled, setDisabled] = useState(false)
  useEffect(() => {
    setExist(cart.find(product => product._id === id))
    // console.log(exist)
  }, [exist])
  // console.log(exist.length)
  // console.log(exist)
  // console.log(item)
  // if(!exist && !item) return <></>
  // console.log('fdf')

  const handleAddCart = () => {
    // setDisabled(true)
    dispatch(addCart(product))
  }
  const AddButton = () => {
    return (
      <div className={`button ${disabled ? 'disable' : undefined}`} onClick={() => handleAddCart()}>
        {disabled ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Add to cart'}
      </div>
    )
  }
  const Quantity = () => {
    return (
      <div className={styles.qty}>
        <div
          className={exist?.qty <= 1 || exist?.qty === undefined ? 'disable' : undefined}
          onClick={() => dispatch(decCart(product))}
        >
          -
        </div>
        <span>{disabled ? <FontAwesomeIcon icon={faSpinner} spin /> : exist.qty}</span>
        <div onClick={() => handleAddCart()}>+</div>
      </div>
    )
  }
  // const AddedButton = () => {
  //   return(
  //     <div className='button active' onClick={() => dispatch(delFromCart({user_id:user.id, product_id:id}))}>Added to cart</div>
  //   )
  // }
  const Product = () => {
    return (
      <>
        <div className={styles.img}>
          <Image src={product.img.url} width={300} height={300} alt="" />
        </div>
        <div className={styles.info}>
          <h1>{product.name}</h1>
          <div>
            category : <a>sds</a>
          </div>
          <div>
            <FontAwesomeIcon icon={faStar} color="orange" />
            <FontAwesomeIcon icon={faStar} color="orange" />
            <FontAwesomeIcon icon={faStar} color="orange" />
            <FontAwesomeIcon icon={faStar} color="orange" />
            <FontAwesomeIcon icon={faStar} color="orange" />
          </div>
          <h2>{product.price}$</h2>
          <div>free shipping</div>
          {!exist ? <AddButton /> : <Quantity />}
          {/* {user? carts.length <= 0 ? <AddButton /> : <AddedButton /> : ''} */}
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

// export const getServerSideProps = async (ctx) => {
//   const id = ctx.params.id;
//   const session = await getSession(ctx);
//   let user = null;
//   if(session) user = session.user;
//   try{
//     const res = await axios.get(process.env.NEXT_PUBLIC_HOST+"/api/products?id="+id);
//     return {props: {product: res.data, id: id, user}}
//   }catch(e){
//     return {props: {product: null, user}}
//   }
// }
export const getStaticPaths = async () => {
  const res = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/products')
  // const paths = res.data.map(item => {
  //   return {params: {id: item._id}}
  // })
  return {
    fallback: 'blocking',
    paths: [],
  }
}
export const getStaticProps = async ctx => {
  const id = ctx.params.id
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_API + '/products?id=' + id)
    return { props: { product: res.data, id: id }, revalidate: 60 }
  } catch (e) {
    return { props: { product: null } }
  }
}
