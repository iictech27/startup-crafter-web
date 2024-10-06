const express = require("express");
const router = express.Router();
const upload = require("../utils/uploader.js");
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
} = require("../controllers/user/blog.controller.js");
const authHandler = require("../middlewares/authHandler.js");

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
  .route("/user/get-user-blogs")
  .post(authHandler({ userType: "user" }), getUserCreatedBlogs);
router
  .route("/user/save-blog")
  .post(authHandler({ userType: "user" }), saveBlog);

//idea

//study material

module.exports = router;
