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
    industry,
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
      industry,
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
