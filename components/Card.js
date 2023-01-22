import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Card.module.css";

export default function Card({ icon, text, number }) {
  return (
    <div className={styles.card}>
      <div>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <p className={styles.text}>{text}</p>
        <p className={styles.number}>{number}</p>
      </div>
    </div>
  );
}
