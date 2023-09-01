const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  mobileNumber: String,
  gender: String,
});

module.exports = mongoose.model("User", userSchema);
