import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async() => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } 
  catch(error) {
    console.error('MongoDB connection error: ', error.message);
    throw error;
  }
};

export default connectDB;