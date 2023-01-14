import React, { useRef, useState} from 'react';
import { signIn, getCsrfToken} from 'next-auth/react';
import Link from 'next/link';
import styles from '../../styles/Login.module.css';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import Head from 'next/head';
import { faEye, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function Login({ csrfToken }) {
  const router = useRouter();

  const emailInput = useRef();
  const passwordInput = useRef();

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    remember: false
  })

  const togglePassword = () => {
    setShowPass(!showPass)
  }

  const handleChange = e => {
    if(e.target.name === 'remember'){
      setUser({
        ...user,
        [e.target.name] : e.target.checked
      })
    }else{
      setUser({
        ...user,
        [e.target.name] : e.target.value
      })
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setDisabled(true);
    const status = await signIn('Credentials', {...user, redirect:false, callbackUrl: '/'})
    console.log(status)
    if(status.ok){
      setError('')
      router.push('/')
    }else{
      setError('Invalid credentials, please try again.')
      setDisabled(false);
    }
  }
  return (
    <div className={styles.page}>
      <Head><title>Login</title></Head>
        <div className={styles.login}>
            <h3>Login</h3>
            <div className='error'>{error}</div>
            <form method='POST' onSubmit={handleSubmit}>
                <input
                  name="csrfToken"
                  type="hidden"
                  defaultValue={csrfToken}
                />
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' onChange={handleChange} required/>
                <label htmlFor='password'>Password</label>
                <div style={{position: 'relative'}}>
                  <input type={!showPass? 'password':'text'} name='password' onChange={handleChange} required/>
                  <FontAwesomeIcon className={styles.eye} onClick={togglePassword} icon={faEye} />
                </div>
                <label>
                  <input type='checkbox' name='remember' onChange={handleChange} />Remember me?
                </label>
                <button type='submit' disabled={disabled} style={disabled? {opacity: .5,cursor: 'initial'}:{opacity: 1,cursor:'pointer'}} >{disabled? <FontAwesomeIcon icon={faSpinner} size='xl' spin/>:'Login'}</button>
            </form>
            <div className={styles.forget}><Link href='identify'>Forget password?</Link></div>
            <div className={styles.or}><span>OR</span></div>
            <div className={styles.svg}>
              <a onClick={() => signIn('google', { callbackUrl: '/' })}><FontAwesomeIcon icon={faGoogle} size='xl'/></a>
              <a onClick={() => signIn('facebook', { callbackUrl: '/' })}><FontAwesomeIcon icon={faFacebookF} size='xl'/></a>
              <a onClick={() => signIn('github', { callbackUrl: '/' })}><FontAwesomeIcon icon={faLinkedinIn} size='xl'/></a>
            </div>
            <div className={styles.signup}>Need an account? <Link href='/signup'>Sign up</Link></div>
        </div>
    </div>
  )
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}