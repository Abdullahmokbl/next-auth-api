import React, { useState } from "react";
import Link from "next/link";
import styles from "./index.module.css";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF, faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { signup } from "../../redux/usersSlice";

export default function Signup() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    gender: "male",
  });

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setDisabled(true);
    dispatch(signup(user))
      .unwrap()
      .then(() => router.push("/login"))
      .catch(e => {
        setDisabled(false);
        setError(e.msg);
      });
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Sign up</title>
      </Head>
      <div className={styles.signup}>
        <h3>Signup</h3>
        <div className="error">{error}</div>
        <form method="POST" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" onChange={handleChange} required />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} required />
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChange} required />
          <label htmlFor="gender" className={styles.gender} onChange={handleChange}>
            <input type="radio" name="gender" value="male" defaultChecked />
            Male
            <input type="radio" name="gender" value="female" />
            Female
          </label>
          <button
            type="submit"
            disabled={disabled}
            style={disabled ? { opacity: 0.5, cursor: "initial" } : { opacity: 1, cursor: "pointer" }}
          >
            {disabled ? <FontAwesomeIcon icon={faSpinner} size="xl" spin /> : "Sign Up"}
          </button>
        </form>
        <div className={styles.or}>
          <span>OR</span>
        </div>
        <div className={styles.svg}>
          <a onClick={() => signIn("google", { callbackUrl: "/" })}>
            <FontAwesomeIcon icon={faGoogle} size="xl" />
          </a>
          <a onClick={() => signIn("facebook", { callbackUrl: "/" })}>
            <FontAwesomeIcon icon={faFacebookF} size="xl" />
          </a>
          <a onClick={() => signIn("github", { callbackUrl: "/" })}>
            <FontAwesomeIcon icon={faGithub} size="xl" />
          </a>
        </div>
        <div className={styles.login}>
          ALready a user? <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
