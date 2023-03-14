import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sendMail } from '../redux/usersSlice'
import styles from './../styles/Footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export default function Footer() {
  const { t } = useTranslation('footer')
  const dispatch = useDispatch()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const handleChange = e => {
    setEmail({
      email: e.target.value,
    })
  }
  const handleSubmit = e => {
    e.preventDefault()
    dispatch(sendMail(email))
      .unwrap()
      .then(() => {
        setMsg(t('Thank you for subscribing'))
      })
      .catch(e => {
        setMsg(e.msg)
      })
  }

  return (
    <footer className={styles.footer}>
      <section>
        <div className={styles.sec}>
          <div>Customer care</div>
          <div className={styles.line}></div>
          <div>
            <Link href="contact">{t('Contact Us')}</Link>
          </div>
          <div>
            <Link href="faqs">{t('FAQS')}</Link>
          </div>
          <div>
            <Link href="terms-of-use">{t('Terms of use')}</Link>
          </div>
          <div>
            <Link href="privacy-policy">{t('Privacy policy')}</Link>
          </div>
        </div>
        <div className={styles.sec}>
          <div>{t('About')}</div>
          <div className={styles.line}></div>
          <p>
            Curators of ethical fashion and New Zealand designed. Shopping is a destination for style seekers. Located in
            Masterton's boutique Kuripuni Village, Shopping is lovingly and carefully curated by Owner and Buyer. Dedicated to NZ
            designed, ethical fashion and accessories- Shopping is a beautiful style edit. Spliced on the rack, you will discover
            a mix of your favourite boutique labels, lounge-wear and lifestyle products. Shopping presents small, regular
            collections from designers that are limited in nature with a high rotation. For all women, all sizes, Shopping is the
            go-to fashion boutique of the Wairarapa. Purchases made at Shopping support suppliers and makers within NZ- shop
            local, shop small! Feel inspired exploring a beautifully designed space that reflects a love for styling and creating.
            Style tips await from a small, warm team who adore fashion- the current, the classic and the refined. A truly
            authentic element of the store, Owner, produces in-house clothing label My Boyfriends Back from Shopping, for
            Shopping. Shoppers can order different colours in signature styles, and select from seasonal pieces available instore.
            MBB is designed using surplus fabric stocks and is made in Auckland, NZ.
          </p>
        </div>
        <div className={styles.sec}>
          <div>{t('Newsletter')}</div>
          <div className={styles.line}></div>
          <p>{t('Join our mailing list')}</p>
          <form method="POST" onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="example@email.com" onChange={handleChange} required />
            <input type="submit" value={t('Subscribe')} />
          </form>
          <div className={styles.msg}>{msg}</div>
        </div>
      </section>
      <div className={styles.text}>{t('Designed & Developed by Abdullah Mokbl')}</div>
      <div className={styles.icons}>
        <a href="https://eg.linkedin.com/in/abdullah-mokbl-8667a8ba">
          <FontAwesomeIcon icon={faLinkedinIn} size="xl" />
        </a>
        <a href="https://twitter.com/abdullahmokbl">
          <FontAwesomeIcon icon={faTwitter} size="xl" />
        </a>
        <a href="https://github.com/Abdullahmokbl">
          <FontAwesomeIcon icon={faGithub} size="xl" />
        </a>
      </div>
      <ul className={styles.lang}>
        {router.locales.map(lang => (
          <Link key={lang} href={router.pathname} locale={lang} className={router.locale === lang ? styles.active : undefined}>
            {lang}
          </Link>
        ))}
      </ul>
    </footer>
  )
}
