import mongoose, { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
  nombre: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

export const User = models.User || model("User", UserSchema);