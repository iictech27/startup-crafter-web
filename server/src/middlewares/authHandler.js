const jwt = require("jsonwebtoken");
const { ApiError } = require("../utils/customErrorHandler");
const User = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");

const authHandler = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

    console.log(token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request! Token not found!");
    }

    //verifying token with jwt
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken);

    //finding the user
    const user = await User.findById(decodedToken?._id);

    //checking if user exists
    if (!user) {
      throw new ApiError(401, "Invalid access token !");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

module.exports = authHandler;
