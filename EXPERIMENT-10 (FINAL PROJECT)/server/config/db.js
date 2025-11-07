import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    // Log just once to confirm .env variable is loaded
    if (!process.env.MONGODB_URI) {
      throw new Error("❌ Missing MONGODB_URI in .env file");
    }

    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);

    // Add listeners for detailed connection status
    mongoose.connection.on("connected", () => {
      console.log("🟢 Mongoose connected to database");
    });

    mongoose.connection.on("error", (err) => {
      console.error("🔴 Mongoose connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("🟡 Mongoose disconnected");
    });
  } catch (err) {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1); // Stop the server if DB fails
  }
};

export default connectDB;
