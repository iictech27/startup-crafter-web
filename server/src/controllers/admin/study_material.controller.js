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
const pdf = require("pdf-parse");
const ResponseHandler = require("../../utils/responseHandler");

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

module.exports = {
  createTopic,
  createSubTopic,
  createUnit,
  createModule,
};
