const {
  Topic,
  SubTopic,
  Unit,
  Module,
} = require("../../models/study_material.model");
const asyncHandler = require("../../utils/asyncHandler");
const { NotFoundError, ApiError } = require("../../utils/customErrorHandler");
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

const getSubTopics = asyncHandler(async (req, res) => {
  const slug = req.params.slug;

  if (!slug) {
    throw new ApiError(400, "Topic Id or Slug required !");
  }

  const topic = await Topic.findOne({ slug: slug });

  if (!topic) {
    throw new NotFoundError("Topic not found !");
  }

  const topicTitle = topic.title;

  const subtopics = await SubTopic.find({
    _id: { $in: topic.subtopics },
  })
    .populate({
      path: "units",
      select: "-_id",
      populate: { path: "modules", select: "-_id" },
    })
    .select("-_id");

  if (!subtopics) {
    throw new NotFoundError("Sub topics Not Found !");
  }

  const subtopicData = subtopics.map((subtopic) => {
    return { topic: topicTitle, ...subtopic };
  });

  return res
    .status(200)
    .json(
      new ResponseHandler(
        201,
        "All Sub topics fetched successfully",
        subtopicData
      )
    );
});

//incomplete

// const getUnits = asyncHandler(async (req, res) => {
//   const subTopicId = req.params.subTopicId;

//   if (!subTopicId) {
//     throw new ApiError(400, "Sub Topic Id required !");
//   }

//   const subtopic = await SubTopic.findOne({ uuid: subTopicId });

//   if (!subtopic) {
//     throw new NotFoundError("Sub Topic not found !");
//   }

//   const subtopicTitle = subtopic.title;

//   const subtopics = await SubTopic.find({
//     _id: { $in: subtopic.subtopics },
//   }).select("-_id");

//   if (!subtopics) {
//     throw new NotFoundError("Sub topics Not Found !");
//   }

//   const subtopicData = subtopics.map((subtopic) => {
//     return { topic: topicTitle, ...subtopic };
//   });

//   return res
//     .status(200)
//     .json(
//       new ResponseHandler(
//         201,
//         "All Sub topics fetched successfully",
//         subtopicData
//       )
//     );
// });

// const getModules = asyncHandler(async (req, res) => {
//   const unitId = req.params.unitId;

//   if (!unitId) {
//     throw new ApiError(400, "Unit Id required !");
//   }

//   const unit = await Unit.findOne({ uuid: unitId });

//   if (!unit) {
//     throw new NotFoundError("Unit not found !");
//   }

//   const unitTitle = unit.title;

//   const module = await Module.find({
//     _id: { $in: unit.modules },
//   }).select("-_id");

//   if (!module) {
//     throw new NotFoundError("Module Not Found !");
//   }

//   // const moduleData = module.map((subtopic) => {
//   //   return { unit: unitTitle, ...subtopic };
//   // });

//   return res
//     .status(200)
//     .json(new ResponseHandler(201, "Modules fetched successfully", module));
// });

module.exports = {
  getAllTopics,
  getSubTopics,
};
