import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delAllProducts, delProduct, getSomeProducts } from '../../redux/productsSlice';
import { delAllUsers, delUser, getSomeUsers } from '../../redux/usersSlice';
import styles from '../../styles/Admin.module.css';
import Pagination from '../../components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { getSession } from 'next-auth/react';

export default function Admin(props) {
  const {user, products, users, usersCount, u_pagesCount, productsCount, p_pagesCount} = props;
  const dispatch = useDispatch();
  const { someUsers } = useSelector(state => state.users);
  const { someProducts } = useSelector(state => state.products);
  const usersPag = someUsers || users
  console.log(usersPag)
  const productsPag = someProducts || products

  const [userPage, setUserPage] = useState(1);
  const [productPage, setProductPage] = useState(1);

  const user_previous = () => {
    if(userPage > 1) {
      setUserPage(userPage - 1)
      dispatch(getSomeUsers(userPage - 1))
    }
  }
  const user_next = () => {
    if(userPage < u_pagesCount) {
      setUserPage(userPage + 1)
      dispatch(getSomeUsers(userPage + 1))
    }
  }
  const product_previous = () => {
    if(productPage > 1) {
      setProductPage(productPage - 1)
      dispatch(getSomeProducts(productPage - 1))
    }
  }
  const product_next = () => {
    if(productPage < p_pagesCount) {
      setProductPage(productPage + 1)
      dispatch(getSomeProducts(productPage + 1))
    }
  }

  let userId = userPage*5 - 5;
  const user_info = usersPag?.length !== 0 && usersPag?.map(user => {
    const { _id, username, email, gender, date} = user;
    userId++;
    return(
      <ul key={_id}>
        <li>{userId}</li>
        <li>{username}</li>
        <li>{email}</li>
        <li>{gender? 'Male': 'Female'}</li>
        <li>{new Date(date).toDateString()}</li>
        <li><div className={styles.delete} onClick={() => {if(confirm('Do you really want do delete '+username)) dispatch(delUser(_id))}}><FontAwesomeIcon icon={faTrash} size='xl' /></div></li>
      </ul>
    )
  })
  let productId = productPage*5 - 5;
  const product = productsPag?.length !== 0 && productsPag?.map(product => {
    const { _id, name, price, info, seller } = product;
    productId++;
    return(
      <ul key={_id}>
        <li>{productId}</li>
        <li>{name}</li>
        <li>{price}</li>
        <li>{info}</li>
        <li>{seller}</li>
        <li><div className={styles.delete} onClick={() => {if(confirm('Do you really want do delete '+name)) dispatch(delProduct(_id))}}><FontAwesomeIcon icon={faTrash} size='xl' /></div></li>
      </ul>
    )
  })

  const Users = () => {
    return(
      <div className={styles.users}>
        <ul>
          <li>ID</li>
          <li>Username</li>
          <li>Email</li>
          <li>Gender</li>
          <li>Created At</li>
          <li>Delete</li>
        </ul>
        {user_info}
        <div className={styles.del_all} onClick={() => {if(confirm('Do you really want do delete all users')) dispatch(delAllUsers())}}>Delete All Users</div>
        <Pagination page={userPage} pagesCount={u_pagesCount} count={usersCount} previous={user_previous} next={user_next} />
      </div>
    )
  }
  const Products = () => {
    return(
      <div className={styles.products}>
        <ul>
        <li>ID</li>
        <li>Name</li>
        <li>Price</li>
        <li>Info</li>
        <li>Seller</li>
        <li>Delete</li>
        </ul>
        {product}
        <div className={styles.del_all} onClick={() => {if(confirm('Do you really want do delete all products')) dispatch(delAllProducts())}}>Delete All Products</div>
        <Pagination page={productPage} pagesCount={p_pagesCount} count={productsCount} previous={product_previous} next={product_next} />
      </div>
    )
  }

  return (
    <div className={`${styles.admin} container navpd`}>
      <h2 className={styles.welcome}> Welcome {user && user.username} </h2>
      <h2>Users</h2>
      {users?.length !== 0 ? <Users /> : <h3 className={styles.no}>There is no users</h3>}
      <div className={styles.line}></div>
      <h2>Products</h2>
      {products?.length !== 0 ? <Products /> : <h3 className={styles.no}>There is no products</h3>}
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  // console.log(session)
  if(!session) return{
    notFound: true
  }

  // const token = session.user.token
  // console.log(token)
  // let user = null
  // if(session) user = session.user;
  if(session.user.name === 'qqqq'){
    try{
      const productsRes = await axios.get(process.env.NEXT_PUBLIC_HOST+"/api/products?page=1");
      const usersRes = await axios.get(process.env.NEXT_PUBLIC_HOST+"/api/users?page=1");
      return {props: {user: session.user, products: productsRes.data.products, p_pagesCount: productsRes.data.pagesCount, productsCount: productsRes.data.productsCount, users: usersRes.data.users, u_pagesCount: usersRes.data.pagesCount, usersCount: usersRes.data.usersCount}}
    }catch(e){
      return {props: {user: session.user, products: null, users: null}}
    }
  }else{
    return {notFound: true}
  }
}