import mongoose, { Schema } from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User",
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 600000,
  },
});

export default mongoose.models.Token || mongoose.model("Token", tokenSchema);
