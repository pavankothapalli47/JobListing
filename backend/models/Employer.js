const mongoose = require("mongoose");

const employerSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phoneNumber: String,
  companyName: String,
});

module.exports = mongoose.model("Employer", employerSchema);
