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
  deleteTopic,
  deleteSubTopic,
  deleteUnit,
  deleteModule,
} = require("../controllers/admin/study_material.controller.js");
const upload = require("../utils/uploader.js");
const {
  getAllIdeas,
  sendFeedback,
} = require("../controllers/admin/idea.controller.js");
const {
  addEvent,
  deleteEvent,
  editEvent,
} = require("../controllers/admin/event.controller.js");

//authentication
router.route("/add-admin").post(addAdmin);
router.route("/admin-login").post(loginAdmin);
router
  .route("/admin-logout")
  .post(authHandler({ userType: "admin" }), logoutAdmin);
router
  .route("/admin/reset-admin-password")
  .post(authHandler({ userType: "admin" }), changeAdminPassword);

//idea review
//fetch all ideas
router
  .route("/admin/get-all-ideas")
  .get(authHandler({ userType: "admin" }), getAllIdeas);
//send feedback to specific idea
router
  .route("/admin/send-idea-feedback")
  .post(authHandler({ userType: "admin" }), sendFeedback);

//manage study material
//create
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

//delete
router
  .route("/admin/study-material/delete-topic")
  .delete(authHandler({ userType: "admin" }), deleteTopic);
router
  .route("/admin/study-material/delete-subtopic")
  .delete(authHandler({ userType: "admin" }), deleteSubTopic);
router
  .route("/admin/study-material/delete-unit")
  .delete(authHandler({ userType: "admin" }), deleteUnit);
router
  .route("/admin/study-material/delete-module")
  .delete(authHandler({ userType: "admin" }), deleteModule);

//events
router.route("/admin/add-event").post(
  authHandler({ userType: "admin" }),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "winnerPicture", maxCount: 1 },
  ]),
  addEvent
);
router
  .route("/admin/delete-event")
  .delete(authHandler({ userType: "admin" }), deleteEvent);
router.route("/admin/edit-event").post(
  authHandler({ userType: "admin" }),
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "winnerPicture", maxCount: 1 },
  ]),
  editEvent
);

module.exports = router;
