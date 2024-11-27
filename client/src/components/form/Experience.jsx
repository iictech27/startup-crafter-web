import React, { useState } from "react";

function Experience() {
  const jobTypes = ["Full-Time", "Part-Time", "Internship", "Freelance"];
  
  const [jobData, setJobData] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [responsibilities, setResponsibilities] = useState("");

  const handleAddJob = () => {
    const newJob = {
      jobTitle,
      jobType,
      company,
      startDate,
      endDate: currentlyWorking ? "Present" : endDate,
      responsibilities,
    };

    setJobData([...jobData, newJob]);
    // Reset the fields after adding a job
    setJobTitle("");
    setJobType("");
    setCompany("");
    setStartDate("");
    setEndDate("");
    setCurrentlyWorking(false);
    setResponsibilities("");
  };

  const handleDeleteJob = (index) => {
    const updatedJobData = [...jobData];
    updatedJobData.splice(index, 1);
    setJobData(updatedJobData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Job Experience</h1>

      {/* Display existing job data */}
      <div>
        {jobData.map((job, index) => (
          <div
            key={index}
            className="border p-4 mb-4 rounded-md bg-gray-50 shadow-md"
          >
            <p>
              <strong>Job Title:</strong> {job.jobTitle}
            </p>
            <p>
              <strong>Job Type:</strong> {job.jobType}
            </p>
            <p>
              <strong>Company:</strong> {job.company}
            </p>
            <p>
              <strong>Start Date:</strong> {job.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {job.endDate}
            </p>
            <p>
              <strong>Responsibilities:</strong> {job.responsibilities}
            </p>
            <button
              onClick={() => handleDeleteJob(index)}
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Form to add new job */}
      <div className="bg-white shadow-md rounded p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jobTitle"
          >
            Job Title *
          </label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Enter job title"
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jobType"
          >
            Job Type *
          </label>
          <select
            id="jobType"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Job Type</option>
            {jobTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="company"
          >
            Company *
          </label>
          <input
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="startDate"
          >
            Start Date *
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="endDate"
          >
            End Date (Leave empty if currently working)
          </label>
          {!currentlyWorking && (
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          )}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="currentlyWorking"
              checked={currentlyWorking}
              onChange={(e) => setCurrentlyWorking(e.target.checked)}
              className="mr-2"
            />
            <label
              className="text-sm text-gray-700"
              htmlFor="currentlyWorking"
            >
              Currently Working Here
            </label>
          </div>
        </div>

        <div className="col-span-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="responsibilities"
          >
            Responsibilities *
          </label>
          <textarea
            id="responsibilities"
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            placeholder="Enter job responsibilities"
            rows="4"
          />
        </div>

        <div className="col-span-2 flex justify-end">
          <button
            onClick={handleAddJob}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Job Experience
          </button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
