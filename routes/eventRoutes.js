const express = require("express");
const Event = require("../models/Event"); // Import the schema

const router = express.Router();

// Create Event (POST request)
router.post("/create", async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ message: "Event created successfully!", event: newEvent });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({ events });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Server Error", error });
    }
});   


module.exports = router;
