"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
}));

interface EmployerData {
  fullName: string;
  email: string;
  phoneNumber: string;
  CompanyName: string;
}

const EmployerProfile: React.FC = () => {
  const [employerData, setEmployerData] = useState<EmployerData | null>(null);
  useEffect(() => {
    const userIdentifier = localStorage.getItem("authUser");

    // Fetch employer details from the backend
    axios
      .get<EmployerData>(
        `http://localhost:3001/api/employer-profile?userIdentifier=${userIdentifier}`
      )
      .then((response) => {
        setEmployerData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employer profile:", error);
      });
  }, []);

  return (
    <Container maxWidth="md">
      <StyledPaper>
        <Typography variant="h4" gutterBottom>
          Employer Profile
        </Typography>
        {employerData ? (
          <div>
            <Typography variant="body1">
              Full Name: {employerData?.fullName}
            </Typography>
            <Typography variant="body1">Email: {employerData?.email}</Typography>
            <Typography variant="body1">
              Phone Number: {employerData?.phoneNumber}
            </Typography>
            <Typography variant="body1">
              Company Name: {employerData?.CompanyName}
            </Typography>
          </div>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
      </StyledPaper>
    </Container>
  );
};

export default EmployerProfile;
