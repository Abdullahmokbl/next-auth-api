import styles from './index.module.css'
import Products from '../components/Products'
import axios from 'axios'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

Shopping.title = 'fff'
export default function Shopping({ products }) {
  const { t } = useTranslation('common')

  return (
    <div className={styles.home}>
      <div className={styles.hero}></div>
      <h2>{t('Featured Products')}</h2>
      <div className="container">
        <Products products={products} />
      </div>
      <div className={styles.shop}>
        <div>{t('Shop Here Whatever You Want')}</div>
      </div>
    </div>
  )
}

export const getStaticProps = async ({ locale }) => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/products')
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
        products: res.data,
      },
      revalidate: 60,
    }
  } catch (e) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common', 'footer'])),
        products: null,
      },
    }
  }
}
