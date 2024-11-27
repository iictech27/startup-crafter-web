const {
  Topic,
  SubTopic,
  Unit,
  Module,
} = require("../../models/study_material.model");
const asyncHandler = require("../../utils/asyncHandler");
const uploadFileOnCloudinary = require("../../utils/cloudinary");
const { ApiError, NotFoundError } = require("../../utils/customErrorHandler");
// const pdfTextParser = require("../../utils/pdfParser");
const slugify = require("slugify");
const pdf = require("pdf-parse");
const ResponseHandler = require("../../utils/responseHandler");

// create study material
const createTopic = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  let image = req.file?.path;

  if (!title || !description) {
    throw new ApiError(400, "All fields are required !");
  }

  if (!image) {
    image = "public\\uploads\\dummy_blog.jpg";
  }

  const cover_image = await uploadFileOnCloudinary(image);

  if (!cover_image) {
    throw new ApiError(
      500,
      "Cover Image not uploaded ! Something went wrong !"
    );
  }

  const newTopic = await Topic.create({
    slug: slugify(title, { lower: true }),
    title,
    description,
    cover_image,
  });

  const createdNewTopic = await Topic.findById(newTopic._id).select("-_id");
  if (!createdNewTopic) {
    throw new ApiError(500, "Something went wrong");
  }

  return res
    .status(200)
    .json(
      new ResponseHandler(201, "Topic created successfully!", createdNewTopic)
    );
});

const createSubTopic = asyncHandler(async (req, res) => {
  const topicId = req.params.topicId;
  console.log(topicId);
  const { title, description, prerequisites } = req.body;
  let image = req.file?.path;

  const topic = await Topic.findOne({ uuid: topicId });

  if (!topic) {
    throw new NotFoundError("Topic Not Found !");
  }

  if (!title || !description) {
    throw new ApiError(400, "All fields are required !");
  }

  if (!image) {
    image = "public\\uploads\\dummy_blog.jpg";
  }

  const cover_image = await uploadFileOnCloudinary(image);

  if (!cover_image) {
    throw new ApiError(
      500,
      "Cover Image not uploaded ! Something went wrong !"
    );
  }
  const newSubTopic = await SubTopic.create({
    slug: slugify(title, { lower: true }),
    title,
    description,
    cover_image,
    prerequisites,
  });

  const createdNewSubTopic = await SubTopic.findById(newSubTopic._id).select(
    "-_id"
  );
  if (!createdNewSubTopic) {
    throw new ApiError(500, "Something went wrong");
  }

  await Topic.findByIdAndUpdate(
    topic._id,
    {
      $push: { subtopics: newSubTopic._id },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ResponseHandler(
        201,
        "Subtopic created successfully!",
        createdNewSubTopic
      )
    );
});

const createUnit = asyncHandler(async (req, res) => {
  const subTopicId = req.params.subTopicId;
  console.log(subTopicId);

  const { title, description1, description2 } = req.body;

  const subTopic = await SubTopic.findOne({ uuid: subTopicId });

  if (!subTopic) {
    throw new NotFoundError("SubTopic Not Found !");
  }

  if (!title || !description1 || !description2) {
    throw new ApiError(400, "All fields are required !");
  }

  const newUnit = await Unit.create({
    slug: slugify(title, { lower: true }),
    title,
    description1,
    description2,
  });

  const createdNewUnit = await Unit.findById(newUnit._id).select("-_id");
  if (!createdNewUnit) {
    throw new ApiError(500, "Something went wrong");
  }

  await SubTopic.findByIdAndUpdate(
    subTopic._id,
    {
      $push: { units: newUnit._id },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ResponseHandler(201, "Unit created successfully!", createdNewUnit)
    );
});

const createModule = asyncHandler(async (req, res) => {
  const unitId = req.params.unitId;
  console.log(unitId);

  const unit = await Unit.findOne({ uuid: unitId });

  if (!unit) {
    throw new NotFoundError("Unit Not Found !");
  }

  const { title } = req.body;
  const contentFile = req.file?.path;

  if (!title || !contentFile) {
    throw new ApiError(400, "All fields are required !");
  }

  const content = await pdf(contentFile)
    .then((result) => {
      return result.text.toString();
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(content);

  const newModule = await Module.create({
    slug: slugify(title, { lower: true }),
    title,
    content,
  });

  const createdNewModule = await Module.findById(newModule._id).select("-_id");
  if (!createdNewModule) {
    throw new ApiError(500, "Something went wrong");
  }

  await Unit.findByIdAndUpdate(
    unit._id,
    {
      $push: { modules: newModule._id },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ResponseHandler(201, "Module created successfully!", createdNewModule)
    );
});

// edit study material
const editTopic = asyncHandler(async (req, res) => {});

// delete study material
const deleteTopic = asyncHandler(async (req, res) => {
  const { topicId } = req.body;

  const topic = await Topic.findOne({ uuid: topicId });

  if (!topic) {
    throw new NotFoundError("Topic Not Found !");
  }

  await Topic.findByIdAndDelete(topic._id);

  return res
    .status(200)
    .json(new ResponseHandler(201, "Topic deleted successfully!", {}));
});

const deleteSubTopic = asyncHandler(async (req, res) => {
  const { subTopicId } = req.body;

  const subtopic = await SubTopic.findOne({ uuid: subTopicId });

  if (!subtopic) {
    throw new NotFoundError("Subtopic Not Found !");
  }

  //get associated topic ids
  const topicIds = await Topic.find({ subtopics: subtopic._id }).select("_id");

  //remove Subtopic from Topic
  await Topic.updateMany(
    { _id: { $in: topicIds } },
    { $pull: { subtopics: subtopic._id } }
  );

  //delete subtopic
  await SubTopic.findByIdAndDelete(subtopic._id);

  return res
    .status(200)
    .json(new ResponseHandler(201, "Subtopic deleted successfully!", {}));
});

const deleteUnit = asyncHandler(async (req, res) => {
  const { unitId } = req.body;

  const unit = await Unit.findOne({ uuid: unitId });

  if (!unit) {
    throw new NotFoundError("Unit Not Found !");
  }

  //get associated subtopic ids
  const subTopicIds = await SubTopic.find({ units: unit._id }).select("_id");

  //remove Unit from SubTopic
  await SubTopic.updateMany(
    { _id: { $in: subTopicIds } },
    { $pull: { units: unit._id } }
  );

  //delete unit
  await Unit.findByIdAndDelete(unit._id);

  return res
    .status(200)
    .json(new ResponseHandler(201, "Unit deleted successfully!", {}));
});

const deleteModule = asyncHandler(async (req, res) => {
  const { moduleId } = req.body;

  const module = await Module.findOne({ uuid: moduleId });

  if (!module) {
    throw new NotFoundError("Module Not Found !");
  }

  //get associated unit ids
  const unitIds = await Unit.find({ modules: module._id }).select("_id");

  //remove module from unit
  await Unit.updateMany(
    { _id: { $in: unitIds } },
    { $pull: { modules: module._id } }
  );

  //delete module
  await Module.findByIdAndDelete(module._id);

  return res
    .status(200)
    .json(new ResponseHandler(201, "Module deleted successfully!", {}));
});

module.exports = {
  createTopic,
  createSubTopic,
  createUnit,
  createModule,
  deleteTopic,
  deleteSubTopic,
  deleteUnit,
  deleteModule,
  editTopic,
};
