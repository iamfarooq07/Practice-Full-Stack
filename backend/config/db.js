import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

// const MONGODB_URI = "mongodb://127.0.0.1:27017/user";
const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDatabase() {
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1)
  }
}