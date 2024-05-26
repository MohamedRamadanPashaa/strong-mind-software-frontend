import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Post should be belong user"],
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: [true, "Post should be belong to post"],
    },
    text: {
      type: String,
      require: [true, "Comment can't be empty"],
      trim: true,
    },
    photo: String,
    likes: Array,
    dislikes: Array,
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
