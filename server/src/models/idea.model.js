const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const ideaSchema = new Schema(
  {
    uuid: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    slug: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Idea Title is needed"],
    },
    description: {
      type: String,
    },
    document: {
      type: String,
    },
    QA: {
      type: String,
    },
    feedback: {
      type: String,
    },
    ratings: {
      type: Number,
    },
    isFeedbackGiven: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ideaSchema.pre("save", function (next) {
  this.isFeedbackGiven = this.feedback ? true : false;
  next();
});

const Idea = mongoose.model("Idea", ideaSchema);
module.exports = Idea;
