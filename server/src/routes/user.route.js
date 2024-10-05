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
} = require("../controllers/user/blog.controller.js");
const authHandler = require("../middlewares/authHandler.js");

router.route("/user-register").post(registerUser);
router.route("/user-login").post(loginUser);
router
  .route("/user-logout")
  .post(authHandler({ userType: "user" }), logoutUser);

router
  .route("/user/create-blog")
  .post(authHandler({ userType: "user" }), upload.single("image"), createBlog);
router
  .route("/user/edit-blog")
  .put(authHandler({ userType: "user" }), editBlog);
router
  .route("/user/delete-blog")
  .delete(authHandler({ userType: "user" }), deleteBlog);

module.exports = router;
