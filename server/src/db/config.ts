import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@write-nest.6jhwcgi.mongodb.net/?retryWrites=true&w=majority&appName=write-nest`;

// create and export mongoose connection
const connect = async () => {
  try {
    await mongoose.connect(uri)
  } catch (err: any) {
    console.error("Error while connecting to database: ", err.message)
  }
}

export {connect};
