import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SearchByEmail } from '../../../redux/usersSlice'
import styles from './index.module.css'

export default function Identify() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [disabled, setDisabled] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const handleChange = e => {
    setEmail(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    setDisabled(true)
    dispatch(SearchByEmail(email))
      .unwrap()
      .then(() => {
        setError('')
        router.push('/type-password')
      })
      .catch(e => {
        setError(e.msg)
        setDisabled(false)
      })
  }
  return (
    <div className={styles.identify}>
      <Head>
        <title>Forgetten password</title>
      </Head>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="error">{error}</div>
        <label htmlFor="email">
          Search by Email
          <input type="email" name="email" placeholder="email@example.com" onChange={handleChange} required />
        </label>
        <div className={styles.search}>
          <Link href="/login">Cancel</Link>
          <button
            type="submit"
            disabled={disabled}
            style={disabled ? { opacity: 0.5, cursor: 'initial' } : { opacity: 1, cursor: 'pointer' }}
          >
            {disabled ? <FontAwesomeIcon icon={faSpinner} size="xl" spin /> : 'Search'}
          </button>
        </div>
      </form>
    </div>
  )
}
