"use client";
import React, { useState } from "react";
import job5 from "@/app/lottieAnimation/Job5.json";
import job6 from "@/app/lottieAnimation/Job6.json";
import Lottie from "lottie-react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

type AnimationData = {
  v: string;
  fr: number;
  ip: number;
};
const useStyles = makeStyles((theme: any) => ({
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: "rgb(236, 235, 235 )",
  },
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    padding: "0 50px",
  },
  lottieContainer: {
    marginRight: "80px",
    height: "500px",
    width: "600px",
    marginLeft: "-400px",
  },
  formContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
    alignItems: "center",
    marginLeft: "30px",
  },
  form: {
    width: "350px",
    height: "100%",
  },
  submit: {
    marginTop: "15px",
    marginBottom: "20px",
    height: "40px",
    backgroundColor: "rgb(211, 178, 235)",
    "&:hover": {
      backgroundColor: "rgb(159, 76, 219)",
    },
  },
  link: {
    color: "rgb(159, 76, 219)",
    textDecoration: "none",
    transition: "color 0.3s ease",
    "&:hover, &:active": {
      color: "rgb(159, 76, 219)",
    },
  },
}));

const EmployerLogin = () => {
  const classes: any = useStyles();
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLoginLink, setShowLoginLink] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lottieAnimation, setLottieAnimation] = useState<AnimationData>(
    showRegistration ? job6 : job5
  );

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const enteredEmail = email;
    const enteredPassword = password;

    if (showRegistration) {
      const phoneNumber = e.currentTarget.phoneNumber.value;
      const fullName = e.currentTarget.fullName.value;
      // Performing registration logic and send data to backend
      try {
        const response = await axios.post(
          "http://localhost:3001/api/registeremployers",
          {
            fullName,
            email,
            password,
            phoneNumber,
            companyName,
          }
        );

        if (response.status === 200) {
          window.location.href = "/JobPosting";
          toast.success("Registered Successfully!", {
            duration: 20000,
          });
        }
      } catch (error) {
        toast.error("Registration error!", {
          duration: 10000,
        });
      }
    } else {
      // Perform login logic and check registered data
      try {
        const response = await axios.post(
          "http://localhost:3001/api/loginemployers",
          {
            email,
            password,
          }
        );

        if (response.status === 200) {
          // window.location.href = "/JobPosting";
          toast.success("Logged In Successfully!", {
            duration: 20000,
          });
        }
      } catch (error) {
        // toast.error("Invalid Credentials!", {
        //   duration: 2000,
        // });
        console.error("Login error:", error);
      }
    }
  };

  const handleAnimationChange = () => {
    const newAnimation = showRegistration ? job5 : job6;
    setLottieAnimation(newAnimation);
  };

  return (
    <div className={classes.body}>
      <Toaster position="top-center" reverseOrder={false} />
      <Container component="main" maxWidth="xs" className={classes.root}>
        <div className={classes.lottieContainer}>
          <Lottie
            animationData={lottieAnimation}
            style={{
              height: "500px",
              width: "600px",
              // marginLeft: "-400px",
            }}
          />
        </div>
        <Paper elevation={3} className={classes.formContainer}>
          <Typography component="h1" variant="h5">
            {showRegistration ? "Employer Registration" : "Employer Login"}
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              id="email"
              label="Email Address/Phone Number"
              autoComplete="email"
              value={email} // Bind value to state
              onChange={(e: any) => setEmail(e.target.value)} // Update state on change
              //        {/* // {...register("email")}
              // // error={!!formState.errors.email}
              // // helperText={formState.errors.email?.message} */}
            />

            {showRegistration && (
              <div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="Full Name"
                  type="tel"
                  id="fullName"
                  autoComplete="Name"
                  // {...register("name")}
                  // error={!!formState.errors.name}
                  // helperText={formState.errors.name?.message}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="Phone Number"
                  type="tel"
                  id="phoneNumber"
                  autoComplete="tel"
                  // {...register("phoneNumber")}
                  // error={!!formState.errors.phoneNumber}
                  // helperText={formState.errors.phoneNumber?.message}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  type="tel"
                  label="Company Name"
                  id="companyName"
                  autoComplete="tel"
                  value={companyName}
                  onChange={(e: any) => setCompanyName(e.target.value)}
                  // {...register("companyName")}
                  // error={!!formState.errors.companyName}
                  // helperText={formState.errors.companyName?.message}
                />
              </div>
            )}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {showRegistration ? "Register" : "Log In"}
            </Button>
          </form>
          {!showRegistration && (
            <>
              <Link href="#" variant="body2" className={classes.link}>
                Forgot Password?
              </Link>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link
                  href="#"
                  variant="body2"
                  className={classes.link}
                  onClick={() => {
                    handleAnimationChange();
                    setShowRegistration(true);
                    setShowLoginLink(false);
                  }}
                >
                  Register
                </Link>
              </Typography>
            </>
          )}
          {!showLoginLink && (
            <>
              <Typography variant="body2">
                Already have an account?{" "}
                <Link
                  href="#"
                  variant="body2"
                  className={classes.link}
                  onClick={() => {
                    handleAnimationChange();
                    setShowLoginLink(true);
                    setShowRegistration(false);
                  }}
                >
                  Login
                </Link>
              </Typography>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
};

export default EmployerLogin;
