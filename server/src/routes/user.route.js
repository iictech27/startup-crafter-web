const express = require("express");
const router = express.Router();
const upload = require("../utils/uploader.js");
const authHandler = require("../middlewares/authHandler.js");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/user/userauth.controller");
const {
  createBlog,
  editBlog,
  deleteBlog,
  getAllBlogs,
  getUserCreatedBlogs,
  saveBlog,
  getIndividualBlog,
} = require("../controllers/user/blog.controller.js");
const {
  unFollowUser,
  followUser,
} = require("../controllers/user/userfollow.controller.js");
const {
  getAllTopics,
  getSubTopics,
  getUnits,
  getModules,
} = require("../controllers/user/study_material.controller.js");

//authentication
router.route("/user-register").post(registerUser);
router.route("/user-login").post(loginUser);
router
  .route("/user-logout")
  .post(authHandler({ userType: "user" }), logoutUser);

//blog
router
  .route("/user/create-blog")
  .post(authHandler({ userType: "user" }), upload.single("image"), createBlog);
router
  .route("/user/edit-blog")
  .put(authHandler({ userType: "user" }), editBlog);
router
  .route("/user/delete-blog")
  .delete(authHandler({ userType: "user" }), deleteBlog);
router.route("/user/get-all-blogs").get(getAllBlogs);
router
  .route("/user/save-blog")
  .post(authHandler({ userType: "user" }), saveBlog);
router.route("/user/get-blog/:individualBlogSlug").get(getIndividualBlog);

//follow user
router
  .route("/user/follow-user")
  .post(authHandler({ userType: "user" }), followUser);
router
  .route("/user/unFollow-user")
  .post(authHandler({ userType: "user" }), unFollowUser);

//idea

//study material
router.route("/user/get-all-topics").get(getAllTopics);
router.route("/user/get-subtopics/:topicId").get(getSubTopics);
// router.route("/user/get-units/:subTopicId").get(getUnits);
// router.route("/user/get-modules/:unitId").get(getModules);

module.exports = router;
