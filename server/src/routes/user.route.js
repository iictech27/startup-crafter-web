const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user/userauth.controller");
const authHandler = require("../middlewares/authHandler.js");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(authHandler, logoutUser);

module.exports = router;
