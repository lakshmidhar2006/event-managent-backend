const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventOrganizer: { type: String, required: true },
    webLink: { type: String, required: true },
    eventCategory: { 
        type: String, 
        required: true, 
        enum: ["Paper Presentation", "Competition", "Innovathon"] 
    },
    eventClassification: { 
        type: String, 
        required: true, 
        enum: [
            "Fest Events", 
            "Technical Hackathon Online", 
            "Technical Hackathon Offline", 
            "Non Technical Events Online", 
            "Non Technical Events Offline"
        ] 
    },
    status: { type: String, required: true },
    registrationStartDate: { type: Date, required: true },
    registrationEndDate: { type: Date, required: true },
    durationDays: { type: Number, required: true, min: 1 },
    eventLocation: { type: String, required: true },
    eventLevel: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    competitionName: { type: String, required: true },
    winnerPrize: { type: String, required: true },
    createdDate: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
