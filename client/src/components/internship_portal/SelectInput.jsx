import React from "react";
import Select from "react-select";

export default function SelectInput({
  title,
  options,
  placeholder,
  handleOptionChange,
  handleOptionValue,
}) {
  return (
    <div className="category_container mb-4">
      <label className="text-md font-semibold">{title}</label>
      <Select
        isMulti
        name="option_names"
        options={options}
        value={handleOptionValue}
        onChange={handleOptionChange}
        className="basic-multi-select w-full mt-1"
        classNamePrefix="select"
        placeholder={placeholder}
      />
    </div>
  );
}
