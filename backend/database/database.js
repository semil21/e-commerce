import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/e-commerce");
    console.log("database connected");
  } catch (error) {
    console.group("failed to connect with databse", error);
  }
};

export default connectDB;
