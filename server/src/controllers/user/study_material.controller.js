const { Topic } = require("../../models/study_material.model");
const asyncHandler = require("../../utils/asyncHandler");
const { NotFoundError } = require("../../utils/customErrorHandler");
const ResponseHandler = require("../../utils/responseHandler");

const getAllTopics = asyncHandler(async (req, res) => {
  const topics = await Topic.find().select("-_id");

  if (!topics) {
    throw new NotFoundError("Topics Not Found !");
  }

  return res
    .status(200)
    .json(new ResponseHandler(201, "All topics fetched successfully", topics));
});

module.exports = {
  getAllTopics,
};
