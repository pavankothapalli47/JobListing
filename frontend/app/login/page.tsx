"use client";
import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { FcGoogle } from "react-icons/fc";
import { GrLinkedin } from "react-icons/gr";
import { styled } from "@mui/material/styles";
import toast from "react-hot-toast";
import styles from "@/app/styles/login.module.css";
import { Toaster } from "react-hot-toast";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  emailOrPhone: yup
    .string()
    .required("Email or PhoneNo is required")
    .test("emailOrPhone", "Invalid email or phone number format", (value) => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const phoneRegex = /^[0-9]{10}$/;
      return emailRegex.test(value) || phoneRegex.test(value);
    }),
  password: yup.string().required("Password is required"),
});

interface LoginFormValues {
  emailOrPhone: string;
  password: string;
}

const LoginContainer = styled("div")({
  padding: "1rem",
  maxWidth: "350px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
});

const ErrorMessage = styled("div")({
  color: "#f44336",
  margin: "1rem 0",
  textAlign: "center",
});

const ForgotPassword = styled("div")({
  fontSize: 15,
  color: "rgb(159, 76, 219)",
  cursor: "pointer",
  marginBottom: "1rem",
  textAlign: "right",
});

const LoginButton = styled(Button)({
  backgroundColor: "rgb(211, 178, 235)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgb(159, 76, 219)",
  },
});

const LoginViaOtpButton = styled("div")({
  fontSize: 15,
  color: "rgb(159, 76, 219)",
  cursor: "pointer",
  marginTop: "1rem",
  textAlign: "center",
});

const SocialButtons = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "1rem",
});

const LoginForm: React.FC<any> = (props) => {
  const router = useRouter();
  const { test } = props;

  const session = useSession;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (data: LoginFormValues) => {
    setErrorMessage(""); // Clearing the previous error messages
    try {
      // Sending email/phone and password to the backend for verification
      const response = await axios.post("http://localhost:3001/api/login", {
        emailOrPhone: data.emailOrPhone,
        password: data.password,
      });

      if (response.status === 200) {
        // successful login then to homepage
        test();
        router.push("/home");
        toast.success("Logged In Successfully!", {
          duration: 3000,
        });
      } else {
        toast.error("An error occurred. Please try again later.", {
          duration: 2000,
        });
        setErrorMessage(response.data.message); // Displaying the error message from backend
      }
    } catch (error) {
      toast.error("Invalid Credentials!", {
        duration: 2000,
      });
      console.error("Login error:", error);
    }
  };

  const handleLoginViaOtp = () => {};

  return (
    <LoginContainer>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit(handleLogin)}>
        <TextField
          type="text"
          label="Enter Email ID/Phone Number *"
          {...register("emailOrPhone")}
          error={!!errors.emailOrPhone}
          onChange={(e: any) => setEmailOrPhone(e.target.value)}
          fullWidth
          margin="normal"
          helperText={errors.emailOrPhone?.message}
        />
        <TextField
          type="password"
          label="Enter your password *"
          {...register("password")}
          error={!!errors.password}
          onChange={(e: any) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          helperText={errors.password?.message}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <ForgotPassword>Forgot Password?</ForgotPassword>
        <LoginButton
          variant="contained"
          onClick={() => handleSubmit(handleLogin)()}
          fullWidth
        >
          Log In
        </LoginButton>
        <LoginViaOtpButton onClick={handleLoginViaOtp}>
          Log in via OTP
        </LoginViaOtpButton>
        <SocialButtons>
          <IconButton>
            <FcGoogle onClick={() => signIn("google")} />
          </IconButton>
          <IconButton>
            <GrLinkedin className={styles.LinkedinBtn} />
          </IconButton>
        </SocialButtons>
      </form>
    </LoginContainer>
  );
};
export default LoginForm;
