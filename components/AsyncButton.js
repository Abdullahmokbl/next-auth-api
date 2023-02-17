import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AsyncButton({ title, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      style={disabled ? { opacity: 0.5, cursor: 'initial' } : { opacity: 1, cursor: 'pointer' }}
    >
      {disabled ? <FontAwesomeIcon icon={faSpinner} size="xl" spin /> : title}
    </button>
  )
}
