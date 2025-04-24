const express = require("express");
const router = express.Router();
const upload = require("../utils/uploadProfileImage");

// Upload profile image endpoint
router.post("/upload-profile-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `http://localhost:4004/uploads/profileImages/${req.file.filename}`;

    return res.status(200).json({ message: "Image uploaded successfully", imageUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Image upload failed" });
  }
});

module.exports = {clientUserRouter:router};
