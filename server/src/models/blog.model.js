const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { v4: uuidv4 } = require("uuid");

const commentSchema = new Schema(
  {
    commentBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: [true, "Comment content is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const blogSchema = new Schema(
  {
    uuid: {
      type: String,
      unique: true,
      default: uuidv4,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    slug: {
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Blog Title is needed"],
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    tags: [{ type: String }],
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = { Blog, Comment };
