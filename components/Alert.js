import React, { useEffect, useState } from 'react'
import styles from '../styles/Alert.module.css'

export default function Alert({ children, msg, type }) {
  const [isShow, setIsShow] = useState(true)
  const [opacity, setOpacity] = useState(1)
  // useEffect(() => {
  //   setTimeout(() => setOpacity(0), 4000)
  //   setTimeout(() => setIsShow(false), 4500)
  // })
  const renderElAlert = function () {
    return React.cloneElement(children)
  }
  return (
    <div>
      {isShow && (
        <div style={{ opacity }} className={`${styles.alert} ${styles[type]}`}>
          <span className={styles.closebtn} onClick={() => setIsShow(false)}>
            &times;
          </span>
          {children ? renderElAlert() : msg}
        </div>
      )}
    </div>
  )
}
