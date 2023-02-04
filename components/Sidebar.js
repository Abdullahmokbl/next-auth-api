import Link from 'next/link'
import styles from '../styles/Sidebar.module.css'
import ThemeSwitch from './ThemeSwitch'

export default function Sidebar({ open }) {
  return (
    <div className={`${styles.sidebar} ${open && styles.open}`}>
      <Link href="/admin">Dashboard</Link>
      <a href="/admin/users">Users</a>
      <a href="/admin/products">Products</a>
      <Link href="/admin/d">Orders</Link>
      <Link href="/admin/d">Delivery</Link>
      <Link href="/admin/users">Stats</Link>
      <Link href="/admin/users">Logs</Link>
      <Link href="/admin/users">Settings</Link>
      <div>
        <div>Theme</div>
        <ThemeSwitch />
      </div>
    </div>
  )
}
