import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/usersSlice";
import styles from "./index.module.css";

export default function TypePassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.users);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [password, setPassword] = useState("");
  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(true);
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        setError("");
        router.push("/");
      })
      .catch((e) => {
        setError(e.msg);
        setDisabled(false);
      });
  };

  return (
    <div className={styles.typePassword}>
      <Head>
        <title>Forgetten password</title>
      </Head>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="error">{error}</div>
        <label htmlFor="password">
          Type your password
          <input
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </label>
        <div className={styles.login}>
          <Link href="/login">Cancel</Link>
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
              "Login"
            )}
          </button>
        </div>
        <Link href="recover-password" className={styles.try}>
          Try another way
        </Link>
      </form>
    </div>
  );
}
