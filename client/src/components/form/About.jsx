import React, { useState } from 'react';

function About() {
  const [purpose, setPurpose] = useState('');
  const [interests, setInterests] = useState('');
  const [aboutMe, setAboutMe] = useState('');

  const handlePurposeChange = (event) => {
    setPurpose(event.target.value);
  };

  const handleInterestsChange = (event) => {
    setInterests(event.target.value);
  };

  const handleAboutMeChange = (event) => {
    setAboutMe(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log('Purpose:', purpose);
    console.log('Interests:', interests);
    console.log('About Me:', aboutMe);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="purpose" className="block text-gray-700 font-bold mb-2">
            Purpose
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${purpose === 'open-to-work' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setPurpose('open-to-work')}
            >
              <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Open to Work
            </button>
            < button
              type="button"
              className={`px-4 py-2 rounded-md ${purpose === 'hiring' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setPurpose('hiring')}
            >
              <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Hiring
            </button>
            < button
              type="button"
              className={`px-4 py-2 rounded-md ${purpose === 'compete-upskill' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => setPurpose('compete-upskill')}
            >
              <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Compete & Upskills
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="interests" className="block text-gray-700 font-bold mb-2">
            Interests
          </label>
          <input
            type="text"
            id="interests"
            value={interests}
            onChange={handleInterestsChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            placeholder="Enter your interests"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="aboutMe" className="block text-gray-700 font-bold mb-2">
            About Me
          </label>
          <textarea
            id="aboutMe"
            value={aboutMe}
            onChange={handleAboutMeChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            placeholder="Tell us about yourself"
            rows="4"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}

export default About;