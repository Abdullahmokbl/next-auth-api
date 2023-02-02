import styles from '../styles/Cards.module.css'

export default function Cards({ children }) {
  return <div className={styles.cards}>{children}</div>
}
