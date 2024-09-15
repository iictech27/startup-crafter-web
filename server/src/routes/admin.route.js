const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  logoutAdmin,
  changeAdminPassword,
  addAdmin,
} = require("../controllers/admin/adminauth.controller");
const authHandler = require("../middlewares/authHandler.js");

router.route("/add-admin").post(addAdmin);
router.route("/admin-login").post(loginAdmin);
router
  .route("/admin-logout")
  .post(authHandler({ userType: "admin" }), logoutAdmin);
router
  .route("/admin/reset-admin-password")
  .post(authHandler({ userType: "admin" }), changeAdminPassword);

module.exports = router;
