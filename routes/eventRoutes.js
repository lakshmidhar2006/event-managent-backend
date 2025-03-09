const express = require("express");
const multer = require("multer");
const path = require("path");
const Event = require("../models/Event");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// 🟢 Create Event
router.post("/create", upload.single("logo"), async (req, res) => {
    try {
        const {
            eventName, eventOrganizer, webLink, eventCategory, status, registrationStartDate, registrationEndDate,
            durationDays, eventLocation, eventLevel, state, country, competitionName, winnerPrize, createdDate, eventClassification
        } = req.body;

        const newEvent = new Event({
            eventName,
            eventOrganizer,
            webLink,
            eventCategory,
            eventClassification,
            status,
            registrationStartDate,
            registrationEndDate,
            durationDays,
            eventLocation,
            eventLevel,
            state,
            country,
            competitionName,
            winnerPrize,
            createdDate,
            logo: req.file ? req.file.path : null
        });

        await newEvent.save();
        res.status(201).json({ message: "Event created successfully", event: newEvent });

    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🟢 Get All Events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

// 🟢 Get Event by ID
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch event" });
    }
});

// 🟢 Get Events by Category
router.get("/category/:eventCategory", async (req, res) => {
    try {
        const events = await Event.find({ eventCategory: req.params.eventCategory });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events by category" });
    }
});

// 🟢 Get Events by Classification
router.get("/classification/:eventClassification", async (req, res) => {
    try {
        const events = await Event.find({ eventClassification: req.params.eventClassification });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events by classification" });
    }
});

// 🟢 Update Event by ID
router.put("/update/:id", upload.single("logo"), async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.logo = req.file.path;
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        res.status(500).json({ error: "Failed to update event" });
    }
});

// 🟢 Delete Event by ID
router.delete("/delete/:id", async (req, res) => {
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete event" });
    }
});

module.exports = router;
