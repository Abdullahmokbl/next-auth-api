import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
    const { data: session, status } = useSession()
    console.log(session)
    let user = null;
    if(session) user = session.user;

    const pathname = useRouter().pathname;
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
            <div className={styles.ul}>
                <Link href='/add' className={`${pathname === '/add' && styles.active}`} >Add Item</Link>
                <Link href='/cart' className={`${pathname === '/cart' && styles.active}`} >Cart</Link>
                <Link href='/contact' className={`${pathname === '/contact' && styles.active}`} >Contact Us</Link>
            </div>
            {user? welcome(): auth()}
            <div className={`${styles.menu} ${showdp? styles.active:''}`} onClick={() => !showdp ? setShowdp(true): setShowdp(false)}>
                <div></div>
                <div></div>
            </div>
            <div className={`${styles.dropdown} ${showdp? styles.show: ''}`}>
            <Link href='/add' onClick={()=> setShowdp(false)}>Add Item</Link>
            <Link href='/cart' onClick={()=> setShowdp(false)}>Cart</Link>
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
