import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCode } from "../../redux/usersSlice";
import styles from "./index.module.css";

export default function RecoverPassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const { email, mobile } = useSelector((state) => state.users);
  const [code, setCode] = useState({
    email: true,
    mobile: null,
    password: null,
  });
  const handleChange = (e) => {
    setCode({
      [e.target.value]: true,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.password) router.push("/type-password");
    else {
      setDisabled(true);
      dispatch(createCode({ email, mobile }));
      router.push("/code");
    }
  };

  return (
    <div className={styles.recoverPassword}>
      <Head>
        <title>Forgetten password</title>
      </Head>
      <form method="POST" onSubmit={handleSubmit}>
        <h3>Reset your password</h3>
        <h4>ahmed</h4>
        <div className={styles.div}>
          <label htmlFor="email">
            <div>Send code via email</div>
            <div className={styles.secret}>
              {email?.slice(0, 1)}****@*******
            </div>
          </label>
          <input
            type="radio"
            name="recover"
            id="email"
            value="email"
            onChange={handleChange}
            defaultChecked
          />
        </div>
        {/* <div className={styles.div}>
          <label htmlFor='mobile'>
            <div>Send code via SMS</div>
            <div className={styles.secret}>+********{mobile?.slice(-2)}</div>
          </label>
          <input type='radio' name='recover' id='mobile' value='mobile' onChange={handleChange}/>
        </div> */}
        <div className={styles.div}>
          <label htmlFor="password">Enter password to log in</label>
          <input
            type="radio"
            name="recover"
            id="password"
            value="password"
            onChange={handleChange}
          />
        </div>
        <div className={styles.continue}>
          <button
            type="submit"
            disabled={disabled}
            style={
              disabled
                ? { opacity: 0.5, cursor: "initial" }
                : { opacity: 1, cursor: "pointer" }
            }
          >
            {disabled ? (
              <FontAwesomeIcon icon={faSpinner} size="xl" spin />
            ) : (
              "Continue"
            )}
          </button>
          <Link href="/identify">Notyou?</Link>
        </div>
      </form>
    </div>
  );
}
