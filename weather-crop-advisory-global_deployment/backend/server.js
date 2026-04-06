import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import advisoryRoutes from "./routes/advisoryRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import shopsRoutes from "./routes/shops.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Allow all CORS
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Weather to Crop Advisory API running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/advisory", advisoryRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/shops", shopsRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));