import mongoose from "mongoose";
import slugify from "slugify";

const competitionSchema = new mongoose.Schema(
  {
    competitionName: {
      type: String,
      required: [true, "Competition should have a name."],
    },
    slug: String,
    participants: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    starts: {
      type: Date,
      required: [true, "Please add competition start Date."],
    },
    ends: {
      type: Date,
      required: [true, "Please add competition end Date."],
      validate: {
        validator: function (val) {
          return val > this.starts;
        },

        // ({VALUE}) Will get the ends value
        message: "End date ({VALUE}) should be below the start date",
      },
    },
    regStarts: {
      type: Date,
      required: [true, "Please add competition registration start Date."],
    },
    regEnds: {
      type: Date,
      required: [true, "Please add competition registration end Date."],
      validate: {
        validator: function (val) {
          return val > this.regStarts;
        },

        // ({VALUE}) Will get the ends value
        message:
          "registration end date ({VALUE}) should be below the registration start date",
      },
    },
    description: {
      type: String,
      required: [true, "Please add a competition description."],
    },
    maxParticipants: {
      type: Number,
    },
    standard: {
      type: String,
      required: [true, "Please add competition standard."],
      enum: {
        values: ["National", "International", "World"],
        message: "Standard is either: 'National', 'International', 'World'.",
      },
    },
    season: {
      type: Number,
      required: [true, "Please add competition season."],
    },
  },
  { timestamps: true }
);

competitionSchema.pre("save", function (next) {
  this.slug = slugify(this.competitionName, { lower: true });
  next();
});

export default mongoose.models.Competitions ||
  mongoose.model("Competition", competitionSchema);
