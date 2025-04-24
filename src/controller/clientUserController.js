const clientuser = require ("../models/clientUserModel");

export const updateProfile = async (req, res) => {
  try {
    const { name, role, description, linkedin, phone, email } = req.body;
    const profilePhoto = req.file ? req.file.filename : undefined;

    const updateData = { name, role, description, linkedin, phone, email };
    if (profilePhoto) updateData.profilePhoto = profilePhoto;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
