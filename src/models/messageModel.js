import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Message should be belong an user."],
    },

    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Message should be send to an user."],
    },

    chat: {
      type: mongoose.Schema.ObjectId,
      ref: "Chat",
      required: [true, "Message should be belong a chat."],
    },

    text: {
      type: String,
      trim: true,
    },

    photo: String,

    delivered: {
      type: Boolean,
      default: false,
    },

    read: {
      type: Boolean,
      default: false,
    },

    deliveredAt: Date,

    displayedAt: Date,

    deletedMessage: false,
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
