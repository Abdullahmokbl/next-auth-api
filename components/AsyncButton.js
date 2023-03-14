import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/AsyncButton.module.css'

export default function AsyncButton({ title, disabled, color, children, size = 'lg' }) {
  const backgroundColor = color ? color : 'initial'
  return (
    <div className={disabled ? styles.disButton : styles.button}>
      {!disabled && children}
      <button type="submit" style={{ backgroundColor }}>
        {disabled ? <FontAwesomeIcon icon={faSpinner} size={size} spin /> : title}
      </button>
    </div>
  )
}
