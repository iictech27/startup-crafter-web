const Idea = require("../../models/idea.model");
const User = require("../../models/user.model");
const asyncHandler = require("../../utils/asyncHandler");
const { ApiError, NotFoundError } = require("../../utils/customErrorHandler");
const ResponseHandler = require("../../utils/responseHandler");

const getAllIdeas = asyncHandler(async (req, res) => {
  const ideas = await Idea.find().populate({
    path: "submittedBy",
    select: "uuid fullName email",
  });

  if (!ideas) {
    throw new NotFoundError(500, "Ideas not found");
  }

  return res
    .status(200)
    .json(new ResponseHandler(201, "All Ideas fetched successfully", ideas));
});

module.exports = { getAllIdeas };
