import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const MONGO_URL = process.env.MONGO_URL;

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}/?retryWrites=true&w=majority&appName=write-nest`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err: any) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

export { connectDB, mongoose };
