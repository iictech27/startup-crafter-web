import React, { useState } from "react";
import Skills from "../components/form/Skills";
import About from "../components/form/About";
import Education from "../components/form/Education";
import Experience from "../components/form/Experience";
import BasicDetails from "../components/form/BasicDetails";

const EditUserProfile = () => {
  const [activeSection, setActiveSection] = useState("basicDetails");
  const [profileCompletion, setProfileCompletion] = useState(20);

  // States for various sections
  const [basicDetails, setBasicDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });

  const [about, setAbout] = useState({
    purpose: "",
    interests: "",
    aboutMe: "",
  });

  const [education, setEducation] = useState([]);

  // Input Handlers
  const handleInputChange = (e, section, setSection) => {
    const { name, value } = e.target;
    setSection({ ...section, [name]: value });
  };

  const handleSave = (sectionName) => {
    // Mock save logic, you can replace it with API calls
    alert(`${sectionName} saved successfully!`);
    setProfileCompletion(profileCompletion + 20);
  };

  // Section Renders
  const renderBasicDetails = () => (
    <div>
      <BasicDetails />
    </div>
  );

  const renderAboutSection = () => (
    <div>
      <About />
    </div>
  );

  const renderSkillsSection = () => (
    <div>
      <Skills />
    </div>
  );

  const renderEducationSection = () => (
    <div>
      <Education />
    </div>
  );

  const renderExperienceSection = () => (
    <div>
      <Experience />
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "basicDetails":
        return renderBasicDetails();
      case "about":
        return renderAboutSection();
      case "skills":
        return renderSkillsSection();
      case "education":
        return renderEducationSection();
      case "experience":
        return renderExperienceSection();
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen gap-4">
      {/* Sidebar */}
      <div className="lg:w-1/4 p-4 bg-white lg:fixed shadow-sm  overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Complete your profile</h2>
        <div className="relative w-full h-4 bg-gray-200 rounded-full mb-4">
          <div
            className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
            style={{ width: `${profileCompletion}%` }}
          ></div>
        </div>
        <div className="space-y-4">
          {["basicDetails", "about", "skills", "education", "experience", "responsibilities"].map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-full text-left p-3 rounded-md ${
                activeSection === section
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-2 overflow-y-auto lg:ml-[24rem] mt-4 lg:mt-0">
        <div className="bg-white p-2 rounded-md d">{renderSection()}</div>
      </div>
    </div>
  );
};

export default EditUserProfile;
