const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = express.Router();
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
app.post("/api/apply-job/:jobId", async (req, res) => {
  const { jobId } = req.params;
  const { userId } = req.body;
  console.log("Received userId:", userId);

  try {
    const user = await User.findById(userId);
    console.log("Found user:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the user has already applied for this job
    if (user.appliedJobs.includes(jobId)) {
      return res
        .status(400)
        .json({ message: "User already applied for this job." });
    }

    // Update the user's record to indicate that they have applied for this job
    user.appliedJobs.push(jobId);
    await user.save();

    res.status(200).json({ message: "Application submitted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});
// Define a route to get user profile by ID
app.get("/api/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Assuming you have a User model/schema defined
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Customize the user data you want to return
    const userData = {
      fullName: user.fullName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      gender: user.gender,
      // Add other user properties as needed
    };

    res.status(200).json(userData);
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
    res.status(200).json({ message: "Login successful.", userData: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// Registration route for employers
app.post("/api/registeremployers", async (req, res) => {
  const { fullName, email, password, phoneNumber, companyName } = req.body;
  try {
    const existingEmployer = await Employer.findOne({ email });
    if (existingEmployer) {
      return res.status(400).json({ message: "Employer already exists." });
    }

    const newEmployer = new Employer({
      fullName,
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
    res
      .status(200)
      .json({ message: "Login successful.", employerData: employer });
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
    createdby,
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
    const jobPostings = await Job.find().sort({ createdAt: -1 });

    res.status(200).json(jobPostings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

// app.put("/api/jobs/:id", async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, {
//       new: true,
//     });
//     if (!updatedJob) {
//       return res.status(404).json({ message: "Job not found." });
//     }
//     res
//       .status(200)
//       .json({ message: "Job updated successfully.", job: updatedJob });
//   } catch (error) {
//     console.error("Error updating job:", error);
//     res.status(500).json({ message: "Internal server error." });
//   }
// });
// Define a route to get employer details

app.get("/api/employer-profile", async (req, res) => {
  try {
    // Assuming you have an Employer model/schema defined
    const employer = await Employer.findOne({
      /* Add a query condition here if needed */
    });

    if (!employer) {
      return res.status(404).json({ message: "Employer not found." });
    }
    // Assuming your Employer model has the necessary fields
    const employerData = {
      fullName: employer.fullName,
      email: employer.email,
      phoneNumber: employer.phoneNumber,
      CompanyName: employer.companyName,
    };

    res.status(200).json(employerData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});
app.get("/api/job-titles", async (req, res) => {
  try {
    // Fetch job titles from your database (replace with your logic)
    const jobTitles = [
      "Software Engineer",
      "Product Manager",
      "Data Scientist",
      "Python Developer",
      "Java Developer",
      "Mern Stack Developer",
      "Front End Developer",
      "Backend Developer",
      "Full stack Developer",
      "UX/UI Designer",
      "Graphic Designer",
      "Marketing Manager",
      "Financial Analyst",
      "Human Resources Manager",
      "Sales Representative",
      "Customer Support Specialist",
      "Project Manager",
      "Content Writer",
      "Social Media Manager",
      "Business Analyst",
      "Accountant",
      "Nurse",
      "Teacher",
      "Electrical Engineer",
      "Mechanical Engineer",
      "Civil Engineer",
      "Architect",
      "Data Analyst",
      "Cybersecurity Analyst",
      "QA Tester (Quality Assurance Tester)",
      "DevOps Engineer",
      "Scrum Master",
      "Legal Counsel",
      "Pharmacist",
      "Physical Therapist",
      "Chef",
      "Photographer",
      "Real Estate Agent",
      "Event Planner",
      "Environmental Scientist",
      "Veterinarian",
      "Electrician",
      "Plumber",
      "Fashion Designer",
      "Flight Attendant",
      "Police Officer",
      "Firefighter",
      "Librarian",
      "Biomedical Researcher",
      "Occupational Therapist",
      "Art Director",
      "Data Engineer",
      "Game Developer",
      "UX Researcher",
      "IT Support Specialist",
      "Supply Chain Manager",
      "Medical Doctor",
      "Psychologist",
      "Geologist",
    ];

    res.status(200).json(jobTitles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.get("/api/salary", async (req, res) => {
  try {
    // Fetch salary from your database
    const salary = [
      "2LPA",
      "3LPA",
      "4LPA",
      "5LPA",
      "6LPA",
      "7LPA",
      "8LPA",
      "9LPA",
      "10LPA",
      "11LPA",
      "12LPA",
      "13LPA",
      "14LPA",
      "15LPA",
      "16LPA",
      "17LPA",
      "18LPA",
      "19LPA",
      "20LPA",
      "25LPA",
      "30LPA",
      "35LPA",
      "40LPA",
      "45LPA",
      "50LPA",
      "55LPA",
      "60LPA",
      "65LPA",
    ];
    res.status(200).json(salary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});
app.get("/api/CompanyName", async (req, res) => {
  try {
    // Fetch CompanyName from your database
    const CompanyName = [
      "Solix",
      "Emagia",
      "Touch a Life Foundation",
      "TCS",
      "Wipro",
      "Capgemini",
      "Infosys",
      "Microsoft",
      "Acme Inc.",
      "TechNova",
      "GlobalGrowth",
      "DataSolutions",
      "InnovateHub",
      "SilverStream",
      "NexaCorp",
      "StratoWave",
      "GreenFleet",
      "CloudCompass",
      "RapidSynergy",
      "EcoFusion",
      "Tcs",
      "PioneerWorks",
      "SummitSolutions",
      "BlueHorizon",
      "SunriseTech",
      "StarQuest",
      "Wipro",
      "VivaVibe",
      "FusionFlex",
      "SkylineSystems",
      "BlueWave",
      "CoreConnect",
      "NexTech",
      "QuantumLeap",
      "VistaVision",
      "EarthMovers",
      "Pathfinder",
      "EnvisionTech",
      "PrimeSolutions",
      "ZenithX",
      "AquaNova",
      "ElementalTech",
      "TruSource",
      "FutureFleet",
      "InfiniteReach",
      "OptiMinds",
      "EcoTech",
      "StarFusion",
      "InnovaTech",
      "EagleEye",
      "TechTrailblazers",
      "SustainaSolutions",
      "PixelPerfect",
      "DataDynamo",
      "MaritimeMasters",
      "Xcelerate",
      "NexaWave",
      "QuasarTech",
      "MetaMind",
      "GreenEra",
      "ApolloTech",
      "InnovativeHorizon",
      "FusionX",
      "EcoVision",
      "EnigmaSolutions",
      "FleetMasters",
      "Synergetic",
      "DataDelight",
      "GlobalSpectrum",
      "QuantumTech",
      "ElementalFusion",
      "InfiniteLoop",
      "RisingSun",
      "TechPioneers",
      "VisionaryVoyage",
      "FusionCore",
      "TruTech",
      "EnviroWave",
      "CrimsonHorizon",
      "InnovateSustain",
      "NexaVision",
      "BlueStream",
      "EcoHarbor",
      "FutureForce",
      "StratoTech",
      "EagleVision",
      "OptiTech",
      "TechTitans",
      "StellarSolutions",
      "SynergySystems",
      "GlobalNexus",
      "InfiniteInsight",
      "NexaFleet",
      "QuantumLeap",
      "StarPower",
      "VisionCrafters",
      "FusionQuest",
      "EarthWonders",
      "VistaTech",
      "EnviroSource",
      "DataDiscover",
      "BlueSail",
      "SustainableSolutions",
      "InnovaWave",
      "FutureFounders",
      "TechMasters",
      "HarborTech",
      "NexaCore",
      "StratoFusion",
      "EagleInsights",
    ];

    res.status(200).json(CompanyName);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});
app.get("/api/locations", async (req, res) => {
  try {
    // Fetch locations from your database
    const locations = [
      "New York",
      "San Francisco",
      "Los Angeles",
      "Chicago",
      "Miami",
      "Boston",
      "Seattle",
      "Austin",
      "Washington, D.C.",
      "Denver",
      "Atlanta",
      "Dallas",
      "Houston",
      "Toronto",
      "London",
      "Paris",
      "Berlin",
      "Sydney",
      "Tokyo",
      "Beijing",
      "Mumbai, India",
      "Bangalore, India",
      "New Delhi, India",
      "Hyderabad, India",
      "Chennai, India",
      "Pune, India",
      "Kolkata, India",
      "Jaipur, India",
      "Ahmedabad, India",
    ];

    res.status(200).json(locations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});
app.get("/api/experience-levels", async (req, res) => {
  try {
    // Fetch experience levels from your database
    const experienceLevels = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
    ];

    res.status(200).json(experienceLevels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
