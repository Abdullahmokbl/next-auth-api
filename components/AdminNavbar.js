import {
  faBars,
  faBell,
  faEllipsisVertical,
  faExpand,
  faList,
  faMessage,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../styles/AdminNavbar.module.css";
import NavIcons from "./NavIcons";

export default function AdminNavbar({ open, handleSidebar, user }) {
  const { locale, pathname } = useRouter();
  const lang = locale === "ar" ? "🇪🇬 Arabic" : "🇺🇸 English";
  const [language, setLanguage] = useState(lang);
  const { name, email, image } = user;
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  const [notifiDropdown, setNotifiDropdown] = useState(false);
  const [messageDropdown, setMessageDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setIsNight(localStorage.getItem("theme") === "dark" && true);
  });
  const handleLang = lang => {
    localStorage.setItem("lang", lang);
  };
  const handleScreen = () => {
    if (!Boolean(document.fullscreenElement)) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  return (
    <>
      <nav className={`${styles.nav} ${open ? styles.open : undefined}`}>
        <div className={styles.left}>
          <div onClick={handleSidebar}>
            <FontAwesomeIcon icon={faList} size="xl" />
          </div>
          <div className={styles.title}>Shopping</div>
          <div className={styles.langs}>
            <div className={styles.lang} onClick={() => setLangDropdown(!langDropdown)}>
              {language}
            </div>
            <div className={`${styles.dropdown} ${langDropdown ? styles.open : undefined}`}>
              <Link href={pathname} locale="en" onClick={() => handleLang("🇺🇸 English")}>
                🇺🇸 English
              </Link>
              <Link href={pathname} locale="ar" onClick={() => handleLang("🇪🇬 Arabic")}>
                🇪🇬 Arabic
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div
            onClick={() => {
              setTheme(isNight ? "light" : "dark");
              setIsNight(!isNight);
            }}
          >
            {isNight ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
          </div>
          <div className={styles.full} onClick={handleScreen}>
            <FontAwesomeIcon icon={faExpand} />
          </div>
          <NavIcons icon={faBell} items={["d", "f"]} counter={3} />
          <NavIcons icon={faMessage} items="" counter={23} />
          <NavIcons image={image} items="" />
        </div>
        <div className={styles.sidebar_toggle} onClick={handleSidebar}>
          <FontAwesomeIcon icon={faBars} size="xl" />
        </div>
        <div className={styles.dropdown_toggle} onClick={() => setDropdownMenu(!dropdownMenu)}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
        <div className={`${styles.dropdown_menu} ${dropdownMenu ? styles.open : undefined}`}>
          <div className={styles.langs}>
            <div className={styles.lang} onClick={() => setLangDropdown(!langDropdown)}>
              {language}
            </div>
            <div className={`${styles.dropdown} ${langDropdown ? styles.open : undefined}`}>
              <Link href={pathname} locale="en" onClick={() => handleLang("🇺🇸 English")}>
                🇺🇸 English
              </Link>
              <Link href={pathname} locale="ar" onClick={() => handleLang("🇪🇬 Arabic")}>
                🇪🇬 Arabic
              </Link>
            </div>
          </div>
          <div
            onClick={() => {
              setTheme(isNight ? "light" : "dark");
              setIsNight(!isNight);
            }}
          >
            {isNight ? <FontAwesomeIcon icon={faSun} /> : <FontAwesomeIcon icon={faMoon} />}
          </div>
          <div className={styles.full} onClick={handleScreen}>
            <FontAwesomeIcon icon={faExpand} />
          </div>
          <NavIcons icon={faBell} items={["d", "f"]} counter={3} />
          <NavIcons icon={faMessage} items="" counter={23} />
          <NavIcons image={image} items="" />
        </div>
      </nav>
    </>
  );
}
