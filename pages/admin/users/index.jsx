import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Items from '../../../components/Items'
import styles from './index.module.css'
import { setUsers } from '../../../redux/usersSlice'

export default function users({ users }) {
  const count = users?.length || 0
  const limit = 7
  const pagesCount = Math.ceil(count / limit)

  const dispatch = useDispatch()
  useEffect(() => {
    if (users) dispatch(setUsers(users))
  })

  return (
    <div className={styles.users}>
      {users ? (
        <Items type="user" items={users?.slice(0, limit)} count={count} pagesCount={pagesCount} paginate={true} limit={limit} />
      ) : (
        <h2 style={{ textAlign: 'center' }}>There is no users</h2>
      )}
    </div>
  )
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_HOST + '/api/users')
    return {
      props: { users: res.data },
      revalidate: 60,
    }
  } catch (e) {
    return { props: { users: null } }
  }
}
