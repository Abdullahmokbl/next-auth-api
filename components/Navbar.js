// import {faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { signOut, useSession } from 'next-auth/react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import styles from '../styles/Navbar.module.css';
// import Search from './Search';

// export default function Navbar() {

//             <div className={`${styles.ul} ${status === 'loading'? styles.loading:styles.loaded}`}>

//     const welcome = () => {
//         return(
//             <div className={`${styles.ul} ${status === 'loading'? 'loading':'loaded'}`}>
//                 <div className={styles.welcome}>Welcome {user && user.name}</div>
//                 <a onClick={()=> signOut({ callbackUrl: '/login' })}>Logout</a>
//             </div>
//         )
//     }
//   return (
//     <nav className={styles.nav}>
//         <div className={`${styles.cont} container`}>
//             <div className={styles.ul}>
//                 <Link href='/add' className={`${pathname === '/add' && styles.active}`} >Add Item</Link>
//                 <Link href='/cart' data-content={count > 0? count:null} className={`${styles.cart} ${pathname === '/cart' && styles.active}`} ><FontAwesomeIcon icon={faCartShopping} />Cart</Link>
//                 <Link href='/contact' className={`${pathname === '/contact' && styles.active}`} >Contact Us</Link>
//             </div>

//             <div className={`${styles.dropdown} ${showdp? styles.show: ''}`}>
//             <Link href='/add' onClick={()=> setShowdp(false)}>Add Item</Link>
//             <Link href='/cart' data-content={count > 0? count:null} className={styles.cart} onClick={()=> setShowdp(false)}><FontAwesomeIcon icon={faCartShopping} />Cart</Link>
//             <Link href='/contact' onClick={()=> setShowdp(false)}>Contact Us</Link>
//             <div className={styles.line}></div>
//             {!user && <Link href='/login' onClick={()=> setShowdp(false)}>Login</Link>}
//             {!user && <Link href='/signup' onClick={()=> setShowdp(false)}>Sign up</Link>}
//             {user && <Link href=''>Welcome {user && user.name}</Link>}
//             {user && <a onClick={()=> {setShowdp(false);signOut({ callbackUrl: '/login' })}}>Logout</a>}
//             </div>
//         </div>
//     </nav>
//   )
// }

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

export default function Navbar() {
  const { data: session, status } = useSession()
  let user = null
  if (session) user = session.user

  const { cart } = useSelector(state => state.users)
  const [count, setCount] = useState(null)
  useEffect(() => {
    setCount(cart.length)
  }, [cart])

  const { locale } = useRouter()
  const lang = locale === 'ar' ? '🇪🇬 Arabic' : '🇺🇸 English'
  const { name, email, image } = user || {}
  const [dropdownMenu, setDropdownMenu] = useState(false)

  const Auth = () => (
    <div className={styles.login}>
      <Link href="/login">Login</Link>
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
            <Link href="/">Shopping</Link>
          </div>
          <Search />
          <Icon title={lang} items={{ en: '🇺🇸 English', ar: '🇪🇬 Arabic' }} />
        </div>
        <div className={styles.right}>
          <Link href="/cart">
            <Icon icon={faCartShopping} counter={count} />
          </Link>
          {user ? <Welcome /> : <Auth />}
        </div>
        <div className={styles.d_title}>
          <Link href="/">Shopping</Link>
        </div>
        <div className={styles.dropdown_toggle} onClick={() => setDropdownMenu(!dropdownMenu)}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
        <div className={`${styles.dropdown_menu} ${dropdownMenu ? styles.open : undefined}`}>
          <Icon title={lang} items={{ en: '🇺🇸 English', ar: '🇪🇬 Arabic' }} />
          <Link href="/cart">
            <Icon icon={faCartShopping} counter={count} />
          </Link>
          {user ? <Welcome /> : <Auth />}
        </div>
      </nav>
    </>
  )
}
