// import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL as string);
    // const mongoClient = new MongoClient(process.env.MONGODB_URL as string);
    console.log("Database connect sucessfully");
  } catch (error) {
    console.log("Database error");
    // throw new Error(error);
  }
};

export default dbConnect;
