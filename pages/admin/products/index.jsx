import axios from 'axios'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AdminLayout from '../../../components/AdminLayout'
import Items from '../../../components/Items'
import { setProducts } from '../../../redux/productsSlice'
import styles from './index.module.css'

export default function products({products}) {
  const count = products?.length || 0;
  const limit = 7;
  const pagesCount = Math.ceil(count/limit);

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(setProducts(products))
  })

  const [open, setOpen] = useState(false)
  const handleSidebar = () => {
    setOpen(!open)
  }
  return (
    <>
      <AdminLayout open={open} handleSidebar={handleSidebar} />
      <div className={`${styles.products} ${open && styles.open}`}>
        <Items type="product" items={products?.slice(0,limit)} count={count} pagesCount={pagesCount} paginate={true} limit={limit} />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/products')
    return {
      props: {
        products: res.data
      },
      revalidate: 60,
    }
  } catch (e) {
    return { props: { products: null } }
  }
}
