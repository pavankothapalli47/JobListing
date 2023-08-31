"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import toast from "react-hot-toast";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { FcGoogle } from "react-icons/fc";
import { GrLinkedin } from "react-icons/gr";
import styles from "@/app/styles/login.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface RegistrationData {
  fullName: string;
  email: string;
  password: string;
  mobileNumber: string;
  gender: "male" | "female" | "other";
}

const StyledForm = styled("div")(({ theme }) => ({
  width: "400px",
  padding: "20px",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",

  "& .MuiTextField-root": {
    width: "100%",
    marginBottom: "10px",
  },

  "& .MuiButton-root": {
    width: "100%",
  },

  "& .MuiFormControlLabel-root": {
    marginTop: "-10px", // Adjust the alignment of radio buttons
  },
}));

const SocialButtons = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "0.2rem",
});

const RegisterButton = styled(Button)({
  backgroundColor: "rgb(211, 178, 235)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgb(159, 76, 219)",
  },
});

const validationSchema = yup.object().shape({
  fullName: yup.string().required("Full Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, "Invalid mobile number")
    .required("Mobile Number is required"),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Invalid gender")
    .required("Gender is required"),
});

const RegistrationForm: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: yupResolver(validationSchema),
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleRegistration = async (data: any) => {
    setErrorMessage(""); // Clearing the previous error messages
    try {
      // Sending registration data to the backend for processing
      const response = await axios.post(
        "http://localhost:3001/api/register",
        data
      );

      if (response.status === 200) {
        window.location.href = "/home";
        toast.success("Registered Successfully!", {
          duration: 2000,
        });
      } else {
        toast.error("Registration error!", {
          duration: 2000,
        });
        setErrorMessage(response.data.message); // Displaying the error message from backend
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <StyledForm>
      <Toaster position="top-center" reverseOrder={false} />
      <form onSubmit={handleSubmit(handleRegistration)}>
        <TextField
          label="Full Name *"
          variant="outlined"
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
        />
        <TextField
          label="Email ID *"
          variant="outlined"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password *"
          variant="outlined"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          label="Mobile Number *"
          variant="outlined"
          {...register("mobileNumber")}
          error={!!errors.mobileNumber}
          helperText={errors.mobileNumber?.message}
        />
        <Typography variant="h6" gutterBottom>
          Gender *
        </Typography>
        <RadioGroup aria-label="gender" {...register("gender")}>
          <div style={{ display: "flex" }}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </div>
        </RadioGroup>
        {errorMessage && <div>{errorMessage}</div>}
        <RegisterButton type="submit" variant="contained" color="primary">
          Register
        </RegisterButton>
      </form>
      <SocialButtons>
        <IconButton>
          <FcGoogle />
        </IconButton>
        <IconButton>
          <GrLinkedin className={styles.LinkedinBtn} />
        </IconButton>
      </SocialButtons>
    </StyledForm>
  );
};

export default RegistrationForm;
