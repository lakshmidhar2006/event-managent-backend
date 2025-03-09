const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");
const Organizer = require("../models/Organizer");
require("dotenv").config();

const router = express.Router();
<<<<<<< HEAD
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });
=======

>>>>>>> e311868 (Initial commit)

// User Signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already in use" });
<<<<<<< HEAD

=======
    
>>>>>>> e311868 (Initial commit)
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Organizer Signup
<<<<<<< HEAD
router.post("/organizer/signup", upload.single("proofOfIdentity"), async (req, res) => {
    try {
        const { name, email, password, organizationName } = req.body;
        if (!name || !email || !password || !organizationName || !req.file) return res.status(400).json({ message: "All fields are required" });
=======
router.post("/organizer/signup",  async (req, res) => {
    try {
        const { name, email, password, organizationName } = req.body;
        if (!name || !email || !password || !organizationName ) return res.status(400).json({ message: "All fields are required" });
>>>>>>> e311868 (Initial commit)

        const organizerExists = await Organizer.findOne({ email });
        if (organizerExists) return res.status(400).json({ message: "Email already in use" });

<<<<<<< HEAD
        const proofOfIdentity = req.file.path;
        const organizer = await Organizer.create({ name, email, password, organizationName, proofOfIdentity });
=======
        
        const organizer = await Organizer.create({ name, email, password, organizationName });
>>>>>>> e311868 (Initial commit)

        res.status(201).json({ message: "Organizer registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// Login Route
<<<<<<< HEAD
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }) || await Organizer.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ message: "Login successful", token, role: user.role });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

=======


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }) || await Organizer.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        // ✅ Secure password comparison
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        // ✅ Generate JWT Token (Recommended)
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error" });
    }
});



>>>>>>> e311868 (Initial commit)
module.exports = router;
