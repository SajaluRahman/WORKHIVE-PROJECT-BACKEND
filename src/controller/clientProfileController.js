const ClientProfile = require("../models/clientProfileModel");

// Create new client profile
const createClientProfile = async (req, res) => {
  try {
    const { name, role, description, linkedin, phone, email } = req.body;
    const profilePhoto = req.file ? req.file.filename : undefined;

    const existingProfile = await ClientProfile.findOne({ email });
    if (existingProfile) {
      return res.status(400).json({ msg: "Profile with this email already exists." });
    }

    const newProfile = await ClientProfile.create({
      name,
      role,
      description,
      linkedin,
      phone,
      email,
      profilePhoto,
    });

    res.status(201).json({
      msg: "Client profile created successfully",
      profile: newProfile,
    });
  } catch (error) {
    console.error("Error creating client profile:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { createClientProfile };
