import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/Icon.module.css'
import useComponentVisible from './useComponentVisible'

export default function Icon({ icon, size, title, image, counter, items }) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
  const { locales, pathname } = useRouter()

  return (
    <div className={styles.icon}>
      <div
        onClick={() => {
          setIsComponentVisible(!isComponentVisible)
        }}
      >
        {icon && <FontAwesomeIcon icon={icon} size={size} />}
        {title && title}
        {image && <Image src={image} width={30} height={30} alt="test" />}
        {counter > 0 && <div className={styles.counter}>{counter}</div>}
      </div>
      {items && isComponentVisible && (
        <div ref={ref} className={styles.dropdown}>
          {Object.entries(items).map(([key, value]) => (
            <Link
              key={key}
              href={locales.includes(key) ? pathname : '/' + key}
              locale={key}
              onClick={() => key === 'logout' && signOut({ callbackUrl: '/login' })}
            >
              {value}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
