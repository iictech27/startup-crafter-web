const User = require("../../models/user.model");
const asyncHandler = require("../../utils/asyncHandler");
const { ApiError, NotFoundError } = require("../../utils/customErrorHandler");
const ResponseHandler = require("../../utils/responseHandler");

const followUser = asyncHandler(async (req, res) => {
  const { follower_id, following_id } = req.body;

  if (!follower_id || !following_id) {
    throw new ApiError(400, "User ID is required !");
  }

  const followerUser = await User.findOne({ uuid: follower_id });
  if (!followerUser) {
    throw new NotFoundError("Follower user Not Found !");
  }

  const followingUser = await User.findOne({ uuid: following_id });
  if (!followingUser) {
    throw new NotFoundError("Following user Not Found !");
  }

  const following = await User.findByIdAndUpdate(
    followingUser._id,
    {
      $inc: { followers: 1 },
    },
    { new: true }
  ).select("-_id");

  const follower = await User.findByIdAndUpdate(
    followerUser._id,
    {
      $push: { following: followerUser._id },
    },
    { new: true, useFindAndModify: false }
  ).select("-_id");

  if (!follower || !following) {
    throw new ApiError(500, "Something went wrong !");
  }

  return res
    .status(200)
    .json(new ResponseHandler(201, "Followed successfully", following));
});

const unFollowUser = asyncHandler(async (req, res) => {
  const { follower_id, following_id } = req.body;

  if (!follower_id || !following_id) {
    throw new ApiError(400, "User ID is required !");
  }

  const followerUser = await User.findOne({ uuid: follower_id });
  if (!followerUser) {
    throw new NotFoundError("Follower user Not Found !");
  }

  const followingUser = await User.findOne({ uuid: following_id });
  if (!followingUser) {
    throw new NotFoundError("Following user Not Found !");
  }

  const following = await User.findByIdAndUpdate(
    followingUser._id,
    {
      $inc: { followers: -1 },
    },
    { new: true }
  ).select("-_id");

  const follower = await User.findByIdAndUpdate(
    followerUser._id,
    {
      $pull: { following: followerUser._id },
    },
    { new: true, useFindAndModify: false }
  ).select("-_id");

  if (!follower || !following) {
    throw new ApiError(500, "Something went wrong !");
  }

  return res
    .status(200)
    .json(new ResponseHandler(201, "Followed successfully", following));
});

module.exports = {
  followUser,
  unFollowUser,
};
