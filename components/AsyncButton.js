import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AsyncButton({ title, disabled, color }) {
  const backgroundColor = color ? color : 'initial'
  return (
    <button
      type="submit"
      disabled={disabled}
      style={disabled ? { opacity: 0.5, cursor: 'initial', backgroundColor } : { opacity: 1, cursor: 'pointer', backgroundColor }}
    >
      {disabled ? <FontAwesomeIcon icon={faSpinner} size="xl" spin /> : title}
    </button>
  )
}
