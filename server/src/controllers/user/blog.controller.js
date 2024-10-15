const slugify = require("slugify");
const { Blog } = require("../../models/blog.model");
const User = require("../../models/user.model");
const asyncHandler = require("../../utils/asyncHandler");
const { ApiError, NotFoundError } = require("../../utils/customErrorHandler");
const ResponseHandler = require("../../utils/responseHandler");

const createBlog = asyncHandler(async (req, res) => {
  const { creatorId, title, content, tags } = req.body;
  const image = req.file?.path;

  if (!creatorId || !title || !content) {
    throw new ApiError(400, "All fields are required!");
  }

  //find if the creatorId exists or not
  const createdBy = await User.findOne({ uuid: creatorId });

  if (!createdBy) {
    throw new NotFoundError("User not found !");
  }

  const tagsArray = typeof tags === "string" ? tags.split(",") : tags;

  const blog = await Blog.create({
    createdBy: createdBy._id,
    title,
    slug: slugify(title, { lower: true }),
    content,
    tags: tagsArray,
    image,
  });

  //checking if blog is created successfully
  const createdBlog = await Blog.findById(blog._id)
    .select("-_id")
    .populate({ path: "createdBy", select: "-_id fullName uuid" });
  if (!createdBlog) {
    throw new ApiError(500, "Something went wrong!");
  }

  return res
    .status(200)
    .json(new ResponseHandler(201, "Blog created successfully!", createdBlog));
});

const editBlog = () => {};

const deleteBlog = asyncHandler(async (req, res) => {
  const { blogID } = req.body;

  if (!blogID) {
    throw new ApiError(400, "All fields are required");
  }

  //find if the blogId exists or not
  const existingBlogID = await Blog.findOne({ uuid: blogID });

  if (!existingBlogID) {
    throw new NotFoundError("Blog Not Found !");
  }

  const deletedBlog = await Blog.findByIdAndDelete(existingBlogID._id);

  //checking if blog is deleted successfully
  const blogDeleted = await Blog.findById(deletedBlog._id);
  if (blogDeleted) {
    throw new ApiError(500, "Something went wrong!");
  }

  return res
    .status(200)
    .json(new ResponseHandler(201, "Blog Deleted successfully"));
});

const getIndividualBlog = asyncHandler(async (req, res) => {
  const { individualBlogSlug } = req.params;

  if (!individualBlogSlug) {
    throw new ApiError(400, "Params required for individual blog !");
  }

  const individualBlog = await Blog.findOne({ slug: individualBlogSlug })
    .select("-_id")
    .populate({
      path: "createdBy",
      select: "fullName",
    });

  if (!individualBlog) {
    throw new NotFoundError("Blogs Not Found !");
  }

  return res
    .status(200)
    .json(
      new ResponseHandler(201, "Blog fetched successfully", individualBlog)
    );
});

const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().select("-_id").populate({
    path: "createdBy",
    select: "-_id fullName uuid",
  });

  if (!blogs) {
    throw new NotFoundError("Blogs Not Found !");
  }

  return res
    .status(200)
    .json(new ResponseHandler(201, "All Blogs fetched successfully", blogs));
});

const saveBlog = asyncHandler(async (req, res) => {
  const { blogId, userId } = req.body;

  if (!blogId || !userId) {
    throw new ApiError(400, "All fields are required!");
  }

  const blog = await Blog.findOne({ uuid: blogId });

  const user = await User.findOne({ uuid: userId });

  if (!blog || !user) {
    throw new NotFoundError("Blog or User Not Found !");
  }

  const savedBlog = await User.findByIdAndUpdate(
    user._id,
    {
      $push: { savedBlogs: blog._id },
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

// const getUserCreatedBlogs = asyncHandler(async (req, res) => {
//   const { creatorId } = req.body;
//   const blogs = await Blog.find({ createdBy: creatorId }).populate({
//     path: "createdBy",
//     select: "fullName",
//   });

//   if (!blogs) {
//     throw new NotFoundError("Blogs Not Found !");
//   }

//   return res
//     .status(200)
//     .json(
//       new ResponseHandler(
//         201,
//         "All User Created Blogs fetched successfully",
//         blogs
//       )
//     );
// });

module.exports = {
  createBlog,
  editBlog,
  deleteBlog,
  getIndividualBlog,
  getAllBlogs,
  // getUserCreatedBlogs,
  saveBlog,
};
