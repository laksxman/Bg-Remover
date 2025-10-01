import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log(" MongoDB connected successfully");
    });

    mongoose.connection.on("error", (err) => {
      console.error(" MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn(" MongoDB disconnected");
    });

    // Now connect
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.error(" Error while connecting MongoDB:", error.message);
    process.exit(1); 
  }
};

export default connectDB;
