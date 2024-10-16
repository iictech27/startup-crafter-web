const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const moduleSchema = new Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Module title is required"],
    },
    content: {
      type: String,
      required: [true, "Module content is required"],
    },
  },
  { timestamps: true }
);

const unitSchema = new Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Unit title is required"],
    },
    description1: {
      type: String,
      required: [true, "Unit description1 is required"],
    },
    description2: {
      type: String,
      required: [true, "Unit description2 is required"],
    },
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
  },
  { timestamps: true }
);

const subTopicSchema = new Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "SubTopic title is required"],
    },
    description: {
      type: String,
      required: [true, "SubTopic description is required"],
    },
    cover_image: {
      type: String,
    },
    prerequisites: [{ type: String }],
    units: [
      {
        type: Schema.Types.ObjectId,
        ref: "Unit",
      },
    ],
  },
  { timestamps: true }
);

const topicSchema = new Schema(
  {
    uuid: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Topic title is required"],
    },
    description: {
      type: String,
      required: [true, "Topic description is required"],
    },
    cover_image: {
      type: String,
    },
    subtopics: [
      {
        type: Schema.Types.ObjectId,
        ref: "SubTopic",
      },
    ],
  },
  { timestamps: true }
);

const Module = mongoose.model("Module", moduleSchema);
const Unit = mongoose.model("Unit", unitSchema);
const SubTopic = mongoose.model("SubTopic", subTopicSchema);
const Topic = mongoose.model("Topic", topicSchema);
module.exports = { Topic, SubTopic, Unit, Module };
