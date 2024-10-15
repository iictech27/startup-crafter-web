const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
//local imports
const { ApiError } = require("../../utils/customErrorHandler");
const ResponseHandler = require("../../utils/responseHandler");
const asyncHandler = require("../../utils/asyncHandler");
const User = require("../../models/user.model");

//access token refresh token generating utility method
const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Access token, Refresh token generating failed !");
  }
};

//register user
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  //checking if any field is unfilled
  if (!fullName || !email || !password) {
    throw new ApiError(400, "All fields are required !");
  }

  //checking if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  let newUUID;
  let existingUUID;

  //checking if same uuid exists
  do {
    newUUID = uuidv4();
    existingUUID = await User.findOne({ uuid: newUUID });
  } while (existingUUID);

  //creating new user
  const user = await User.create({
    uuid: newUUID,
    fullName,
    email,
    password,
  });

  //checking if user is created successfully
  const createdUser = await User.findById(user._id).select("-_id -password");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong!");
  }
  return res
    .status(200)
    .json(
      new ResponseHandler(201, "User registered successfully", createdUser)
    );
});

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //checking if any field is unfilled
  if (!email || !password) {
    throw new ApiError(400, "All fields are required !");
  }

  //checking if the user exists or not
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(409, "User not exists ! Please register !");
  }

  //checking if given password is valid
  const isPasswordValid = await user.isValidPassword(password);
  if (!isPasswordValid) {
    throw new ApiError(409, "Invalid user login credentials");
  }

  //generate tokens
  const { accessToken, refreshToken } = await generateTokens(user._id);

  //fetching logged in user
  const loggedInUser = await User.findById(user._id).select(
    "-_id -password -refreshToken"
  );

  //configuring cookie options
  const options = {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ResponseHandler(201, "User logged in successfully", loggedInUser)
    );
});

//logout user
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ResponseHandler(200, "User logged Out", {}));
});

//refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }

    //verifiying token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    //finding user
    const user = await User.findById(decodedToken?._id);

    //checking if user exists
    if (!user) {
      throw new ApiError(401, "Access token not found");
    }

    //checking if both refresh token matches
    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Invalid access token");
    }

    //generate new tokens
    const { accessToken, refreshToken } = await generateTokens(user._id);

    const options = {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ResponseHandler(201, "Access token refreshed successfully"));
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

//change user password
const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  //checking if user entered existing password correct
  const user = await User.findById(req.user?._id);
  const isPasswordValid = user.isValidPassword(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ResponseHandler(200, "Password changed successfully"));
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeUserPassword,
};
