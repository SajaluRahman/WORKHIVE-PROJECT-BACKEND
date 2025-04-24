 const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  role: String,
  description: String,
  linkedin: String,
  phone: String,
  email: String,
  profilePhoto: String, // NEW FIELD
});

const ClientUser = mongoose.model("User", userSchema);

module.exports = ClientUser;
