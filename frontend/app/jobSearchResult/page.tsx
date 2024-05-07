"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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
}

const StyledContainer = styled(Container)({
  marginTop: "25px",
  // display: "flex",
  // justifyContent: "center",
});
const Background = styled("body")({
  backgroundColor: "#E1F5FE",
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

// const SmallButton = styled(Button)({
//   fontSize: "18px", // Adjust the text size
//   height: "35px",
// });

const JobSearch: React.FC<any> = (props) => {
  const router = useRouter();
  const [appliedJob, setAppliedJob] = useState<boolean>(false);
  const { searchResults, userId } = props;
  console.log(userId);

  const applyJob = async (jobId: string, userId: string) => {
    try {
      // Making an API call to apply for job
      const response = await axios.post(
        `https://joblisting-4tpk.onrender.com/api/apply-job/${jobId}`,
        {
          userId,
        }
      );
  
      if (response.status === 200) {
        // Updating the state to indicate that the job has been applied
        setAppliedJob(true);
        toast.success("Application submitted successfully!", {
          duration: 3000,
        });
      } else {
        toast.error("Failed to submit application. Please try again later.", {
          duration: 3000,
        });
      }
    } catch (error: any) {
      console.error(error);
  
      if (error.response && error.response.status === 404) {
        // Displaying warning toaster for user to log in before applying
           toast.error("Please log in before submitting your job application.", {
          duration: 3000,
          icon: '⚠️',
          style: {
            border: '1px solid #FF9800',
            padding: '10px',
            color: '#FF9800',
          },
        });
      } else {
        // Displaying error toaster for other errors
        toast.error("Failed to submit application. Please try again later.", {
          duration: 3000,
        });
      }
    }
  };
  

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
            Your search results
          </Typography>

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
          <StyledTable aria-label="Job Search">
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
              {searchResults &&
                searchResults.length > 0 &&
                searchResults.map((job: any) => (
                  <TableRow key={job._id}>
                    <TableCell>{job.jobTitle}</TableCell>
                    <TableCell>{job.experience}</TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.CompanyName}</TableCell>
                    <TableCell>{job.salary}</TableCell>
                    <TableCell>{job.workType}</TableCell>
                    <TableCell>{job.workLocation}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => applyJob(job._id, userId)}
                        variant="outlined"
                        color="secondary"
                      >
                        Apply
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

export default JobSearch;
