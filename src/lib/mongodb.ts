import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error conectando MongoDB");

    throw error;
  }
}