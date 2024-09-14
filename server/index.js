//external imports
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

//internal imports
const connectDB = require("./db/config");
const app = require("./app");

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`app is running on ${process.env.PORT}`);
});
