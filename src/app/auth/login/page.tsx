"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();
  const handleSumbit = async (event: any) => {
    event.preventDefault();
    setLoading(false);
    setError("");
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        redirect: false,
        email: event.target.email.value,
        password: event.target.password.value,
      });
      console.log(response);
      if (response?.ok) {
        push("/");
        setLoading(false);
      }

      if (response?.error) {
        setError(response.error);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>Sign in to your account</h1>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSumbit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              className={styles.input}
              placeholder="name@company.com"
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Loading..." : "Sign in"}
          </button>
        </form>
        <p className={styles.signupLink}>
          Don't have an account yet? <Link href="/registrasi">Sign up</Link>
        </p>
        <button
          onClick={() => signIn("google")}
          className={styles.googleButton}
        >
          <Image
            src="/images/googleauth.png"
            width={20}
            height={20}
            alt="google"
            className={styles.googleIcon}
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
