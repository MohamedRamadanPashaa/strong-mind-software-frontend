import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    competitor: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Result should be belong to user."],
    },
    competition: {
      type: mongoose.Schema.ObjectId,
      ref: "Competition",
    },
    standard: {
      type: String,
      required: [true, "Discipline should have standard."],
      enum: {
        values: ["National", "International", "World", "Custom"],
        message:
          "Standard is either: 'National', 'International', 'World', 'Custom'",
      },
    },
    discipline: {
      type: String,
      required: [true, "Discipline should have discipline."],
    },
    score: {
      type: Number,
      // required: [true, "Discipline result should have score."],
    },
    correct: {
      type: Number,
      // required: [true, "Discipline result should have correct."],
    },
    memoTime: {
      type: Number,
      // required: [true, "Discipline should have time."],
    },
    recallTime: {
      type: Number,
      // required: [true, "Discipline should have time."],
    },
    points: {
      type: Number,
      // required: [true, "Discipline result should have points."],
    },
    memoData: {
      type: Array,
      required: [true, "Discipline should have memorization data."],
    },
    recallData: {
      type: Array,
      // required: [true, "Discipline should have recall data."],
    },
    language: {
      type: String,
      default: "arabic",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Discipline", resultSchema);
