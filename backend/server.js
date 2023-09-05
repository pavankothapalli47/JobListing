const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./models/User");
const Employer = require("./models/Employer");
const Job = require("./models/JobPosting");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://pavankothapalli47:fOZxIAhHLgcTJf1X@cluster0.ejxx9rh.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a route to search for jobs
app.post("/api/jobs/search", async (req, res) => {
  const { JobTitle, location, experience } = req.body;
  try {
    // Construct a query to find relevant job postings in your database
    const jobPostings = await Job.find({
      jobTitle: { $regex: new RegExp(JobTitle, "i") }, // Case-insensitive title search
      location: { $regex: new RegExp(location, "i") }, // Case-insensitive location search
      experience: { $gte: experience }, // Experience greater than or equal to the specified value
    });

    res.status(200).json(jobPostings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Registration route for users
app.post("/api/register", async (req, res) => {
  const { fullName, email, password, mobileNumber, gender } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({
      fullName,
      email,
      password,
      mobileNumber,
      gender,
    });
    await newUser.save();

    res.status(200).json({ message: "Registration successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login route for users
app.post("/api/login", async (req, res) => {
  const { emailOrPhone, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { mobileNumber: emailOrPhone }],
    });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Registration route for employers
app.post("/api/registeremployers", async (req, res) => {
  const { email, password, phoneNumber, companyName } = req.body;
  try {
    const existingEmployer = await Employer.findOne({ email });
    if (existingEmployer) {
      return res.status(400).json({ message: "Employer already exists." });
    }

    const newEmployer = new Employer({
      email,
      password,
      phoneNumber,
      companyName,
    });
    await newEmployer.save();

    res.status(200).json({ message: "Registration successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Login route for employers
app.post("/api/loginemployers", async (req, res) => {
  const { email, password } = req.body;
  try {
    const employer = await Employer.findOne({ email });
    if (!employer || employer.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Define a route to post a new job listing
app.post("/api/jobs", async (req, res) => {
  const {
    jobTitle,
    experience,
    location,
    salary,
    CompanyName,
    workType,
    workLocation,
  } = req.body;
  try {
    if (!jobTitle || !experience || !location) {
      return res.status(400).json({ message: "Required fields missing." });
    }
    const newJob = new Job({
      jobTitle,
      experience,
      location,
      salary,
      CompanyName,
      workType,
      workLocation,
    });

    await newJob.save();

    res.status(200).json({ message: "Job posted Successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error posting job!" });
  }
});

app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const deletedJob = await Job.findByIdAndRemove(jobId);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found." });
    }
    res.status(200).json({ message: "Job deleted successfully." });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Define a route to fetch job postings
app.get("/api/jobs", async (req, res) => {
  try {
    // Fetch job postings from your database
    const jobPostings = await Job.find();

    res.status(200).json(jobPostings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.put("/api/jobs/:id", async (req, res) => {
  try {
    const jobId = req.params.id;
    const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
      new: true,
    });
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found." });
    }
    res
      .status(200)
      .json({ message: "Job updated successfully.", job: updatedJob });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
