const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const eventRoutes = require("./routes/eventRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
const PORT = process.env.PORT || 3334;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
