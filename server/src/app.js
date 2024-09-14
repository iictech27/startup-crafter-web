const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal imports
const defaultErrorHandler = require("./middlewares/defaultErrorHandler");
const userRouter = require("./routes/user.route");
const testRouter = require("./routes/test.route");

const app = express();

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser());

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/user", testRouter);

//errors handler
app.use(defaultErrorHandler);

module.exports = app;
