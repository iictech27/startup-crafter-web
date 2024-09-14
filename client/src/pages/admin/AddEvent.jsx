import React, { useState } from "react";
import curveLineVector from "../../assets/vectors/curveLineVector.png";
import addEvents from "../../assets/images/addEvents.png";
import Input, { FileUpload, TextArea } from "../../components/form/Input";
import Button from "../../components/Button";
import { Stage } from "../../components";

export default function AddEvents() {
  const [stages, setStages] = useState([]);
  const addStage = () => {
    setStages([...stages, <Stage stageNo={stages.length + 3} />]);
  };

  return (
    <div className="container w-full flex flex-col">
      <div className="heading flex flex-col justify-center items-center">
        <div className="relative">
          <h1 className="text-4xl font-imprima font-bold tracking-wider">
            Add latest <span className="text-blue-600">Events</span>
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
          <FileUpload label="Upload Poster" content="poster" />
          <TextArea label="about event" className="col-span-2" />
          <Input label="starting date" type="date" />
          <Input label="ending date" type="date" />
          <Input label="location" className="col-span-2" />
        </div>
        <div className="event-stages">
          <Stage stageNo="1" />
          <Stage stageNo="2" />
          {stages.map((stage, index) => (
            <React.Fragment key={index}>{stage}</React.Fragment>
          ))}
          <Button
            title="Add more stage"
            btnColor="gradientBtnColor"
            className="mt-4"
            onHandleClick={addStage}
          />
        </div>
        <div className="event-previous bg-white p-4 mt-4">
          <h1 className="capitalize text-3xl font-semibold my-4">
            previous winner <span className="text-blue-600">for event</span>
          </h1>
          <hr class="w-48 h-2 mb-4 bg-blue-700 border-0" />
          <Input label="winner team name" />
          <TextArea label="about team" className="mb-5"/>
          <FileUpload label="Upload Picture" />
          <Input label="1st runner up team" className="mt-5"/>
          <TextArea label="about team" />
        </div>
      </div>
      <Button title="add event" btnColor="gradientBtnColor" className="mx-auto mt-4" />
    </div>
  );
}
