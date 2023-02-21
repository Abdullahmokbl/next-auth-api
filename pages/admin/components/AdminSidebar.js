import Link from 'next/link'
import styles from '../styles/AdminSidebar.module.css'
import ThemeSwitch from '../../../components/ThemeSwitch'

export default function AdminSidebar({ open }) {
  return (
    <div className={`${styles.sidebar} ${open && styles.open}`}>
      <Link href="/admin/dashboard">Dashboard</Link>
      <Link href="/admin/users">Users</Link>
      <Link href="/admin/products">Products</Link>
      <Link href="/admin/d">Orders</Link>
      <Link href="/admin/d">Delivery</Link>
      <Link href="/admin/users">Stats</Link>
      <Link href="/admin/users">Logs</Link>
      <Link href="/admin/settings">Settings</Link>
      <div>
        <div>Theme</div>
        <ThemeSwitch />
      </div>
    </div>
  )
}
