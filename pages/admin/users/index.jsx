import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import AdminLayout from '../../../components/AdminLayout'
import Items from '../../../components/Items'
import styles from './index.module.css'
import { setUsers } from '../../../redux/usersSlice'

export default function users({ users }) {
  // const { users, usersCount, u_pagesCount } = props
  const count = users?.length || 0
  const limit = 7
  const pagesCount = Math.ceil(count / limit)
  console.log(users)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setUsers(users))
  })

  const [open, setOpen] = useState(false)
  const handleSidebar = () => {
    setOpen(!open)
  }
  return (
    <>
      <AdminLayout open={open} handleSidebar={handleSidebar} />
      <div className={`${styles.users} ${open && styles.open}`}>
        <Items type="user" items={users?.slice(0, limit)} count={count} pagesCount={pagesCount} paginate={true} limit={limit} />
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/users')
    return {
      props: {
        users: res.data,
        //   users: res.data.users,
        //   u_pagesCount: res.data.pagesCount,
        //   usersCount: res.data.usersCount,
      },
      revalidate: 60,
    }
  } catch (e) {
    return { props: { users: null } }
  }
}
