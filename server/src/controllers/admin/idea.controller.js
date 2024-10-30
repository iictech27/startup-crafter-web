const Idea = require("../../models/idea.model");
const asyncHandler = require("../../utils/asyncHandler");
const { NotFoundError, ApiError } = require("../../utils/customErrorHandler");
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

const sendFeedback = asyncHandler(async (req, res) => {
  const { ideaId, feedback, ratings } = req.body;

  if (!ideaId || !feedback || !ratings) {
    throw new ApiError(400, "All fields are required");
  }

  const idea = await Idea.findOne({ uuid: ideaId });

  if (!idea) {
    throw new NotFoundError("Idea not found !");
  }

  console.log(idea);

  const updatedIdeaWithFeedback = await Idea.findByIdAndUpdate(
    idea._id,
    {
      feedback: feedback,
      ratings: ratings,
    },
    { new: true }
  ).select("-_id");

  console.log(updatedIdeaWithFeedback);

  return res
    .status(200)
    .json(new ResponseHandler(201, "Feedback sent !", updatedIdeaWithFeedback));
});

module.exports = { getAllIdeas, sendFeedback };
