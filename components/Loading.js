import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from '../styles/Loading.module.css'

export default function Loading() {
  return (
    <div className={styles.loading}>
      {/* <div className={styles.circle}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div> */}
      <FontAwesomeIcon icon={faSpinner} spin size="xl" />
    </div>
  )
}
