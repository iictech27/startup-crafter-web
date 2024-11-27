import React from "react";
import Input, { TextArea } from "../form/Input";

export default function Stage({ stageNo, value, onStageChange }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onStageChange(name, value);
  };

  return (
    <div className="stage grid grid-cols-2 gap-4 bg-white mt-4 p-4">
      <span className="capitalize text-md text-gray-600">
        Stage {stageNo} info
      </span>
      <Input
        label="Title"
        name="title"
        value={value?.title || ""}
        onChange={handleInputChange}
        className="col-span-2"
      />
      <TextArea
        label="Description"
        name="description"
        value={value?.description || ""}
        // onChange={(e) => onStageChange(e.target.name, e.target.value)}
        className="col-span-2"
      />
      <Input
        label="Starting date"
        type="date"
        name="startingDate"
        value={value?.startingDate || ""}
        onChange={handleInputChange}
      />
      <Input
        label="Ending date"
        type="date"
        name="endingDate"
        value={value?.endingDate || ""}
        onChange={handleInputChange}
      />
    </div>
  );
}
