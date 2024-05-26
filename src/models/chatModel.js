import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
