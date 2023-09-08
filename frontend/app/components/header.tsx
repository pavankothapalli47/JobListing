"use client";
import React, { useState, useEffect } from "react";
import styles from "@/app/styles/header.module.css";
import "@fontsource/roboto/700.css";
// import { AiOutlineSearch } from "react-icons/ai";
// import { SlLocationPin } from "react-icons/sl";
// import { CgToolbox } from "react-icons/cg";
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
import { useRouter } from "next/navigation";
import JobSearch from "../jobSearchResult/page";
import SliderSection from "./sliderSection";

const Header = () => {
  const router = useRouter();
  const [experience, setExperience] = useState(0);
  const [showExperience, setShowExperience] = useState(false);
  const [JobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [jobTitleOptions, setJobTitleOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [experienceOptions, setExperienceOptions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch job titles
    axios.get("http://localhost:3001/api/job-titles").then((response) => {
      setJobTitleOptions(response.data);
    });

    // Fetch locations
    axios.get("http://localhost:3001/api/locations").then((response) => {
      setLocationOptions(response.data);
    });

    // Fetch experience levels
    axios
      .get("http://localhost:3001/api/experience-levels")
      .then((response) => {
        setExperienceOptions(response.data);
      });
  }, []);

  // console.log(isLoggedIn);
  const testHandler = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleSearch = () => {
    const searchData = {
      JobTitle,
      location,
      experience,
    };

    setIsLoading(true);

    axios
      .post("http://localhost:3001/api/jobs/search", searchData)
      .then((response) => {
        if (response.status === 200) {
          // Update the search results
          setSearchResults(response.data);
          console.log("hellorES", response.data);
        }
      })
      .catch((error) => {
        // Handle errors and display error message to the user
        console.log(error);
      })
      .finally(() => {
        // Hide loading indicator
        setIsLoading(false);
      });
  };
  // console.log(
  //   "hello {searchResults && searchResults.length > 0",
  //   searchResults
  // );

  return (
    <>
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
                <Button className={styles.btnEmployer_Link}>
                  For employers
                </Button>
              </Link>
            ) : (
              ""
            )}
            {!isLoggedIn && <AccountMenu test={testHandler} />}
          </div>
        </div>
        <div className={styles.search}>
          <div className={styles.search_bar}>
            <div className={styles.search_box}>
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
                      fontWeight: "normal",
                    }}
                  />
                )}
              />
            </div>
            <div className={styles.search_box}>
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
                    style={{
                      width: "320px",
                      fontWeight: "normal",
                    }}
                    className={styles.searchInput}
                  />
                )}
              />
            </div>
            <div className={styles.search_box}>
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
                    style={{
                      width: "320px",
                      fontWeight: "normal",
                    }}
                  />
                )}
              />
            </div>
            <button className={styles.search_button} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {searchResults && searchResults.length == 0 && (
          <>
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
          </>
        )}
      </div>
      {searchResults && searchResults.length > 0 && (
        <JobSearch searchResults={searchResults} />
      )}
      <SliderSection />
    </>
  );
};

export default Header;
