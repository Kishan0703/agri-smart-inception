import mongoose from "mongoose";

const connectDB = async () => {
  if (process.env.SKIP_DB === "true") {
    console.log("Skipping MongoDB connection (SKIP_DB=true)");
    return;
  }

  if (!process.env.MONGO_URI) {
    console.log("Skipping MongoDB connection (MONGO_URI not set)");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
