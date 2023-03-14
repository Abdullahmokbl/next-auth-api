import { faBell, faCartShopping, faEllipsisVertical, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/Navbar.module.css'
import Icon from './Icon'
import Search from './Search'
import { useTranslation } from 'next-i18next'

export default function Navbar() {
  const { t } = useTranslation('common')
  const { data: session, status } = useSession()
  let user = null
  if (session) user = session.user

  const { cart } = useSelector(state => state.cart)
  const [count, setCount] = useState(null)
  useEffect(() => {
    setCount(cart?.length)
  }, [cart])

  const { locale } = useRouter()
  const lang = locale === 'ar' ? t('🇪🇬 Arabic') : t('🇺🇸 English')
  const { name, email, image } = user || {}
  const [dropdownMenu, setDropdownMenu] = useState(false)

  const Auth = () => (
    <div className={styles.login}>
      <Link href="/login">{t('Login')}</Link>
    </div>
  )
  const Welcome = () => (
    <>
      <Icon icon={faBell} items={{ setting: 'setting', logout: 'fdafgg' }} counter={3} />
      {image === undefined ? (
        <Icon icon={faUser} size="lg" items={{ profile: name, setting: 'setting', logout: 'log out' }} />
      ) : (
        <Icon image={image} items={{ profile: name, setting: 'setting', logout: 'log out' }} />
      )}
    </>
  )

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.title}>
            <Link href="/">{t('shopping')}</Link>
          </div>
          <Search />
          <Icon title={lang} items={{ en: t('🇺🇸 English'), ar: t('🇪🇬 Arabic') }} />
        </div>
        <div className={`${styles.right} ${status === 'loading' ? styles.loading : styles.loaded}`}>
          <Link href="/cart">
            <Icon icon={faCartShopping} counter={count} />
          </Link>
          {user ? <Welcome /> : <Auth />}
        </div>
        <div className={styles.d_title}>
          <Link href="/">{t('shopping')}</Link>
        </div>
        <div className={styles.dropdown_toggle} onClick={() => setDropdownMenu(!dropdownMenu)}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
        <div className={`${styles.dropdown_menu} ${dropdownMenu ? styles.open : undefined}`}>
          <Icon title={lang} items={{ en: t('🇺🇸 English'), ar: t('🇪🇬 Arabic') }} />
          <Link href="/cart">
            <Icon icon={faCartShopping} counter={count} />
          </Link>
          {user ? <Welcome /> : <Auth />}
        </div>
      </nav>
    </>
  )
}
