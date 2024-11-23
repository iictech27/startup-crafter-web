import React from "react";
import UploadImg from "../assets/images/uploadImg.png";
import { FaShareAlt, FaEye, FaEdit } from "react-icons/fa";

export default function UserProfile() {
  const stats = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/be6cac951db6ecbaa118d3f11ad584307be0d9f4b5de41bccec3fff6a1fcece6?apiKey=3f2548da60944d218695798a974ce7d6&",
      title: "Internship Applied",
      count: "3",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2d696a3aeb872805b4eb4e62da0a9381b05352a72562bd30cb58d474df237d16?apiKey=3f2548da60944d218695798a974ce7d6&",
      title: "Idea Submission",
      count: "7",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/0387fd974dd85891384ef36a18d0556ab6ec420a5b8e59b381f874b83bcc8f3d?apiKey=3f2548da60944d218695798a974ce7d6&",
      title: "Feedback",
      count: "5",
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2b35953ba4f37428ffc623d88cab1c9d9c47630464f7a0f03e3dbccd7936ffe4?apiKey=3f2548da60944d218695798a974ce7d6&",
      title: "Blogs",
      count: "4",
    },
  ];

  const skills = ["HTML", "CSS", "C++", "JavaScript"];

  return (
    <main className="w-[90%] flex flex-col min-h-screen mx-auto mb-4">
      {/* Header Section */}
      <section className="p-6 flex items-center justify-between bg-white">
        <div className="flex items-center relative">
          {/* Animated Gradient Circular Border */}
          <div className="relative flex justify-center items-center w-32 h-32 rounded-full bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600 shadow-lg animate-pulse">
            {/* Inner White Circle */}
            <div className="w-28 h-28 rounded-full bg-white flex justify-center items-center shadow-md">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
            </div>
          </div>
          <div className="ml-4">
            <h1 className="text-2xl font-semibold">Name.....</h1>
            <p className="text-gray-500">Techno Main Salt Lake</p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            {/* Share Icon */}
            <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
              <FaShareAlt className="text-gray-600 text-xl cursor-pointer" />
            </div>
            {/* View Icon */}
            <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-200">
              <FaEye className="text-gray-600 text-xl cursor-pointer" />
            </div>
            {/* Edit Profile Button */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-[20px] shadow flex items-center gap-2 hover:bg-blue-600 transition duration-200">
              <FaEdit className="text-white" />
              Edit Profile
            </button>
          </div>
          {/* Upload Image Button */}
          <div className="mt-4">
            <label htmlFor="upload" className="cursor-pointer">
              <img
                src={UploadImg} // Replace with your image path
                alt="Upload"
                className="w-52 hover:opacity-80 transition duration-200"
              />
            </label>
            <input
              type="file"
              id="upload"
              className="hidden"
              accept=".pdf"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  alert(`Uploaded file: ${e.target.files[0].name}`);
                }
              }}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex flex-col md:flex-row mt-6 gap-6 px-6">
        {/* Sidebar */}
        <aside className="bg-white p-6 md:w-1/4 rounded-lg">
          <nav>
            <ul className="space-y-4">
              {["About", "Skills", "Education", "Achievements", "Certifications"].map((item, index) => (
                <li key={index} className="text-2xl font-semibold text-gray-800">
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Stats Section */}
        <section className="self-start bg-[#f6f8fa] shadow-lg rounded-xl p-2 md:w-2/4">
  <div className="space-y-4 w-full">
    {stats.map((stat, index) => (
      <div key={index} className="flex items-center gap-4 p-2">
        <img
          src={stat.icon}
          alt={stat.title}
          className="w-24 h-24 object-contain"
        />
        <div>
          <h3 className="text-lg font-semibold text-blue-500">{stat.title}</h3>
          <p className="text-gray-700 text-2xl font-bold">{stat.count}</p>
        </div>
      </div>
    ))}
  </div>
</section>


        {/* Main Section */}
        <section className="flex bg-[#d9d9d9] shadow rounded-2xl p-6 md:w-3/4 flex-col gap-6">
          {/* About Section */}
          <div className="bg-[#F6F8FA] p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-700">About</h2>
            <p className="mt-4 text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s.
            </p>
          </div>

          {/* Skills Section */}
          <div className="bg-[#F6F8FA] p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-700">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Sections */}
          <div className="bg-[#F6F8FA] p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-700">Education</h2>
            <p className="mt-4 text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="bg-[#F6F8FA] p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-700">Achievements</h2>
            <p className="mt-4 text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
          <div className="bg-[#F6F8FA] p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold text-gray-700">Certifications</h2>
            <p className="mt-4 text-gray-600">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </section>
      </section>
    </main>
  );
}



