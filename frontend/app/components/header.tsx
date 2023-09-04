"use client";
import React, { useState } from "react";
import styles from "@/app/Styles/Header.module.css";
import "@fontsource/roboto/700.css";
import { AiOutlineSearch } from "react-icons/ai";
import { SlLocationPin } from "react-icons/sl";
import { CgToolbox } from "react-icons/cg";
import Lottie from "lottie-react";
import job from "@/app/lottieAnimation/Job.json";
import job2 from "@/app/lottieAnimation/Job2.json";
import job3 from "@/app/lottieAnimation/Job3.json";
import job4 from "@/app/lottieAnimation/Job4.json";
import axios from "axios";
import Link from "next/link";
import LoginPopup from "./LoginPopup";
import RegistrationPopup from "@/app/components/RegistrationPopup";
import AccountMenu from "./userProfile";
import Button from "@mui/material/Button";

const Header = () => {
  const [experience, setExperience] = useState(0);
  const [showExperience, setShowExperience] = useState(false);
  const [skillsOrJobTitle, setSkillsOrJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // console.log(isLoggedIn);
  const testHandler = () => {
    setIsLoggedIn(false);
  };

  const handleCount = () => {
    // console.log("Increment button clicked");
    setExperience(experience + 1);
    setShowExperience(true);
  };

  const handleDecrement = () => {
    // console.log("Decrement button clicked");
    if (experience > 0) {
      setExperience(experience - 1);
    }
  };

  const handleSearch = () => {
    const searchData = {
      skillsOrJobTitle,
      location,
      experience,
    };

    // fetch(`https://dummyjson.com/posts/search?q=${skillsOrJobTitle}`)
    //   .then((res) => res.json())
    //   .then(console.log);

    axios
      .post("https://dummyjson.com/posts/search?q=", searchData)
      .then((response) => {
        const data = response.data;
        // Handling the response from the backend
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.headerMain}>
      <div className={styles.headerSpace}>
        <a href="/">
          <img className={styles.logo} src="Logo.png" alt="logo" />
        </a>
        <div className={styles.buttonContainer}>
          <p className={styles.btnLogin}>
            {isLoggedIn ? <LoginPopup test={testHandler} /> : ""}
          </p>
          <p className={styles.btnRegister}>
            {isLoggedIn ? <RegistrationPopup test={testHandler} /> : ""}
          </p>
          {isLoggedIn ? (
            <Link href="/employers">
              <Button className={styles.btnEmployer_Link}>For employers</Button>
            </Link>
          ) : (
            ""
          )}
          <AccountMenu />
        </div>
      </div>
      <div className={styles.search}>
        <div className={styles.search_bar}>
          <div className={styles.search_box}>
            <div className={styles.iconWrapper}>
              <AiOutlineSearch className={styles.icon} />
              <input
                type="text"
                placeholder="Skills or Job Title"
                className={styles.searchInput}
                value={skillsOrJobTitle}
                onChange={(e) => {
                  setSkillsOrJobTitle(e.target.value);
                  // console.log(skillsOrJobTitle);
                }}
              />
            </div>
          </div>
          <div className={styles.search_box}>
            <div className={styles.iconWrapper}>
              <SlLocationPin className={styles.icon} />
              <input
                type="text"
                placeholder="Location"
                className={styles.searchInput}
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  // console.log(location);
                }}
              />
            </div>
          </div>
          <div className={styles.search_box}>
            <div className={styles.inputContainer}>
              <CgToolbox className={styles.iconbox} />
              <input
                type="number"
                placeholder={showExperience ? "Experience" : "Experience"}
                className={`${styles.searchInput} ${styles.hide}`}
                value={showExperience ? experience : ""}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setExperience(Number(inputValue));
                  // console.log(experience);
                }}
              />
              <div className={styles.arrowButtons}>
                <button className={styles.arrowButton} onClick={handleCount}>
                  ▲
                </button>
                <button
                  className={styles.arrowButton}
                  onClick={() => handleDecrement()}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
          <button className={styles.search_button} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <Lottie animationData={job} style={{ height: 400, width: 400 }} />
      <Lottie
        animationData={job2}
        style={{
          height: 400,
          width: 400,
          marginLeft: "25vw",
          marginTop: "-25vw",
        }}
      />
      <Lottie
        animationData={job3}
        style={{
          height: 400,
          width: 400,
          marginLeft: "50vw",
          marginTop: "-25vw",
        }}
      />
      <Lottie
        animationData={job4}
        style={{
          height: 340,
          width: 400,
          marginLeft: "70vw",
          marginTop: "-38vw",
        }}
      />
    </div>
  );
};

export default Header;
