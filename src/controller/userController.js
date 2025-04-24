const User= require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

const register = async (req, res) => {
    const { FirstName, LastName, UserName, dob, email, password,role } = req.body;
    console.log("REGISTER DATA:", req.body); // 👈 log incoming data

    try {
        // Existing email check
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Username check
        const usernameExist = await User.findOne({ UserName });
        if (usernameExist) {
            return res.status(400).json({ msg: "Username already exists" });
        }

        if (!password) {
            return res.status(400).json({ msg: "Password is missing" });
        }

        const HashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            FirstName,
            LastName,
            UserName,
            dob,
            email,
            password: HashedPassword,
            role:role || 'freelancer',
        });   const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },  // Include role in the token payload
            SECRET_KEY,
            { expiresIn: '1h' }
          );

        res.status(201).json({
            msg: "User created successfully",
            token,
            user: {
                id: user._id,
                Firstname: user.FirstName,
                Lastname: user.LastName,
                Username: user.UserName,
                email: user.email,
                role: user.role,
            },
        });
     
      
    } catch (error) {
        console.error("Error during registration:", error.message, error.stack);
        res.status(500).json({ msg: "Server Error" });
    }
};
const login = async (req, res) => {
    try {
        const { email, password, Username, role } = req.body;

        // Check if email and password are provided
        if (!email || !password || !role) {
            return res.status(400).json({ msg: "Please provide email, password, and role." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        // Optional Username check
        if (Username && user.UserName !== Username) {
            return res.status(400).json({ msg: "Invalid Username" });
        }

        // Role check
        if (user.role !== role) {
            return res.status(400).json({
                msg: `Role mismatch. You are trying to log in as a ${role}, but your role is ${user.role}. Please log in with the correct role.`,
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            msg: "Login Successful",
            token,
            user: {
                id: user._id,
                Firstname: user.FirstName,
                Lastname: user.LastName,
                Username: user.UserName,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Server error. Please try again later." });
    }
};

// Update Profile Controller
const updateProfile = async (req, res) => {
    try {
      const { id } = req.params;
      const { FirstName, LastName, UserName, dob, email, role } = req.body;
      const profilePhoto = req.file ? req.file.filename : undefined;
  
      const updateData = { FirstName, LastName, UserName, dob, email, role };
      if (profilePhoto) updateData.profilePhoto = profilePhoto;
  
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
      });
  
      res.status(200).json({
        msg: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ msg: "Server Error" });
    }
  };
  
  
module.exports = {register , login , updateProfile};