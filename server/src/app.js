const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//internal imports
const defaultErrorHandler = require("./middlewares/defaultErrorHandler");
const userRouter = require("./routes/user.route");
const testRouter = require("./routes/test.route");
const adminRouter = require("./routes/admin.route");

const app = express();

//cors
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser());

//routes
app.use("/api/v1", userRouter);
app.use("/api/v1", adminRouter);
app.use("/api/v1", testRouter);

//errors handler
app.use(defaultErrorHandler);

module.exports = app;
