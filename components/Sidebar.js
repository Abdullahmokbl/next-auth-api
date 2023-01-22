import Link from "next/link";
import styles from "../styles/Sidebar.module.css";
import ThemeSwitch from "./ThemeSwitch";

export default function Sidebar({ open }) {
  return (
    <div className={`${styles.side} ${open && styles.open}`}>
      <div>
        <Link href="/admin/users">Dashboard</Link>
      </div>
      <div>
        <Link href="/admin/users">Users</Link>
      </div>
      <div>
        <Link href="/admin/products">Products</Link>
      </div>
      <div>
        <Link href="/admin/d">Orders</Link>
      </div>
      <div>
        <Link href="/admin/d">Delivery</Link>
      </div>
      <div>
        <Link href="/admin/users">Stats</Link>
      </div>
      <div>
        <Link href="/admin/users">Logs</Link>
      </div>
      <div>
        <Link href="/admin/users">Settings</Link>
      </div>
      <div>
        <div>Theme</div>
        <ThemeSwitch />
      </div>
    </div>
  );
}
