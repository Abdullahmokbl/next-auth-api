import styles from './index.module.css'
import Products from '../components/Products'
import axios from 'axios'
import { getSession } from 'next-auth/react'
import Alert from '../components/Alert'
import { useRouter } from 'next/router'

Shopping.title = 'fff'
export default function Shopping({ products }) {
  const router = useRouter()
  const { type, msg } = router.query
  return (
    <div className={styles.home}>
      {/* {msg && <Alert msg={msg} type={type} />}
      {msg && <Alert msg="ffffff" type={type} />} */}
      <div>
        <Alert type="error" msg="Error" />
        <Alert type="success">
          <p>Success message</p>
        </Alert>
        <Alert type="primary">
          <h4>primary message</h4>
        </Alert>
        <Alert type="secondary">
          <span>secondary message</span>
        </Alert>
      </div>
      <div className={styles.hero}></div>
      <h2>Featured Products</h2>
      <div className="container">
        <Products products={products} />
      </div>
      <div className={styles.shop}>
        <div>Shop Here Whatever You Want</div>
      </div>
    </div>
  )
}

// export const getServerSideProps = async () => {
//   try {
//     const res = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/products')
//     return {
//       props: {
//         // session,
//         products: res.data,
//       },
//     }
//   } catch (e) {
//     return {
//       props: {
//         // session,
//         products: null,
//       },
//     }
//   }
// }
export const getStaticProps = async () => {
  // const session = await getSession(ctx)
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/products')
    return {
      props: {
        // session,
        products: res.data,
      },
      revalidate: 60,
    }
  } catch (e) {
    return {
      props: {
        // session,
        products: null,
      },
    }
  }
}
