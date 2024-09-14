const User = require("../models/user.model");
const ResponseHandler = require("../utils/responseHandler");

const getAllUser = async (req, res) => {
  const data = await User.find();

  return res.status(200).json(new ResponseHandler(200, {}, data));
};

module.exports = {
  getAllUser,
};
