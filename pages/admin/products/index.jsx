import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Items from '../../../components/Items'
import { setProducts } from '../../../redux/productsSlice'
import styles from './index.module.css'

export default function products({ products }) {
  const count = products?.length || 0
  const limit = 7
  const pagesCount = Math.ceil(count / limit)

  const dispatch = useDispatch()
  useEffect(() => {
    if (products) dispatch(setProducts(products))
  })

  return (
    <div className={styles.products}>
      {products ? (
        <Items
          type="product"
          items={products?.slice(0, limit)}
          count={count}
          pagesCount={pagesCount}
          paginate={true}
          limit={limit}
        />
      ) : (
        <h2 style={{ textAlign: 'center' }}>There is no products</h2>
      )}
    </div>
  )
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/products')
    return {
      props: { products: res.data },
      revalidate: 60,
    }
  } catch (e) {
    return { props: { products: null } }
  }
}
