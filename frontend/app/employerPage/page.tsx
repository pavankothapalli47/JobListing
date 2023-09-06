"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  createTheme,
  Typography,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FadeMenu from "@/app/components/employerMenu";

interface JobData {
  _id: string;
  jobTitle: string;
  experience: string;
  location: string;
  salary: string;
  CompanyName: string;
  workType: string;
  workLocation: string;
}

const StyledContainer = styled(Container)({
  marginTop: "25px",
  // display: "flex",
  // justifyContent: "center",
});
const Background = styled("body")({
  backgroundColor: "red",
});

const FlexContainer = styled(Container)({
  marginTop: "20px",
  marginBottom: "15px",
  display: "flex",
  justifyContent: "space-between", // Aligns the button to the right
  alignItems: "center", // Vertically centers the button
});

const StyledTable = styled(Table)({
  minWidth: 700,
  // border: "2px solid #2196f3",
});
const colorfulTheme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#2196f3", // Change secondary color to blue
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 18,
  },
});

const SmallButton = styled(Button)({
  fontSize: "18px", // Adjust the text size
  height: "35px",
});

const EmployerPage: React.FC = () => {
  const router = useRouter();
  const [jobPostings, setJobPostings] = useState<JobData[]>([]);

  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/jobs");
      setJobPostings(response.data);
    } catch (error) {
      console.error("Error fetching job postings:", error);
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      await axios.delete(`http://localhost:3001/api/jobs/${jobId}`);
      setJobPostings((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  // const logout = () => {
  //   router.push("/home");
  // };

  return (
    <ThemeProvider theme={colorfulTheme}>
      <StyledContainer>
        <FlexContainer>
          <Typography
            variant="h4"
            gutterBottom
            fontSize={30}
            color={"rgb(33, 150, 243)"}
          >
            Job Postings
          </Typography>
          <FadeMenu />
          {/* <SmallButton
            variant="contained"
            color="primary"
            onClick={() => {
              router.push("/JobPosting");
            }}
          >
            Post Job
          </SmallButton> */}
          {/* <SmallButton
            variant="contained"
            color="primary"
            onClick={logout} // Call the logout function on button click
          >
            Logout
          </SmallButton> */}
        </FlexContainer>
        <TableContainer component={Paper}>
          <StyledTable aria-label="Job Postings">
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Work Type</TableCell>
                <TableCell>Work Location</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobPostings.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job.jobTitle}</TableCell>
                  <TableCell>{job.experience}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell>{job.salary}</TableCell>
                  <TableCell>{job.CompanyName}</TableCell>
                  <TableCell>{job.workType}</TableCell>
                  <TableCell>{job.workLocation}</TableCell>
                  <TableCell>
                    <Button
                      startIcon={<DeleteIcon />}
                      onClick={() => deleteJob(job._id)}
                      variant="outlined"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </StyledContainer>
    </ThemeProvider>
  );
};

export default EmployerPage;
