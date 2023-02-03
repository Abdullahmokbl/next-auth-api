import axios from 'axios'
import { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import Items from '../../components/Items'
import styles from './users.module.css'

export default function users(props) {
  const { users, usersCount, u_pagesCount } = props

  const [open, setOpen] = useState(false)
  const handleSidebar = () => {
    setOpen(!open)
  }
  return (
    <>
      <AdminLayout open={open} handleSidebar={handleSidebar} />
      <div className={`${styles.users} ${open && styles.open}`}>
        <Items type="user" items={users} count={usersCount} pagesCount={u_pagesCount} paginate={true} limit={10} />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/users?page=1&limit=10')
    return {
      props: {
        users: res.data.users,
        u_pagesCount: res.data.pagesCount,
        usersCount: res.data.usersCount,
      },
      revalidate: 60,
    }
  } catch (e) {
    return { props: { users: null } }
  }
}
