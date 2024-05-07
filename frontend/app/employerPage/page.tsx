"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import DeleteIcon from "@mui/icons-material/Delete";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

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
  createdBy: string;
}

const StyledContainer = styled(Container)({
  marginTop: "25px",
  // display: "flex",
  // justifyContent: "center",
});
const Background = styled("body")({
  backgroundColor: "#E1F5FE",
  minHeight: "100vh",
});
const FlexContainer = styled(Container)({
  marginTop: "20px",
  marginBottom: "15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
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
    console.log(localStorage.getItem("authUser"));
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get("https://joblisting-4tpk.onrender.com/api/jobs");
      setJobPostings(response.data);
    } catch (error) {
      console.error("Error fetching job postings:", error);
    }
  };

  const deleteJob = async (jobId: string) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this job? This action is irreversible."
    );
    if (confirmation) {
      await axios.delete(`https://joblisting-4tpk.onrender.com/api/jobs/${jobId}`);
      setJobPostings((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully.");
    } else {
      toast.error("Job deletion canceled.");
    }
  };

  // const logout = () => {
  //   router.push("/home");
  // };

  return (
    <ThemeProvider theme={colorfulTheme}>
      <Toaster position="top-center" reverseOrder={false} />
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
        <TableContainer component={Paper} style={{ background: "#E1F5FE" }}>
          <StyledTable aria-label="Job Postings">
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Salary</TableCell>
                <TableCell>Work Type</TableCell>
                <TableCell>Work Location</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobPostings.map((job) => (
                <TableRow key={job._id}>
                  <TableCell>{job?.jobTitle}</TableCell>
                  <TableCell>{job?.experience}</TableCell>
                  <TableCell>{job?.location}</TableCell>
                  <TableCell>{job?.CompanyName}</TableCell>
                  <TableCell>{job?.salary}</TableCell>
                  <TableCell>{job?.workType}</TableCell>
                  <TableCell>{job?.workLocation}</TableCell>
                  <TableCell>
                    <>
                      {" "}
                      {console.log(
                        localStorage.getItem("authUser"),
                        "job.createdBy",
                        job.createdBy
                      )}
                    </>
                    {job?.createdBy == localStorage.getItem("authUser") ? (
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteJob(job._id)}
                        variant="outlined"
                        color="secondary"
                      >
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}
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
