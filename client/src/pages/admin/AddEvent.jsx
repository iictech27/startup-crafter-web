import React, { useState } from "react";
import curveLineVector from "/assets/vectors/curveLineVector.png";
import addEvents from "/assets/images/addEvents.png";
import Input, { FileUpload, TextArea } from "../../components/form/Input";
import Button from "../../components/Button";
import { Stage } from "../../components";
import { useDispatch } from "react-redux";
import {
  addUpcomingEvent,
  addPastEvent,
} from "../../features/events/eventSlice";

export default function AddEvents() {
  const dispatch = useDispatch();

  const [stages, setStages] = useState([]);
  const [event, setEvent] = useState({
    title: "",
    about: "",
    startingDate: "",
    endingDate: "",
    location: "",
    registrationLink: "",
    poster: null,
    winnerTeamName: "",
    aboutWinnerTeam: "",
    winnerPicture: null,
    firstRunnerUp: "",
    aboutFirstRunnerUp: "",
    runnerupPicture: null,
  });

  const addStage = () => {
    setStages([
      ...stages,
      { title: "", description: "sdgsvsdg", startingDate: "", endingDate: "" },
    ]);
  };

  const handleStageChange = (index, field, value) => {
    const newStages = [...stages];
    newStages[index][field] = value;
    setStages(newStages);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setEvent({
        ...event,
        [name]: files[0],
      });
    } else {
      setEvent({
        ...event,
        [name]: value,
      });
    }
  };

  const handleUpcomingEventSubmit = (e) => {
    e.preventDefault();

    // Prepare FormData to send the data, including the file uploads
    const formData = new FormData();
    formData.append("title", event.title);
    formData.append("about", event.about);
    formData.append("startingDate", event.startingDate);
    formData.append("endingDate", event.endingDate);
    formData.append("location", event.location);
    formData.append("registrationLink", event.registrationLink);

    // Append the stages
    formData.append("stages", JSON.stringify(stages));
    console.log(stages);

    // Append the files if any
    if (event.poster) {
      formData.append("image", event.poster);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    // Dispatch the form data to the backend
    dispatch(addUpcomingEvent(formData));

    // Reset the form state after submission
    setEvent({
      title: "",
      about: "",
      startingDate: "",
      endingDate: "",
      location: "",
      registrationLink: "",
      poster: null,
    });
    setStages([]);
  };

  const handlePastEventSubmit = (e) => {
    e.preventDefault();

    // Prepare FormData to send the data, including the file uploads
    const formData = new FormData();
    formData.append("title", event.title);
    formData.append("about", event.about);
    formData.append("startingDate", event.startingDate);
    formData.append("endingDate", event.endingDate);
    formData.append("location", event.location);
    formData.append("winnerTeamName", event.winnerTeamName);
    formData.append("aboutWinnerTeam", event.aboutWinnerTeam);
    formData.append("firstRunnerUp", event.firstRunnerUp);
    formData.append("aboutFirstRunnerUp", event.aboutFirstRunnerUp);

    // Append the files if any
    if (event.poster) {
      formData.append("image", event.poster);
    }
    if (event.winnerPicture) {
      formData.append("winnerPicture", event.winnerPicture);
    }
    if (event.runnerupPicture) {
      formData.append("runnerupPicture", event.runnerupPicture);
    }

    // Dispatch the form data to the backend
    dispatch(addPastEvent(formData));

    // Reset the form state after submission
    setEvent({
      title: "",
      about: "",
      startingDate: "",
      endingDate: "",
      location: "",
      poster: null,
      winnerTeamName: "",
      aboutWinnerTeam: "",
      winnerPicture: null,
      firstRunnerUp: "",
      aboutFirstRunnerUp: "",
    });
  };

  return (
    <div className="container w-full flex flex-col">
      {/* add upcoming events */}
      <div className="heading flex flex-col justify-center items-center">
        <div className="relative">
          <h1 className="text-4xl font-imprima font-bold tracking-wider">
            Add Upcoming <span className="text-blue-600">Events</span>
          </h1>
          <img
            src={curveLineVector}
            alt="curve_line"
            className="absolute top-[100%] left-[15%] translate-x-[15%] translate-y-[50%]"
          />
        </div>
        <img src={addEvents} alt="add_events" />
      </div>
      <div className="formContainer bg-blue-100 rounded-[20px] p-3 md:p-6">
        <div className="event-details w-full grid grid-cols-2 gap-4 bg-white p-4">
          <FileUpload
            label="Upload Poster"
            name="poster"
            onChange={(e) => setEvent({ ...event, poster: e.target.files[0] })}
            className="col-span-2"
          />
          <Input
            label="Event name"
            type="text"
            name="title"
            value={event.title}
            onChange={handleInputChange}
            className="col-span-2"
          />
          <TextArea
            label="About event"
            name="about"
            value={event.about}
            onChange={(e) => setEvent({ ...event, about: e.target.value })}
            className="col-span-2"
          />
          <Input
            label="Starting date"
            type="date"
            name="startingDate"
            value={event.startingDate}
            onChange={handleInputChange}
          />
          <Input
            label="Ending date"
            type="date"
            name="endingDate"
            value={event.endingDate}
            onChange={handleInputChange}
          />
          <Input
            label="Location"
            name="location"
            value={event.location}
            onChange={handleInputChange}
            className="col-span-2"
          />
          <Input
            label="Registration Link"
            name="registrationLink"
            value={event.registrationLink}
            onChange={handleInputChange}
            className="col-span-2"
          />
          <div className="event-stages col-span-2">
            {stages.map((stage, index) => (
              <Stage
                key={index}
                stageNo={index + 1}
                value={stage}
                onStageChange={(field, value) =>
                  handleStageChange(index, field, value)
                }
              />
            ))}
            <Button
              title="Add stage"
              btnColor="gradientBtnColor"
              className="mt-4"
              onHandleClick={addStage}
            />
          </div>
        </div>
      </div>
      <Button
        title="Add Event"
        btnColor="gradientBtnColor"
        className="mt-4"
        onHandleClick={handleUpcomingEventSubmit}
      />

      {/* add past events */}
      <div className="mt-12 heading flex flex-col justify-center items-center">
        <div className="relative mb-12">
          <h1 className="text-4xl font-imprima font-bold tracking-wider">
            Add Past <span className="text-blue-600">Events</span>
          </h1>
          <img
            src={curveLineVector}
            alt="curve_line"
            className="absolute top-[100%] left-[15%] translate-x-[15%] translate-y-[50%]"
          />
        </div>
      </div>
      <div className="formContainer bg-blue-100 rounded-[20px] p-3 md:p-6">
        <div className="event-details w-full grid grid-cols-2 gap-4 bg-white p-4">
          <FileUpload
            label="Upload Poster"
            name="poster"
            onChange={(e) => setEvent({ ...event, poster: e.target.files[0] })}
            className="col-span-2"
          />
          <Input
            label="Event name"
            type="text"
            name="title"
            value={event.title}
            onChange={handleInputChange}
            className="col-span-2"
          />
          <TextArea
            label="About event"
            name="about"
            value={event.about}
            onChange={(e) => setEvent({ ...event, about: e.target.value })}
            className="col-span-2"
          />
          <Input
            label="Starting date"
            type="date"
            name="startingDate"
            value={event.startingDate}
            onChange={handleInputChange}
          />
          <Input
            label="Ending date"
            type="date"
            name="endingDate"
            value={event.endingDate}
            onChange={handleInputChange}
          />
          <Input
            label="Location"
            name="location"
            value={event.location}
            onChange={handleInputChange}
            className="col-span-2"
          />
        </div>
        <div className="event-previous bg-white p-4 mt-4">
          <h1 className="capitalize text-3xl font-semibold my-4">
            Previous winner <span className="text-blue-600">for event</span>
          </h1>
          <hr className="w-48 h-2 mb-5 bg-blue-700 border-0" />
          <FileUpload
            label="Upload Winners Picture"
            name="winnerPicture"
            onChange={(e) =>
              setEvent({ ...event, winnerPicture: e.target.files[0] })
            }
          />
          <Input
            label="Winner team name"
            name="winnerTeamName"
            value={event.winnerTeamName}
            onChange={handleInputChange}
            className="mt-5"
          />
          <TextArea
            label="About team"
            name="aboutWinnerTeam"
            value={event.aboutWinnerTeam}
            onChange={(e) =>
              setEvent({ ...event, aboutWinnerTeam: e.target.value })
            }
            className="mb-5"
          />
          <FileUpload
            label="Upload 1st Runner ups Picture"
            name="winnerPicture"
            onChange={(e) =>
              setEvent({ ...event, runnerupPicture: e.target.files[0] })
            }
          />
          <Input
            label="1st runner up team"
            name="firstRunnerUp"
            value={event.firstRunnerUp}
            onChange={handleInputChange}
            className="mt-5"
          />
          <TextArea
            label="About team"
            name="aboutFirstRunnerUp"
            value={event.aboutFirstRunnerUp}
            onChange={(e) =>
              setEvent({ ...event, aboutFirstRunnerUp: e.target.value })
            }
          />
        </div>
      </div>
      <Button
        title="Add Event"
        btnColor="gradientBtnColor"
        className="mt-4"
        onHandleClick={handlePastEventSubmit}
      />
    </div>
  );
}
