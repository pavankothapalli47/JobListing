const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobTitle: String,
  experience: String,
  location: String,
  salary: String,
  CompanyName: String,
  workType: String,
  workLocation: String,
});

module.exports = mongoose.model("Job", jobSchema);
