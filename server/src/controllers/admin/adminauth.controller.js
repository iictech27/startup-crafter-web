const jwt = require("jsonwebtoken");
//local imports
const { ApiError } = require("../../utils/customErrorHandler");
const ResponseHandler = require("../../utils/responseHandler");
const asyncHandler = require("../../utils/asyncHandler");
const Admin = require("../../models/admin.model");

//access token refresh token generating utility method
const generateTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Access token, Refresh token generating failed !");
  }
};

//add admin
const addAdmin = asyncHandler(async (req, res) => {
  const { adminName, password } = req.body;

  //checking if any field is unfilled
  if (!adminName || !password) {
    throw new ApiError(400, "All fields are required !");
  }

  //checking if the admin already exists
  const existingAdmin = await Admin.findOne({ adminName });
  if (existingAdmin) {
    throw new ApiError(409, "Admin already exists");
  }

  //creating new admin
  const admin = await Admin.create({
    adminName,
    password,
  });

  //checking if admin is added successfully
  const addedAdmin = await Admin.findById(admin._id).select("-password");
  if (!addedAdmin) {
    throw new ApiError(500, "Something went wrong!");
  }
  return res
    .status(200)
    .json(
      new ResponseHandler(201, "Admin registered successfully", addedAdmin)
    );
});

//login admin
const loginAdmin = asyncHandler(async (req, res) => {
  const { adminName, password } = req.body;

  //checking if any field is unfilled
  if (!adminName || !password) {
    throw new ApiError(400, "All fields are required !");
  }

  //checking if the admin exists or not
  const admin = await Admin.findOne({ adminName });
  if (!admin) {
    throw new ApiError(409, "User not exists ! Please register !");
  }

  //checking if given password is valid
  const isPasswordValid = await admin.isValidPassword(password);
  if (!isPasswordValid) {
    throw new ApiError(409, "Invalid login credentials");
  }

  //generate tokens
  const { accessToken, refreshToken } = await generateTokens(admin._id);

  //fetching logged in admin
  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
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
      new ResponseHandler(201, "Admin logged in successfully", loggedInAdmin)
    );
});

//logout admin
const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(
    req.admin._id,
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
    .json(new ResponseHandler(200, "Admin logged Out", {}));
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

//change admin password
const changeAdminPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  //checking if admin entered existing password correct
  const admin = await Admin.findOne(req.admin?._id);
  const isPasswordValid = await admin.isValidPassword(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid old password");
  }

  admin.password = newPassword;
  admin.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ResponseHandler(200, "Password changed successfully"));
});

module.exports = {
  addAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  changeAdminPassword,
};
