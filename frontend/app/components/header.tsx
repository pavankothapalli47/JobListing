"use client";
import React, { useState, useEffect } from "react";
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
import AccountMenu from "@/app/components/userMenu";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const Header = () => {
  const [experience, setExperience] = useState(0);
  const [showExperience, setShowExperience] = useState(false);
  const [JobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [jobTitleOptions, setJobTitleOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [experienceOptions, setExperienceOptions] = useState([]);

  useEffect(() => {
    // Fetch your job title options and set them
    // Example fetch:
    // axios.get("https://api.example.com/job-titles").then((response) => {
    //   setJobTitleOptions(response.data);
    // });
    // Fetch your location options and set them
    // Example fetch:
    // axios.get("https://api.example.com/locations").then((response) => {
    //   setLocationOptions(response.data);
    // });
    // Fetch your experience options and set them
    // Example fetch:
    // axios.get("https://api.example.com/experience").then((response) => {
    //   setExperienceOptions(response.data);
    // });
  }, []);

  // console.log(isLoggedIn);
  const testHandler = () => {
    setIsLoggedIn(false);
  };

  const handleSearch = () => {
    const searchData = {
      JobTitle,
      location,
      experience,
    };

    // fetch(`https://dummyjson.com/posts/search?q=${JobTitle}`)
    //   .then((res) => res.json())
    //   .then(console.log);

    axios
      .post("http://localhost:3001/api/jobs/search", searchData)
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
              <Autocomplete
                options={jobTitleOptions}
                onInputChange={(e, newValue) => {
                  setJobTitle(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Job Title"
                    variant="outlined"
                    className={styles.searchInput}
                    style={{
                      width: "320px",
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.search_box}>
            <div className={styles.iconWrapper}>
              <SlLocationPin className={styles.icon} />
              <Autocomplete
                options={locationOptions}
                onInputChange={(e, newValue) => {
                  setLocation(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Location"
                    variant="outlined"
                    style={{ width: "320px" }}
                    className={styles.searchInput}
                  />
                )}
              />
            </div>
          </div>
          <div className={styles.search_box}>
            <div className={styles.inputContainer}>
              <CgToolbox className={styles.iconbox} />
              <Autocomplete
                options={experienceOptions}
                onInputChange={(e, newValue) => {
                  setExperience(Number(newValue));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={showExperience ? "Experience" : "Experience"}
                    variant="outlined"
                    className={styles.searchInput}
                    type={showExperience ? "number" : "text"}
                    style={{ width: "320px" }}
                  />
                )}
              />
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

// const handleCount = () => {
//   // console.log("Increment button clicked");
//   setExperience(experience + 1);
//   setShowExperience(true);
// };

// const handleDecrement = () => {
//   // console.log("Decrement button clicked");
//   if (experience > 0) {
//     setExperience(experience - 1);
//   }
// };
{
  /* <div className={styles.arrowButtons}>
                <button className={styles.arrowButton} onClick={handleCount}>
                  ▲
                </button>
                <button
                  className={styles.arrowButton}
                  onClick={() => handleDecrement()}
                >
                  ▼
                </button>
              </div> */
}
