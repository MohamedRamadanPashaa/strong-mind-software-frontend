import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Result should be belong to user."],
    },
    score: {
      type: Number,
      required: true,
    },
    mistakes: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    table: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
