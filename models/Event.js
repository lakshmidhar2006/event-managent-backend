const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    eventName: { type: String, required: true },
    eventOrganizer: { type: String, required: true },
    webLink: { type: String, required: true },
    eventCategory: { type: String, required: true },
    eventClassification: { type: String, required: true },
    status: { type: String, required: true },
    registrationStartDate: { type: Date, required: true },
    registrationEndDate: { type: Date, required: true },
    durationDays: { type: Number, required: true },
    eventLocation: { type: String, required: true },
    eventLevel: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    competitionName: { type: String, required: true },
    winnerPrize: { type: String, required: true },
    createdDate: { type: Date, required: true },
    logo: { type: String } // Store file path
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);
