const { Event } = require("../../models/event.model");
const { ApiError, NotFoundError } = require("../../utils/customErrorHandler");
const ResponseHandler = require("../../utils/responseHandler");
const uploadFileOnCloudinary = require("../../utils/cloudinary");

// Add Event with Stages, Previous Winner, and First Runner-Up
const addEvent = async (req, res) => {
  const {
    title,
    about,
    startingDate,
    endingDate,
    location,
    stages,
    previousWinner,
    firstRunnerUp,
  } = req.body;
  let picture = req.file?.path;
  let winnerPicture = req.files?.winnerPicture;

  // Validate required fields
  if (
    !title ||
    !about ||
    !startingDate ||
    !endingDate ||
    !location ||
    !stages
  ) {
    throw new ApiError(
      400,
      "All required fields (title, about, startingDate, endingDate, location, stages) are needed."
    );
  }

  // Validate stages
  if (!Array.isArray(stages) || stages.length === 0) {
    throw new ApiError(400, "At least one stage is required for the event.");
  }

  for (let stage of stages) {
    if (!stage.title || !stage.startingDate || !stage.endingDate) {
      throw new ApiError(
        400,
        "Each stage must have a title, starting date, and ending date."
      );
    }
  }

  // Validate previous winner and first runner-up details
  if (previousWinner && (!previousWinner.teamName || !previousWinner.about)) {
    throw new ApiError(
      400,
      "Previous winner must have a team name, description."
    );
  }

  if (firstRunnerUp && (!firstRunnerUp.teamName || !firstRunnerUp.about)) {
    throw new ApiError(
      400,
      "First runner-up must have a team name, description"
    );
  }

  // If picture is not uploaded, use a default one
  if (!picture) {
    picture = "public/uploads/default_event_image.jpg";
  }

  const eventImage = await uploadFileOnCloudinary(picture);

  if (!eventImage) {
    throw new ApiError(500, "Event image upload failed.");
  }

  let winnerImageUrl = null;
  if (winnerPicture) {
    winnerImageUrl = await uploadFileOnCloudinary(winnerPicture[0].path);
    if (!winnerImageUrl) {
      throw new ApiError(500, "Winner image upload failed.");
    }
  }

  if (previousWinner && !winnerImageUrl) {
    throw new ApiError(500, "Previous winner image upload failed.");
  }

  // Create the event with stages and winner/runner-up details
  const newEvent = await Event.create({
    title,
    slug: title.toLowerCase().replace(/\s+/g, "-"),
    about,
    startingDate,
    endingDate,
    location,
    stages,
    picture: eventImage,
    previousWinner: {
      teamName: previousWinner?.teamName || "",
      about: previousWinner?.about || "",
      picture: winnerImageUrl || "",
    },
    firstRunnerUp: {
      teamName: firstRunnerUp?.teamName || "",
      about: firstRunnerUp?.about || "",
    },
  });

  return res
    .status(201)
    .json(new ResponseHandler(201, "Event created successfully!", newEvent));
};

// Edit Event with Stages, Previous Winner, and First Runner-Up
const editEvent = async (req, res) => {
  const { eventID } = req.params;
  const {
    title,
    about,
    startingDate,
    endingDate,
    location,
    stages,
    previousWinner,
    firstRunnerUp,
  } = req.body;
  let picture = req.file?.path;
  let winnerPicture = req.files?.winnerPicture;

  if (!eventID) {
    throw new ApiError(400, "Event ID is required.");
  }

  const event = await Event.findById(eventID);
  if (!event) {
    throw new NotFoundError("Event not found.");
  }

  // If stages are provided in the body, validate them
  if (stages) {
    if (!Array.isArray(stages) || stages.length === 0) {
      throw new ApiError(400, "At least one stage is required for the event.");
    }

    for (let stage of stages) {
      if (!stage.title || !stage.startingDate || !stage.endingDate) {
        throw new ApiError(
          400,
          "Each stage must have a title, starting date, and ending date."
        );
      }
    }
  }

  // Validate previous winner and first runner-up details
  if (
    previousWinner &&
    (!previousWinner.teamName ||
      !previousWinner.about ||
      !previousWinner.picture)
  ) {
    throw new ApiError(
      400,
      "Previous winner must have a team name, description, and picture."
    );
  }

  if (firstRunnerUp && (!firstRunnerUp.teamName || !firstRunnerUp.about)) {
    throw new ApiError(
      400,
      "First runner-up must have a team name, description"
    );
  }

  // If picture is uploaded, update it
  if (picture) {
    const eventImage = await uploadFileOnCloudinary(picture);
    if (!eventImage) {
      throw new ApiError(500, "Event image upload failed.");
    }
    picture = eventImage;
  }

  // If winner image is uploaded, update it
  let winnerImageUrl = null;
  if (winnerPicture) {
    winnerImageUrl = await uploadFileOnCloudinary(winnerPicture[0].path); // Assuming multiple files can be uploaded
    if (!winnerImageUrl) {
      throw new ApiError(500, "Winner image upload failed.");
    }
  }

  // If previousWinner or firstRunnerUp images are uploaded, update them
  let previousWinnerImage = previousWinner?.picture
    ? await uploadFileOnCloudinary(previousWinner.picture)
    : null;

  if (previousWinner && !previousWinnerImage) {
    throw new ApiError(500, "Previous winner image upload failed.");
  }

  // Update the event fields
  const updatedEvent = await Event.findByIdAndUpdate(
    eventID,
    {
      title: title || event.title,
      slug: title ? title.toLowerCase().replace(/\s+/g, "-") : event.slug, // Update slug if title is changed
      about: about || event.about,
      startingDate: startingDate || event.startingDate,
      endingDate: endingDate || event.endingDate,
      location: location || event.location,
      stages: stages || event.stages,
      picture: picture || event.picture,
      previousWinner: {
        teamName: previousWinner?.teamName || event.previousWinner.teamName,
        about: previousWinner?.about || event.previousWinner.about,
        picture: previousWinnerImage || event.previousWinner.picture,
      },
      firstRunnerUp: {
        teamName: firstRunnerUp?.teamName || event.firstRunnerUp.teamName,
        about: firstRunnerUp?.about || event.firstRunnerUp.about,
      },
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ResponseHandler(200, "Event updated successfully!", updatedEvent)
    );
};

// Delete Event
const deleteEvent = async (req, res) => {
  const { eventID } = req.body;

  if (!eventID) {
    throw new ApiError(400, "Event ID is required.");
  }

  const event = await Event.findById(eventID);
  if (!event) {
    throw new NotFoundError("Event not found.");
  }

  // Delete event
  await Event.findByIdAndDelete(eventID);

  return res
    .status(200)
    .json(new ResponseHandler(200, "Event deleted successfully."));
};

module.exports = {
  addEvent,
  editEvent,
  deleteEvent,
};
