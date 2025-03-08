const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const organizerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    organizationName: { type: String, required: true },
    proofOfIdentity: { type: String, required: true }, // File upload path
    role: { type: String, default: "organizer" },
});

// Hash password before saving
organizerSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("Organizer", organizerSchema);
