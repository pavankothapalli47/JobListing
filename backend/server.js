const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const users = [];

// Registration route
app.post("/api/register", (req, res) => {
  const { fullName, email, password, mobileNumber, gender } = req.body;
  const existingUser = users.find(
    (user) => user.email === email || user.mobileNumber === mobileNumber
  );
  if (existingUser) {
    return res.status(400).json({ message: "User already exists." });
  }
  // Create a new user object and add it to the users array
  const newUser = { fullName, email, password, mobileNumber, gender };
  users.push(newUser);
  console.log(users);
  res.status(200).json({ message: "Registration successful." });
});

// Login route
app.post("/api/login", (req, res) => {
  const { emailOrPhone, password } = req.body;
  // Find the user based on email or mobile number
  const user = users.find(
    (user) => user.email === emailOrPhone || user.mobileNumber === emailOrPhone
  );
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials." });
  }
  res.status(200).json({ message: "Login successful." });
});

app.post("/api/registeremployers", (req, res) => {
  const { email, password, phoneNumber, companyName } = req.body;

  if (!email || !password || !phoneNumber || !companyName) {
    return res
      .status(400)
      .json({ message: "All fields are required for registration." });
  }

  users.push({ email, password, phoneNumber, companyName });
  res.sendStatus(200);
  console.log(users);
});

app.post("/api/loginemployers", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Both email and password are required for login." });
  }

  // Perform login logic and check against the data in the users array
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
