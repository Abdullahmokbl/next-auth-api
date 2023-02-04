import { faEdit, faGear, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPageProducts, getSomeProducts } from '../redux/productsSlice'
import { delUser, getSomeUsers, getPageUsers } from '../redux/usersSlice'
import styles from '../styles/Items.module.css'
import Icon from './Icon'
import Pagination from './Pagination'
import Image from 'next/image'

export default function Users(props) {
  const { type, items, count, pagesCount, paginate, limit = 5 } = props
  const dispatch = useDispatch()
  const { someUsers, pageUsers } = useSelector(state => state.users)
  const { someProducts, pageProducts } = useSelector(state => state.products)
  const itemsPag = pageUsers || pageProducts || items

  const [page, setPage] = useState(1)

  const previous = async () => {
    if (page > 1) {
      type === 'user'
        ? // ? await dispatch(getSomeUsers({ page: page - 1, limit }))
          await dispatch(getPageUsers({ page: page - 1, limit }))
        : // : await dispatch(getSomeProducts({ page: page - 1, limit }))
          await dispatch(getPageProducts({ page: page - 1, limit }))
      setPage(page - 1)
    }
  }
  const next = async () => {
    if (page < pagesCount) {
      type === 'user'
        ? // ? await dispatch(getSomeUsers({ page: page + 1, limit }))
          await dispatch(getPageUsers({ page: page + 1, limit }))
        : // : await dispatch(getSomeProducts({ page: page + 1, limit }))
          await dispatch(getPageProducts({ page: page + 1, limit }))
      setPage(page + 1)
    }
  }

  let id = page * limit - limit
  const info =
    itemsPag?.length !== 0 &&
    itemsPag?.map(item => {
      const { _id, img, name, email, price, gender, seller, date, info } = item
      id++
      return (
        <ul key={_id}>
          <li>{id}</li>
          <li>{img ? <Image src={img.url} width={30} height={30} alt="d" /> : id}</li>
          <li>{name}</li>
          <li>{type === 'user' ? email : price}</li>
          <li>{type === 'user' ? new Date(date).toDateString() : info}</li>
          {/* <li>{type === 'user' ? gender : seller}</li> */}
          <li>
            <div>
              <FontAwesomeIcon icon={faEdit} />
            </div>
            <div
              onClick={() => {
                if (confirm('Do you really want do delete ' + name)) dispatch(delUser(_id))
              }}
            >
              <FontAwesomeIcon icon={faTrash} size="xl" />
            </div>
          </li>
        </ul>
      )
    })

  const Items = () => {
    return (
      <div className={styles.items}>
        <ul>
          <li>#</li>
          <li>Avatar</li>
          <li>Name</li>
          <li>{type === 'user' ? 'Email' : 'Price'}</li>
          <li>{type === 'user' ? 'Created At' : 'Info'}</li>
          {/* <li>{type === 'user' ? 'Gender' : 'Seller'}</li> */}
          <li>Action</li>
        </ul>
        {info}
      </div>
    )
  }

  return (
    <>
      <div className={styles.header}>
        <h3>{type}s</h3>
        <Icon
          icon={faGear}
          items={{ ['admin/' + type + 's/add']: `Add new ${type}`, ['admin/delete_all_' + type + 's']: `Delete all ${type}s` }}
        />
      </div>
      {items?.length !== 0 ? <Items /> : <h3 className={styles.no}>There is no {type}s</h3>}
      {paginate && <Pagination page={page} pagesCount={pagesCount} count={count} previous={previous} next={next} limit={limit} />}
    </>
  )
}
