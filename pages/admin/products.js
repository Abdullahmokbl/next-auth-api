import axios from 'axios'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import Items from '../../components/Items'
import styles from './products.module.css'

export default function products(props) {
  const { products, productsCount, pagesCount } = props

  const [open, setOpen] = useState(false)
  const handleSidebar = () => {
    setOpen(!open)
  }
  return (
    <>
      <AdminLayout open={open} handleSidebar={handleSidebar} />
      <div className={`${styles.products} ${open && styles.open}`}>
        <Items type="product" items={products} count={productsCount} pagesCount={pagesCount} paginate={true} limit={10} />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/products?page=1&&limit=10')
    return {
      props: {
        products: res.data.products,
        pagesCount: res.data.pagesCount,
        productsCount: res.data.productsCount,
      },
      revalidate: 60,
    }
  } catch (e) {
    return { props: { products: null } }
  }
}
