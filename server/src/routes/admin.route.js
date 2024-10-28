const express = require("express");
const router = express.Router();
const {
  loginAdmin,
  logoutAdmin,
  changeAdminPassword,
  addAdmin,
} = require("../controllers/admin/adminauth.controller");
const authHandler = require("../middlewares/authHandler.js");
const {
  createTopic,
  createSubTopic,
  createUnit,
  createModule,
} = require("../controllers/admin/study_material.controller.js");
const upload = require("../utils/uploader.js");

//authentication
router.route("/add-admin").post(addAdmin);
router.route("/admin-login").post(loginAdmin);
router
  .route("/admin-logout")
  .post(authHandler({ userType: "admin" }), logoutAdmin);
router
  .route("/admin/reset-admin-password")
  .post(authHandler({ userType: "admin" }), changeAdminPassword);

//manage study material
router
  .route("/admin/study-material/create-topic")
  .post(
    authHandler({ userType: "admin" }),
    upload.single("image"),
    createTopic
  );
router
  .route("/admin/study-material/create-subtopic/:topicId")
  .post(
    authHandler({ userType: "admin" }),
    upload.single("image"),
    createSubTopic
  );
router
  .route("/admin/study-material/create-unit/:subTopicId")
  .post(authHandler({ userType: "admin" }), upload.single("image"), createUnit);
router
  .route("/admin/study-material/create-module/:unitId")
  .post(
    authHandler({ userType: "admin" }),
    upload.single("contentFile"),
    createModule
  );

module.exports = router;
