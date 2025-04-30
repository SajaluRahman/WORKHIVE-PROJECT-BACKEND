const express = require("express");
const { createClientProfile } = require("../controller/clientProfileController");
const upload = require("../utils/uploadProfileImage"); // multer middleware

const router = express.Router();

// Create new profile
router.post("/create", upload.single("profilePhoto"), createClientProfile);

module.exports = {clientProfileRouter : router};
