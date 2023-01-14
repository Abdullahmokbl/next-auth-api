import {faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Navbar.module.css';
import Search from './Search';

export default function Navbar() {
    const router = useRouter();
    const { data: session, status } = useSession();
    let user = null;
    if(session) user = session.user;

    const { cart } = useSelector(state => state.users)
    const [count, setCount] = useState(null)
    useEffect(() => {
        setCount(cart.length);
    },[cart])

    const pathname = router.pathname;
    const [showdp, setShowdp] = useState(false)

    const auth = () => {
        return(
            <div className={`${styles.ul} ${status === 'loading'? styles.loading:styles.loaded}`}>
                <Link href='/login'>Login</Link>
                <Link href='/signup'>Signup</Link>
            </div>
        )
    }
    const welcome = () => {
        return(
            <div className={`${styles.ul} ${status === 'loading'? 'loading':'loaded'}`}>
                <div className={styles.welcome}>Welcome {user && user.name}</div>
                <a onClick={()=> signOut({ callbackUrl: '/login' })}>Logout</a>
            </div>
        )
    }
  return (
    <nav className={styles.nav}>
        <div className={`${styles.cont} container`}>
            <div className={styles.title}><Link href='/'>Shopping</Link></div>
            <Search />
            <div className={styles.ul}>
                <Link href='/add' className={`${pathname === '/add' && styles.active}`} >Add Item</Link>
                <Link href='/cart' data-content={count > 0? count:null} className={`${styles.cart} ${pathname === '/cart' && styles.active}`} ><FontAwesomeIcon icon={faCartShopping} />Cart</Link>
                <Link href='/contact' className={`${pathname === '/contact' && styles.active}`} >Contact Us</Link>
            </div>
            {user? welcome(): auth()}
            <div className={`${styles.menu} ${showdp? styles.active:''}`} onClick={() => !showdp ? setShowdp(true): setShowdp(false)}>
                <div></div>
                <div></div>
            </div>
            <div className={`${styles.dropdown} ${showdp? styles.show: ''}`}>
            <Link href='/add' onClick={()=> setShowdp(false)}>Add Item</Link>
            <Link href='/cart' data-content={count > 0? count:null} className={styles.cart} onClick={()=> setShowdp(false)}><FontAwesomeIcon icon={faCartShopping} />Cart</Link>
            <Link href='/contact' onClick={()=> setShowdp(false)}>Contact Us</Link>
            <div className={styles.line}></div>
            {!user && <Link href='/login' onClick={()=> setShowdp(false)}>Login</Link>}
            {!user && <Link href='/signup' onClick={()=> setShowdp(false)}>Sign up</Link>}
            {user && <Link href=''>Welcome {user && user.name}</Link>}
            {user && <a onClick={()=> {setShowdp(false);signOut({ callbackUrl: '/login' })}}>Logout</a>}
            </div>
        </div>
    </nav>
  )
}
