const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const userSchema = new Schema(
  {
    uuid: { type: String, default: uuidv4, unique: true },
    fullName: {
      type: String,
      required: [true, "Enter full name"],
    },
    email: {
      type: String,
      required: [true, "Enter email"],
      unique: true,
      validate: [validator.isEmail, "Enter an valid email"],
    },
    password: {
      type: String,
      required: [true, "Enter password"],
      minLength: [8, "Password must be of at least 8 characters"],
    },
    savedBlogs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: {
      type: Number,
      default: 0,
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//password validity checking method
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//access token generating method
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//refresh token generating method
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);
module.exports = User;
