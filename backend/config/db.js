import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/user";

export async function connectDatabase() {
  
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}