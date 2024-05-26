import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Post should be belong user"],
    },

    subject: {
      type: String,
      trim: true,
    },

    photo: {
      type: String,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    likes: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
