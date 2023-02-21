import React, { useState } from 'react'
import AdminNavbar from './AdminNavbar'
import AdminSidebar from './AdminSidebar'
import styles from '../styles/AdminLayout.module.css'

export default function AdminLayout(props) {
  const [open, setOpen] = useState(false)
  const handleSidebar = () => {
    setOpen(!open)
  }
  return (
    <>
      <AdminNavbar open={open} handleSidebar={handleSidebar} />
      <div style={{ height: '60px' }}></div>
      <AdminSidebar open={open} />
      {/* {React.cloneElement(props.children, { open })} */}
      <div className={`${styles.main} ${open && styles.open}`}>{props.children}</div>
    </>
  )
}
