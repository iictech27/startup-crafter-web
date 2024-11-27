import React, { useState } from "react";

function Education() {
  const qualifications = [
    "Metric (10th)",
    "Intermediate (12th)",
    "B.Tech",
    "BBA",
    "BCA",
    "MBA",
  ];

  const streams = [
    "Computer Science and Engineering (CSE)",
    "Artificial Intelligence & Machine Learning (AIML)",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
  ];

  const [educationData, setEducationData] = useState([]);
  const [qualification, setQualification] = useState("");
  const [customQualification, setCustomQualification] = useState("");
  const [stream, setStream] = useState("");
  const [customStream, setCustomStream] = useState("");
  const [state, setState] = useState("");
  const [institution, setInstitution] = useState("");
  const [percentageCgpa, setPercentageCgpa] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const handleAddEducation = () => {
    const newEducation = {
      qualification:
        qualification === "Other" ? customQualification : qualification,
      stream: stream === "Other" ? customStream : stream,
      state,
      institution,
      percentageCgpa,
      startYear,
      endYear,
    };

    setEducationData([...educationData, newEducation]);
    setQualification("");
    setCustomQualification("");
    setStream("");
    setCustomStream("");
    setState("");
    setInstitution("");
    setPercentageCgpa("");
    setStartYear("");
    setEndYear("");
  };

  const handleDeleteEducation = (index) => {
    const updatedEducationData = [...educationData];
    updatedEducationData.splice(index, 1);
    setEducationData(updatedEducationData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Education</h1>

      {/* Display existing education data */}
      <div>
        {educationData.map((education, index) => (
          <div
            key={index}
            className="border p-4 mb-4 rounded-md bg-gray-50 shadow-md"
          >
            <p>
              <strong>Institution:</strong> {education.institution}
            </p>
            <p>
              <strong>Qualification:</strong> {education.qualification}
            </p>
            <p>
              <strong>Stream:</strong> {education.stream}
            </p>
            <p>
              <strong>State:</strong> {education.state}
            </p>
            <p>
              <strong>Percentage/CGPA:</strong> {education.percentageCgpa}
            </p>
            <p>
              <strong>Start Year:</strong> {education.startYear}
            </p>
            <p>
              <strong>End Year:</strong> {education.endYear}
            </p>
            <button
              onClick={() => handleDeleteEducation(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Form to add new education */}
      <div className="bg-white shadow-md rounded p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="institution"
          >
            Institution/School Name *
          </label>
          <input
            type="text"
            id="institution"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Enter institution/school name"
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="qualification"
          >
            Qualification *
          </label>
          <select
            id="qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Qualification</option>
            {qualifications.map((qual, index) => (
              <option key={index} value={qual}>
                {qual}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          {qualification === "Other" && (
            <input
              type="text"
              value={customQualification}
              onChange={(e) => setCustomQualification(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline mt-2"
              placeholder="Enter custom qualification"
            />
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="stream"
          >
            Stream *
          </label>
          <select
            id="stream"
            value={stream}
            onChange={(e) => setStream(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Stream</option>
            {streams.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          {stream === "Other" && (
            <input
              type="text"
              value={customStream}
              onChange={(e) => setCustomStream(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline mt-2"
              placeholder="Enter custom stream"
            />
          )}
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="state"
          >
            State *
          </label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Enter state"
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="percentageCgpa"
          >
            Percentage/CGPA *
          </label>
          <input
            type="text"
            id="percentageCgpa"
            value={percentageCgpa}
            onChange={(e) => setPercentageCgpa(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Enter percentage or CGPA"
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startYear"
          >
            Start Year *
          </label>
          <input
            type="text"
            id="startYear"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Enter start year"
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endYear"
          >
            End Year *
          </label>
          <input
            type="text"
            id="endYear"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Enter end year"
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <button
            onClick={handleAddEducation}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Education
          </button>
        </div>
      </div>
    </div>
  );
}

export default Education;
