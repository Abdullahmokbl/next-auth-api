import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "../styles/NavIcons.module.css";
import useComponentVisible from "./useComponentVisible";

export default function AdminNavIcons({ icon, image, counter, items }) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);
  const [dropdown, setDropDown] = useState(false);
  return (
    <div className={styles.icon}>
      <div
        onClick={() => {
          setDropDown(!dropdown);
          setIsComponentVisible(!isComponentVisible);
        }}
      >
        {icon && <FontAwesomeIcon icon={icon} />}
        {image && <Image src={image} width={30} height={30} alt="test" />}
        {items && <div className={styles.counter}>{items.length}</div>}
        {/* {counter && <div className={styles.counter}>{counter}</div>} */}
      </div>
      <div ref={ref} className={`${styles.dropdown} ${dropdown && isComponentVisible ? styles.open : undefined}`}>
        {/* {items.map(i => (
          <Link href="">sdsfsdf</Link>
        ))} */}
        <Link href="/">sdsfsdf</Link>
        <Link href="/">sdsfsdf</Link>
        <Link href="/">sdsfsdf</Link>
        <Link href="/">sdsfsdf</Link>
        <Link href="/">sdsfsdf</Link>
      </div>
    </div>
  );
}
