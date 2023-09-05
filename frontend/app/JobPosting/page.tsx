"use client";
import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  Select,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { styled } from "@mui/material/styles";
import Lottie from "lottie-react";
import Job7 from "@/app/lottieAnimation/Job7.json";

const PageContainer = styled("div")({
  backgroundColor: "rgb(128, 144, 228)",
  display: "flex",
  justifyContent: "space-between",
});

const Division = styled("div")({});

const PostButton = styled(Button)({
  backgroundColor: "rgb(128, 144, 228)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgb(72, 92, 181)",
  },
  marginTop: 10,
});

const EmployerPage = () => {
  const [jobData, setJobData] = useState({
    jobTitle: "",
    experience: "",
    location: "",
    salary: "",
    CompanyName: "",
    workType: "",
    workLocation: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/jobs",
        jobData
      );
      toast.success("Job posted Successfully!", {
        duration: 20000,
      });
      console.log("Job posted:", response.data);
      // Reset the form data after successful submission
      setJobData({
        jobTitle: "",
        experience: "",
        location: "",
        salary: "",
        CompanyName: "",
        workType: "",
        workLocation: "",
      });
      window.location.href = "/employerPage";
    } catch (error) {
      toast.error("Error posting job!", {
        duration: 20000,
      });
      console.error("Error posting job:", error);
    }
  };

  return (
    <PageContainer>
      <Division>
        <Lottie
          animationData={Job7}
          style={{
            height: 520,
            width: 505,
            marginLeft: "92px",
            marginTop: "45px",
          }}
        />
      </Division>
      <Container maxWidth="md">
        <Toaster position="top-center" reverseOrder={false} />
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            marginTop: 0,
            width: 535.5,
            color: "rgb(128, 144, 228)",
            marginLeft: 18,
            // backgroundColor: "rgb(128, 144, 228)",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontSize: 26 }}>
            Post a New Job
          </Typography>
          <TextField
            label="Job Title"
            fullWidth
            margin="normal"
            name="jobTitle"
            value={jobData.jobTitle}
            onChange={handleInputChange}
          />
          <TextField
            label="Years of Experience"
            fullWidth
            margin="normal"
            name="experience"
            value={jobData.experience}
            onChange={handleInputChange}
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            name="location"
            value={jobData.location}
            onChange={handleInputChange}
          />
          <TextField
            label="Salary"
            fullWidth
            margin="normal"
            name="salary"
            value={jobData.salary}
            onChange={handleInputChange}
          />
          <TextField
            label="Company"
            fullWidth
            margin="normal"
            name="CompanyName"
            value={jobData.CompanyName}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Work Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="workType"
              label="workType"
              value={jobData.workType}
              onChange={handleInputChange}
            >
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="demo-simple-select-label">Work Location</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="workLocation"
              label="workLocation"
              value={jobData.workLocation}
              onChange={handleInputChange}
            >
              <MenuItem value="Office">Office</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
            </Select>
          </FormControl>
          <PostButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Post Job
          </PostButton>
        </Paper>
      </Container>
    </PageContainer>
  );
};

export default EmployerPage;
