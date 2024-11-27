const { Event } = require("../../models/event.model");
const { ApiError, NotFoundError } = require("../../utils/customErrorHandler");
const ResponseHandler = require("../../utils/responseHandler");
const uploadFileOnCloudinary = require("../../utils/cloudinary");

// Add Past Event with Previous Winner, and First Runner-Up
const addPastEvent = async (req, res) => {
  const {
    title,
    about,
    startingDate,
    endingDate,
    location,
    previousWinner,
    firstRunnerUp,
  } = req.body;
  let poster = req.file?.path;
  let winnerPicture = req.files?.winnerPicture;
  let runnerupPicture = req.files?.runnerupPicture;

  // Validate required fields
  if (!title || !about || !startingDate || !endingDate || !location) {
    throw new ApiError(
      400,
      "All required fields (title, about, startingDate, endingDate, location) are needed."
    );
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

  // If poster is not uploaded, use a default one
  if (!poster) {
    poster = "public/uploads/default_event_image.jpg";
  }

  const eventImage = await uploadFileOnCloudinary(poster);

  if (!eventImage) {
    throw new ApiError(500, "Event image upload failed.");
  }

  // winner team image
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

  // runner up team image
  let runnerupImageUrl = null;
  if (runnerupPicture) {
    winnerImageUrl = await uploadFileOnCloudinary(runnerupPicture[0].path);
    if (!runnerupImageUrl) {
      throw new ApiError(500, "Runner up image upload failed.");
    }
  }

  if (firstRunnerUp && !runnerupImageUrl) {
    throw new ApiError(500, "Previous runner up image upload failed.");
  }

  // Create the event with winner/runner-up details
  const newEvent = await Event.create({
    title,
    slug: title.toLowerCase().replace(/\s+/g, "-"),
    about,
    startingDate,
    endingDate,
    location,
    picture: eventImage,
    previousWinner: {
      teamName: previousWinner?.teamName || "",
      about: previousWinner?.about || "",
      picture: winnerImageUrl || "",
    },
    firstRunnerUp: {
      teamName: firstRunnerUp?.teamName || "",
      about: firstRunnerUp?.about || "",
      picture: runnerupImageUrl || "",
    },
  });

  return res
    .status(201)
    .json(
      new ResponseHandler(201, "Past Event created successfully!", newEvent)
    );
};

// Add Upcoming Event with stages
const addUpcomingEvent = async (req, res) => {
  const {
    title,
    about,
    startingDate,
    endingDate,
    location,
    stages,
    registrationLink,
  } = req.body;
  let poster = req.file?.path;
  const parsedStages = JSON.parse(stages);

  // Validate required fields
  if (
    !title ||
    !about ||
    !startingDate ||
    !endingDate ||
    !location ||
    !registrationLink ||
    !parsedStages
  ) {
    throw new ApiError(
      400,
      "All required fields (title, about, startingDate, endingDate, location, registration link, stages) are needed."
    );
  }

  console.log("Stages : ", parsedStages);

  // Validate stages
  if (!Array.isArray(parsedStages) || parsedStages.length === 0) {
    throw new ApiError(400, "At least one stage is required for the event.");
  }

  for (let stage of parsedStages) {
    if (
      !stage.title ||
      !stage.description ||
      !stage.startingDate ||
      !stage.endingDate
    ) {
      throw new ApiError(
        400,
        "Each stage must have a title, starting date, and ending date."
      );
    }
  }

  // If poster is not uploaded, use a default one
  if (!poster) {
    poster = "public/uploads/default_event_image.jpg";
  }

  const eventImage = await uploadFileOnCloudinary(poster);

  if (!eventImage) {
    throw new ApiError(500, "Event image upload failed.");
  }

  // Create the upcoming event with stages details
  const newEvent = await Event.create({
    title,
    slug: title.toLowerCase().replace(/\s+/g, "-"),
    about,
    startingDate,
    endingDate,
    location,
    registrationLink,
    stages,
    picture: eventImage,
  });

  return res
    .status(201)
    .json(
      new ResponseHandler(201, "Upcoming Event created successfully!", newEvent)
    );
};

// Edit Past Event
const editPastEvent = async (req, res) => {
  const { eventID } = req.params;
  const {
    title,
    about,
    startingDate,
    endingDate,
    location,
    previousWinner,
    firstRunnerUp,
  } = req.body;
  let poster = req.file?.path;
  let winnerPicture = req.files?.winnerPicture;
  let runnerupPicture = req.files?.runnerupPicture;

  if (!eventID) {
    throw new ApiError(400, "Event ID is required.");
  }

  const event = await Event.findById(eventID);
  if (!event) {
    throw new NotFoundError("Event not found.");
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

  if (
    firstRunnerUp &&
    (!firstRunnerUp.teamName || !firstRunnerUp.about || !firstRunnerUp.picture)
  ) {
    throw new ApiError(
      400,
      "First runner-up must have a team name, description and picture"
    );
  }

  // If poster is uploaded, update it
  if (poster) {
    const eventImage = await uploadFileOnCloudinary(poster);
    if (!eventImage) {
      throw new ApiError(500, "Event image upload failed.");
    }
    poster = eventImage;
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
      picture: poster || event.picture,
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

// Edit Upcoming Event
const editUpcomingEvent = async (req, res) => {
  const { eventID } = req.params;
  const { title, about, startingDate, endingDate, location, stages } = req.body;
  let poster = req.file?.path;

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

  // If poster is uploaded, update it
  if (poster) {
    const eventImage = await uploadFileOnCloudinary(poster);
    if (!eventImage) {
      throw new ApiError(500, "Event image upload failed.");
    }
    poster = eventImage;
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
      picture: poster || event.picture,
    },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ResponseHandler(
        200,
        "Upcoming Event updated successfully!",
        updatedEvent
      )
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
  addUpcomingEvent,
  addPastEvent,
  editPastEvent,
  editUpcomingEvent,
  deleteEvent,
};
