const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const eventSchema = new Schema(
  {
    uuid: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    title: {
      type: String,
      required: [true, "Event Title is needed"],
    },
    slug: {
      type: String,
      unique: true,
    },
    picture: {
      type: String,
    },
    about: {
      type: String,
    },
    startingDate: {
      type: Date,
      required: [true, "Event starting date is required"],
    },
    endingDate: {
      type: Date,
      required: [true, "Event ending date is required"],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
    },
    stages: [
      {
        title: {
          type: String,
          required: [true, "Stage Title is needed"],
        },
        description: {
          type: String,
        },
        startingDate: {
          type: Date,
          required: [true, "Stage starting date is required"],
        },
        endingDate: {
          type: Date,
          required: [true, "Stage ending date is required"],
        },
      },
    ],
    previousWinner: {
      teamName: {
        type: String,
        required: [true, "Winner team name is required"],
      },
      about: {
        type: String,
      },
      picture: {
        type: String,
      },
    },
    firstRunnerUp: {
      teamName: {
        type: String,
        required: [true, "1st Runner-up team name is required"],
      },
      about: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
