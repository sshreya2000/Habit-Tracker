import mongoose from "mongoose";
// habit schema
const habitSchema = new mongoose.Schema(
  {
    habit: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dates: [
      {
        date: String,
        status: String,
      },
    ],
    favourite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const HabitModel = mongoose.model("Habit", habitSchema);
