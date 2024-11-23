import React from "react";
import UploadImg from "../assets/images/uploadImg.png";
import InternAp from "../assets/images/InternAp.png";
import IdeaSub from "../assets/images/IdeaSub.png";
import Feedback from "../assets/images/Feedback.png";
import Blog from "../assets/images/Blog.png";
import college from "../assets/images/college.png";

import { FaShareAlt, FaEye, FaEdit } from "react-icons/fa";

export default function UserProfile() {
  const stats = [
    {
      icon: InternAp,
      title: "Internship Applied",
      count: "3",
    },
    {
      icon: IdeaSub,
      title: "Idea Submission",
      count: "7",
    },
    {
      icon: Feedback,
      title: "Feedback",
      count: "5",
    },
    {
      icon: Blog,
      title: "Blogs",
      count: "4",
    },
  ];

  const skills = ["HTML", "CSS", "C++", "JavaScript"];

  return (
    <main className="w-[90%] flex flex-col min-h-screen mx-auto mb-8">
      {/* Header Section */}
      <section className="p-4 flex flex-col md:flex-row items-center justify-between bg-white gap-6">
        <div className="flex items-center relative gap-4">
          {/* Animated Gradient Circular Border */}
          <div className="relative flex justify-center items-center w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-blue-300 via-blue-500 to-blue-600 shadow-lg animate-pulse">
            {/* Inner White Circle */}
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-white flex justify-center items-center shadow-md">
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="w-20 h-20 md:w-24 md:h-24 rounded-full"
              />
            </div>
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-semibold">Name.....</h1>
            <p className="text-gray-500 flex items-center text-sm md:text-base"><img src={college} className="w-8 h-10"/><span>Techno Main Salt Lake</span></p>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-4">
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
            <button className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-[20px] shadow flex items-center gap-2 hover:bg-blue-600 transition duration-200">
              <FaEdit className="text-white" />
              Edit Profile
            </button>
          </div>
          {/* Upload Image Button */}
          <div className="mt-2">
            <label htmlFor="upload" className="cursor-pointer">
              <img
                src={UploadImg}
                alt="Upload"
                className="w-36 md:w-52 hover:opacity-80 transition duration-200"
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
      <section className="flex flex-col md:flex-row mt-6 gap-6 px-4">
        {/* Sidebar */}
        <aside className="bg-white p-4 rounded-lg md:w-1/4">
          <nav>
            <ul className="space-y-2 md:space-y-4">
              {["About", "Skills", "Education", "Achievements", "Certifications"].map((item, index) => (
                <li key={index} className="text-lg md:text-2xl font-semibold text-gray-800">
                  {item}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Stats Section */}
        <section className="self-start bg-[#f6f8fa] shadow-lg rounded-xl p-4 md:w-2/4">
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={stat.icon}
                  alt={stat.title}
                  className="w-20 h-20 md:w-24 md:h-24 object-contain"
                />
                <div>
                  <h3 className="text-sm md:text-lg font-semibold text-blue-500">{stat.title}</h3>
                  <p className="text-gray-700 text-lg md:text-2xl font-bold">{stat.count}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Section */}
        <section className="bg-[#d9d9d9] shadow rounded-2xl p-4 md:p-6 md:w-3/4 flex flex-col gap-4">
          {[
            { title: "About", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { title: "Skills", content: skills.map(skill => <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-600 rounded-full">{skill}</span>) },
            { title: "Education", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { title: "Achievements", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
            { title: "Certifications", content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
          ].map((section, index) => (
            <div key={index} className="bg-[#F6F8FA] p-4 md:p-6 rounded-xl shadow">
              <h2 className="text-lg md:text-xl font-semibold text-gray-700">{section.title}</h2>
              <p className="mt-2 text-gray-600">
                {typeof section.content === "string" ? section.content : <div className="flex flex-wrap gap-2">{section.content}</div>}
              </p>
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
