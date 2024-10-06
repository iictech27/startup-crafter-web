const { Blog } = require("../../models/blog.model");
const User = require("../../models/user.model");
const asyncHandler = require("../../utils/asyncHandler");
const { ApiError, NotFoundError } = require("../../utils/customErrorHandler");
const ResponseHandler = require("../../utils/responseHandler");

const createBlog = asyncHandler(async (req, res) => {
  const { creatorId, title, content } = req.body;
  const image = req.file?.path;

  if (!creatorId || !title || !content) {
    throw new ApiError(400, "All fields are required!");
  }

  //find if the creatorId exists or not
  const createdBy = await User.findById(creatorId);

  if (!createdBy) {
    throw new NotFoundError("User not found !");
  }

  const blog = await Blog.create({
    createdBy: creatorId,
    title,
    content,
    image,
  });

  //checking if blog is created successfully
  const createdBlog = await Blog.findById(blog._id);
  if (!createdBlog) {
    throw new ApiError(500, "Something went wrong!");
  }

  return res
    .status(200)
    .json(new ResponseHandler(201, "Blog created successfully!", blog));
});

const editBlog = () => {};

const deleteBlog = asyncHandler(async (req, res) => {
  const { blogID } = req.body;

  if (!blogID) {
    throw new ApiError(400, "All fields are required");
  }

  //find if the blogId exists or not
  const existingBlogID = await Blog.findById(blogID);

  if (!existingBlogID) {
    throw new NotFoundError("Blog Not Found !");
  }

  const deletedBlog = await Blog.findByIdAndDelete(blogID);

  //checking if blog is deleted successfully
  const blogDeleted = await Blog.findById(deletedBlog._id);
  if (blogDeleted) {
    throw new ApiError(500, "Something went wrong!");
  }

  return res
    .status(200)
    .json(new ResponseHandler(201, "Blog Deleted successfully"));
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate({
    path: "createdBy",
    select: "fullName",
  });

  if (!blogs) {
    throw new NotFoundError("Blogs Not Found !");
  }

  return res
    .status(200)
    .json(new ResponseHandler(201, "All Blogs fetched successfully", blogs));
});

const getUserCreatedBlogs = asyncHandler(async (req, res) => {
  const { creatorId } = req.body;
  const blogs = await Blog.find({ createdBy: creatorId }).populate({
    path: "createdBy",
    select: "fullName",
  });

  if (!blogs) {
    throw new NotFoundError("Blogs Not Found !");
  }

  return res
    .status(200)
    .json(
      new ResponseHandler(
        201,
        "All User Created Blogs fetched successfully",
        blogs
      )
    );
});

const saveBlog = asyncHandler(async (req, res) => {
  const { blogId, userId } = req.body;

  if (!blogId || !userId) {
    throw new ApiError(400, "All fields are required!");
  }

  const blog = await Blog.findById(blogId);

  const user = await User.findById(userId);

  if (!blog || !user) {
    throw new NotFoundError("Blog or User Not Found !");
  }

  const savedBlog = await User.findByIdAndUpdate(
    userId,
    {
      $push: { savedBlogs: blogId },
    },
    { new: true, useFindAndModify: false }
  );

  if (!savedBlog) {
    throw new ApiError(500, "Something went wrong");
  }

  return res
    .status(200)
    .json(new ResponseHandler(201, "Blog saved successfully", blogId));
});

module.exports = {
  createBlog,
  editBlog,
  deleteBlog,
  getAllBlogs,
  getUserCreatedBlogs,
  saveBlog,
};
