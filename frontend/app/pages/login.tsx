"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "app/styles/login.module.css";
import { FcGoogle } from "react-icons/fc";
import { GrLinkedin } from "react-icons/gr";

export default function LoginForm() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    setErrorMessage(""); // Clearing the previous error messages
    try {
      // Sending email/phone and password to the backend for verification
      const response = await axios.post("https://joblisting-4tpk.onrender.com/api/login", {
        emailOrPhone,
        password,
      });

      if (response.status === 200) {
        // successful login then to homepage
        window.location.href = "/home";
      } else {
        setErrorMessage(response.data.message); // Displaying the error message from backend
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLoginViaOtp = () => {};

  return (
    <div className={styles.popup_background}>
      <div className={styles.popup_content}>
        <div className={styles.login_form}>
          <div className={styles.login_container}>
            <h2 className={styles.heading}>Welcome back to JobPuzzlePro</h2>
            <div className={styles.input_container}>
              <input
                type="text"
                placeholder="Enter Email ID/Phone Number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
            </div>
            <div className={styles.input_container}>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.error_message_container}>
              {errorMessage && (
                <div className={styles.error_message}>{errorMessage}</div>
              )}
            </div>
            <div className={styles.forgot_password}>Forgot Password?</div>
            <button className={styles.login_button} onClick={handleLogin}>
              Log In
            </button>
            <div className={styles.login_via_otp} onClick={handleLoginViaOtp}>
              Log in via OTP
            </div>
          </div>
          <div className={styles.popup_buttons}>
            <button
              className={`${styles.popup_button} ${styles.social_button}`}
            >
              <FcGoogle />
            </button>
            <button
              className={`${styles.popup_button} ${styles.social_button}`}
            >
              <GrLinkedin />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
