import mongoose from "mongoose";
// user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  view: {
    type: String,
    default: "daily",
  },
});

export const UserModel = mongoose.model("User", userSchema);
