const mongoose = require("mongoose");

const clientProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profilePhoto: {
    type: String, // store filename or URL
  },
}, {
  timestamps: true, // adds createdAt & updatedAt
});

const ClientProfile = mongoose.model("ClientProfile", clientProfileSchema);

module.exports = ClientProfile;
