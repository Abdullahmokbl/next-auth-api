import React from 'react'
import styles from '../styles/Pagination.module.css'

export default function Pagination(props) {
  const { page, pagesCount, count, previous, next, limit } = props
  if (page === pagesCount) {
    var last_num = count
  } else {
    var last_num = page * limit
  }
  var first_num = page * limit - (limit - 1)

  return (
    <div className={styles.pagination}>
      <span className={page !== 1 ? styles.color : 'disable'} onClick={() => previous()}>
        &lt;
      </span>
      <span>
        {first_num} - {last_num}
      </span>
      <span className={page !== pagesCount ? styles.color : 'disable'} onClick={() => next()}>
        &gt;
      </span>
    </div>
  )
}
