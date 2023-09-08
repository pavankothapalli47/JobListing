"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Autocomplete,
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

const buttonStyle = {
  color: "rgb(128, 144, 232)",
  borderColor: "rgb(128, 144, 232)",
};
const Division = styled("div")({});

const FlexContainer = styled(Container)({
  display: "flex",
  justifyContent: "space-between", // Aligns the button to the right
  alignItems: "center", // Vertically centers the button
});

const PostButton = styled(Button)({
  backgroundColor: "rgb(128, 144, 228)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgb(72, 92, 181)",
  },
  marginTop: 10,
});

const EmployerPage = () => {
  const [jobTitleOptions, setJobTitleOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [experienceOptions, setExperienceOptions] = useState([]);
  const [salaryOptions, setSalaryOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);

  const router = useRouter();
  const [jobData, setJobData] = useState({
    jobTitle: "",
    experience: "",
    location: "",
    salary: "",
    CompanyName: "",
    workType: "",
    workLocation: "",
  });
  useEffect(() => {
    // Fetch job titles
    axios.get("http://localhost:3001/api/job-titles").then((response) => {
      setJobTitleOptions(response.data);
    });

    // Fetch locations
    axios.get("http://localhost:3001/api/locations").then((response) => {
      setLocationOptions(response.data);
    });

    // Fetch salary
    axios.get("http://localhost:3001/api/salary").then((response) => {
      setSalaryOptions(response.data);
    });

    // Fetch CompanyName
    axios.get("http://localhost:3001/api/CompanyName").then((response) => {
      setCompanyOptions(response.data);
    });

    // Fetch experience levels
    axios
      .get("http://localhost:3001/api/experience-levels")
      .then((response) => {
        setExperienceOptions(response.data);
      });
  }, []);

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
      // window.location.href = "/employerPage";
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
          <FlexContainer>
            <Typography variant="h4" gutterBottom sx={{ fontSize: 26 }}>
              Post a New Job
            </Typography>
            <Button
              variant="outlined"
              onClick={() => {
                router.push("/employerProfile");
              }}
              style={buttonStyle}
            >
              Profile
            </Button>
          </FlexContainer>
          <Autocomplete
            options={jobTitleOptions}
            getOptionLabel={(option) => option}
            value={jobData.jobTitle}
            onChange={(_, newValue) =>
              handleInputChange({
                target: { name: "jobTitle", value: newValue },
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Job Title"
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Autocomplete
            options={experienceOptions}
            getOptionLabel={(option) => option.toString()}
            value={jobData.experience}
            onChange={(_, newValue) =>
              handleInputChange({
                target: { name: "experience", value: newValue },
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Years of Experience"
                fullWidth
                margin="normal"
                type="text"
                required
              />
            )}
          />
          <Autocomplete
            options={locationOptions}
            getOptionLabel={(option) => option}
            value={jobData.location}
            onChange={(_, newValue) =>
              handleInputChange({
                target: { name: "location", value: newValue },
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Location"
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Autocomplete
            options={salaryOptions}
            getOptionLabel={(option) => option}
            value={jobData.salary}
            onChange={(_, newValue) =>
              handleInputChange({
                target: { name: "salary", value: newValue },
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Salary"
                fullWidth
                margin="normal"
                required
              />
            )}
          />
          <Autocomplete
            options={companyOptions}
            getOptionLabel={(option) => option}
            value={jobData.CompanyName}
            onChange={(_, newValue) =>
              handleInputChange({
                target: { name: "CompanyName", value: newValue },
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label=" Company Name"
                fullWidth
                margin="normal"
                required
              />
            )}
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
