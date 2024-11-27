import React, { useState } from "react";

function BasicDetails() {
  const genders = ["Male", "Female", "Other"];
  const countries = ["India", "United States", "United Kingdom", "Canada"];

  const [basicDetails, setBasicDetails] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    countryCode: "",
    email: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    country: "",
  });

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    const mobileRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!mobileRegex.test(basicDetails.mobile)) {
      newErrors.mobile = "Mobile number must be exactly 10 digits.";
    }
    if (!emailRegex.test(basicDetails.email)) {
      newErrors.email = "Invalid email format.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBasicDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = () => {
    if (validateFields()) {
      console.log("Submitted Details:", basicDetails);
      alert("Details Submitted Successfully!");
      setBasicDetails({
        firstName: "",
        lastName: "",
        mobile: "",
        countryCode: "",
        email: "",
        dob: "",
        gender: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Basic Details</h1>
      <div className="bg-white shadow-md rounded p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Fields */}
        {[
          { label: "First Name", name: "firstName", type: "text" },
          { label: "Last Name", name: "lastName", type: "text" },
          { label: "Mobile Number", name: "mobile", type: "text" },
          {
            label: "Country Code (Optional)",
            name: "countryCode",
            type: "text",
          },
          { label: "Email Address", name: "email", type: "email" },
          { label: "Date of Birth", name: "dob", type: "date" },
          { label: "Address", name: "address", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "State", name: "state", type: "text" },
          { label: "Pin Code", name: "pinCode", type: "text" },
        ].map((field, index) => (
          <div key={index}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}{" "}
              {field.name === "firstName" || field.name === "mobile" ? "*" : ""}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={basicDetails[field.name]}
              onChange={handleInputChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline ${
                errors[field.name] ? "border-red-500" : ""
              }`}
              placeholder={`Enter ${field.label.toLowerCase()}`}
            />
            {errors[field.name] && (
              <p className="text-red-500 text-xs italic">
                {errors[field.name]}
              </p>
            )}
          </div>
        ))}

        {/* Gender Selection */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Gender *
          </label>
          <select
            name="gender"
            value={basicDetails.gender}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Gender</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
        </div>

        {/* Country Selection */}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Country *
          </label>
          <select
            name="country"
            value={basicDetails.country}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default BasicDetails;
