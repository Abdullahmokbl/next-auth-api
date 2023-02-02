import axios from 'axios'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import Items from '../../components/Items'
import styles from './users.module.css'

export default function users(props) {
  const { user, users, usersCount, u_pagesCount } = props

  const [open, setOpen] = useState(false)
  const handleSidebar = () => {
    setOpen(!open)
  }
  return (
    <>
      <AdminLayout user={user} open={open} handleSidebar={handleSidebar} />
      <div className={`${styles.users} ${open && styles.open}`}>
        <Items type="user" items={users} count={usersCount} pagesCount={u_pagesCount} paginate={true} />
      </div>
    </>
  )
}

export const getServerSideProps = async ctx => {
  const session = await getSession(ctx)
  if (!session) return { notFound: true }
  const token = await getToken(ctx)

  if (token.isAdmin) {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/users?page=1')
      return {
        props: {
          user: session.user,
          users: res.data.users,
          u_pagesCount: res.data.pagesCount,
          usersCount: res.data.usersCount,
        },
      }
    } catch (e) {
      return { props: { user: session.user, users: null } }
    }
  } else {
    return { notFound: true }
  }
}
