import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nombre: String,
  cc: String,
  email: String,
  password: String,
  role: String,
});

export const User =
  mongoose.models.User ||
  mongoose.model("User", UserSchema);