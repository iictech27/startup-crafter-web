import { Internship } from "../../models/internship.model";
import asyncHandler from "../../utils/asyncHandler";
import { ApiError } from "../../utils/customErrorHandler";
import ResponseHandler from "../../utils/responseHandler";

const addInternship = asyncHandler(async (req, res) => {
  const {
    description,
    company,
    stipend,
    domain,
    startDate,
    endDate,
    totalSeats,
    vacantSeats,
  } = req.body;

  if (!description || !company || !totalSeats || !vacantSeats) {
    throw new ApiError(400, "Please add all the necessary fields");
  }

  if (req.user != "ADMIN") {
    throw new ApiError(
      400,
      "Sorry, you are not authorised todo the required operation"
    );
  }

  const createInternship = await Internship.create({
    description,
    company,
    stipend,
    domain,
    startDate,
    endDate,
    totalSeats,
    vacantSeats,
    stipend: stipend || 0,
  });

  return res
    .status(200)
    .json(
      new ResponseHandler(
        201,
        "Internship created successfully",
        createInternship
      )
    );
});

module.exports = { addInternship };
