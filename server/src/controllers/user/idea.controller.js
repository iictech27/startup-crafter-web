const slugify = require("slugify");
const User = require("../../models/user.model");
const asyncHandler = require("../../utils/asyncHandler");
const { ApiError, NotFoundError } = require("../../utils/customErrorHandler");
const ResponseHandler = require("../../utils/responseHandler");
const uploadFileOnCloudinary = require("../../utils/cloudinary");
const Idea = require("../../models/idea.model");

const submitIdea = asyncHandler(async (req, res) => {
  const { submittedBy, title, description, QA } = req.body;
  let document = req.file?.path;

  if (!submittedBy || !title || !description || !document) {
    throw new ApiError(400, "All fields are required!");
  }

  const document_file = await uploadFileOnCloudinary(document);

  if (!document_file) {
    throw new ApiError(
      500,
      "Document link/pdf not uploaded ! Something went wrong !"
    );
  }

  //find if the submitter user exists or not
  const submitter = await User.findOne({ uuid: submittedBy });

  if (!submitter) {
    throw new NotFoundError("Submitter user not found !");
  }

  const idea = await Idea.create({
    submittedBy: submitter._id,
    title,
    slug: slugify(title, { lower: true }),
    description,
    document: document_file,
    QA,
  });

  //checking if idea is submitted successfully
  const submittedIdea = await Idea.findById(idea._id).select("-_id");
  if (!submittedIdea) {
    throw new ApiError(500, "Something went wrong!");
  }

  return res
    .status(200)
    .json(
      new ResponseHandler(201, "Idea submitted successfully!", submittedIdea)
    );
});

const deleteIdea = asyncHandler(async (req, res) => {
  const { ideaId } = req.body;

  if (!ideaId) {
    throw new ApiError(400, "Idea ID is required!");
  }

  //find if the submitter user exists or not
  const idea = await Idea.findOne({ uuid: ideaId });

  if (!idea) {
    throw new NotFoundError("Idea not found !");
  }

  await Idea.findByIdAndDelete(idea._id);

  return res
    .status(200)
    .json(new ResponseHandler(201, "Idea deleted successfully!", {}));
});

const getIdeas = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(400, "User ID is required!");
  }

  const user = await User.findOne({ uuid: userId });

  if (!user) {
    throw new NotFoundError("User not found !");
  }

  const ideas = await Idea.find({ submittedBy: user._id }).select("-_id");

  if (!ideas) {
    throw new ApiError(500, "Something went wrong!");
  }

  return res
    .status(200)
    .json(new ResponseHandler(201, "Ideas fetched successfully", ideas));
});

module.exports = { submitIdea, deleteIdea, getIdeas };
