import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

interface JobData {
  jobTitle: string;
  experience: string;
  location: string;
  salary: string;
  industry: string;
  workType: string;
  workLocation: string;
}

interface JobCardProps {
  jobData: JobData;
}

const JobCard: React.FC<JobCardProps> = ({ jobData }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {jobData?.jobTitle}
        </Typography>
        <Typography variant="body1">
          Experience: {jobData?.experience}
        </Typography>
        <Typography variant="body1">Location: {jobData?.location}</Typography>
        <Typography variant="body1">Salary: {jobData?.salary}</Typography>
        <Typography variant="body1">Industry: {jobData?.industry}</Typography>
        <Typography variant="body1">Work Type: {jobData?.workType}</Typography>
        <Typography variant="body1">
          Work Location: {jobData?.workLocation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default JobCard;
