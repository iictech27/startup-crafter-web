const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

//internal imports

const app = express();

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set view engine

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//parse cookies
app.use(cookieParser());

//set up routing

//errors handler

module.exports = app;
