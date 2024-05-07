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
import { styled } from "@mui/system";

type AnimationData = {
  v: string;
  fr: number;
  ip: number;
};

const RootContainer = styled('div')({
  margin: 0,
  padding: 0,
  backgroundColor: "rgb(236, 235, 235 )",
});

const MainContainer = styled(Container)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "100vh",
  padding: "0 50px",
});

const LottieContainer = styled('div')({
  marginRight: "80px",
  height: "500px",
  width: "600px",
  marginLeft: "-400px",
});

const FormContainer = styled(Paper)({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  marginTop: "10px",
  alignItems: "center",
  marginLeft: "30px",
});

const StyledTextField = styled(TextField)({
  width: "350px",
  height: "100%",
});

const StyledButton = styled(Button)({
  marginTop: "15px",
  marginBottom: "20px",
  height: "40px",
  backgroundColor: "rgb(211, 178, 235)",
  "&:hover": {
    backgroundColor: "rgb(159, 76, 219)",
  },
});

const StyledLink = styled(Link)({
  color: "rgb(159, 76, 219)",
  textDecoration: "none",
  transition: "color 0.3s ease",
  "&:hover, &:active": {
    color: "rgb(159, 76, 219)",
  },
});

const EmployerLogin = () => {
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
          "https://joblisting-4tpk.onrender.com/api/registeremployers",
          {
            fullName,
            email,
            password,
            phoneNumber,
            companyName,
          }
        );

        if (response.status === 200) {
          window.location.href = "/employers";
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
          "https://joblisting-4tpk.onrender.com/api/loginemployers",
          {
            email,
            password,
          }
        );

        if (response.status === 200) {
          window.location.href = "/JobPosting";
          const EmployerId = response.data.employerData._id;
          console.log(EmployerId);
          localStorage.setItem("authUser", EmployerId);
          toast.success("Logged In Successfully!", {
            duration: 20000,
          });
        }
      } catch (error) {
        toast.error("Invalid credentials.")
        console.error("Login error:", error);
      }
    }
  };

  const handleAnimationChange = () => {
    const newAnimation = showRegistration ? job5 : job6;
    setLottieAnimation(newAnimation);
  };

  return (
    <RootContainer>
      <Toaster position="top-center" reverseOrder={false} />
      <MainContainer maxWidth="xs">
        <LottieContainer>
          <Lottie
            animationData={lottieAnimation}
            style={{
              height: "500px",
              width: "600px",
            }}
          />
        </LottieContainer>
        <FormContainer elevation={3}>
          <Typography component="h1" variant="h5">
            {showRegistration ? "Employer Registration" : "Employer Login"}
          </Typography>
          <form onSubmit={onSubmit}>
            <StyledTextField
              variant="outlined"
              margin="normal"
              fullWidth
              required
              id="email"
              label="Email Address/Phone Number"
              autoComplete="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />

            {showRegistration && (
              <div>
                <StyledTextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="Full Name"
                  type="tel"
                  id="fullName"
                  autoComplete="Name"
                />
                <StyledTextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  label="Phone Number"
                  type="tel"
                  id="phoneNumber"
                  autoComplete="tel"
                />
                <StyledTextField
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
                />
              </div>
            )}
            <StyledTextField
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
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {showRegistration ? "Register" : "Log In"}
            </StyledButton>
          </form>
          {!showRegistration && (
            <>
              <StyledLink href="#" variant="body2">
                Forgot Password?
              </StyledLink>
              <Typography variant="body2">
                Don't have an account?{" "}
                <StyledLink
                  href="#"
                  variant="body2"
                  onClick={() => {
                    handleAnimationChange();
                    setShowRegistration(true);
                    setShowLoginLink(false);
                  }}
                >
                  Register
                </StyledLink>
              </Typography>
            </>
          )}
          {!showLoginLink && (
            <>
              <Typography variant="body2">
                Already have an account?{" "}
                <StyledLink
                  href="#"
                  variant="body2"
                  onClick={() => {
                    handleAnimationChange();
                    setShowLoginLink(true);
                    setShowRegistration(false);
                  }}
                >
                  Login
                </StyledLink>
              </Typography>
            </>
          )}
        </FormContainer>
      </MainContainer>
    </RootContainer>
  );
};

export default EmployerLogin;
