import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Code.module.css';
import { verifyCode } from '../../redux/usersSlice';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Code() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { email } = useSelector(state => state.users);
    const [error, setError] = useState(false);
    const [code, setCode] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [time, SetTime] = useState(30)
    const timer = () => SetTime(time-1)
    useEffect(()=>{
        if(!error) return;
        if (time <= 0) {
            setDisabled(false);
            setError(false);
            return;
        }
        const intervalID = setInterval(timer, 1000)
        return () => {
            clearInterval(intervalID);
        }
    })
    const handleChange = e => {
        setCode(Number(e.target.value))
    }
    const handleSubmit = e => {
        e.preventDefault();
        setDisabled(true);
        dispatch(verifyCode({email, code}))
        .unwrap()
        .then(() => router.push('/'))
        .catch( e => {
            setError(true)
            SetTime(30)
        })
    }
  return (
    <div className={styles.code}>
        <form method='POST' onSubmit={handleSubmit}>
            <h4>Please check your emails for a message with your code. Your code is 6 numbers long.</h4>
            <div className='error'>{error && 'Wrong code! please try again in ' + time + 's'}</div>
            <input type='text' name='code' placeholder='Enter Code' onChange={handleChange} required/>
            <button type='submit' disabled={disabled} style={disabled? {opacity: .5,cursor: 'initial'}:{opacity: 1,cursor:'pointer'}} >{disabled? <FontAwesomeIcon icon={faSpinner} size='xl' spin/>:'Login'}</button>
        </form>
    </div>
  )
}
