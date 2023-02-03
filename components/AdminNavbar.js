import {
  faBars,
  faBell,
  faEllipsisVertical,
  faExpand,
  faList,
  faMessage,
  faMoon,
  faSun,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../styles/AdminNavbar.module.css'
import Icon from './Icon'
import Search from './Search'

export default function AdminNavbar({ open, handleSidebar }) {
  const { data: session, status } = useSession()
  let user = null
  if (session) user = session.user

  const { locale } = useRouter()
  const lang = locale === 'ar' ? '🇪🇬 Arabic' : '🇺🇸 English'
  const { name, email, image } = user || {}
  const [dropdownMenu, setDropdownMenu] = useState(false)
  const [isNight, setIsNight] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setIsNight(localStorage.getItem('theme') === 'dark' && true)
  })
  // const handleLang = lang => {
  //   localStorage.setItem("lang", lang);
  // };
  const handleScreen = () => {
    if (!Boolean(document.fullscreenElement)) {
      document.body.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }
  return (
    <>
      <nav className={`${styles.nav} ${open ? styles.open : undefined}`}>
        <div className={styles.left}>
          <div onClick={handleSidebar}>
            <FontAwesomeIcon icon={faList} size="xl" />
          </div>
          <div className={styles.title}>
            <Link href="/">Shopping</Link>
          </div>
          <Search />
          <Icon title={lang} items={{ en: '🇺🇸 English', ar: '🇪🇬 Arabic' }} />
        </div>
        <div className={styles.right}>
          <div
            onClick={() => {
              setTheme(isNight ? 'light' : 'dark')
              setIsNight(!isNight)
            }}
          >
            {isNight ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
          </div>
          <div className={styles.full} onClick={handleScreen}>
            <FontAwesomeIcon icon={faExpand} />
          </div>
          <Icon icon={faBell} items={{ setting: 'setting', logout: 'fdafgg' }} counter={3} />
          <Icon icon={faMessage} items="" counter={23} />
          {image === undefined ? (
            <Icon icon={faUser} size="lg" items={{ profile: name, setting: 'setting', logout: 'log out' }} />
          ) : (
            <Icon image={image} items={{ profile: name, setting: 'setting', logout: 'log out' }} />
          )}
        </div>
        <div className={styles.d_sidebar} onClick={handleSidebar}>
          <FontAwesomeIcon icon={faBars} size="xl" />
        </div>
        <div className={styles.d_title}>
          <Link href="/">Shopping</Link>
        </div>
        <div className={styles.dropdown_toggle} onClick={() => setDropdownMenu(!dropdownMenu)}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
        <div className={`${styles.dropdown_menu} ${dropdownMenu ? styles.open : undefined}`}>
          <Icon title={lang} items={{ en: '🇺🇸 English', ar: '🇪🇬 Arabic' }} />
          <div
            onClick={() => {
              setTheme(isNight ? 'light' : 'dark')
              setIsNight(!isNight)
            }}
          >
            {isNight ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
          </div>
          <div className={styles.full} onClick={handleScreen}>
            <FontAwesomeIcon icon={faExpand} />
          </div>
          <Icon icon={faBell} items={{ setting: 'setting', logout: 'fdafgg' }} counter={3} />
          <Icon icon={faMessage} items="" counter={23} />
          {image === undefined ? (
            <Icon icon={faUser} size="lg" items={{ profile: name, setting: 'setting', logout: 'log out' }} />
          ) : (
            <Icon image={image} items={{ profile: name, setting: 'setting', logout: 'log out' }} />
          )}
        </div>
      </nav>
    </>
  )
}
