import { Link } from "react-router-dom";

export default function AdminProfile() {
  return (
    <div className="relative flex flex-col p-2 sm:p-8 gap-y-8">
      <div className="flex flex-wrap gap-x-8 justify-center sm:justify-start items-center">
        <div className="admin-profile border-2 border-black p-16 sm:p-20 rounded-full">
          <i className="fa-regular fa-user"></i>
        </div>
        <i className="fa-solid fa-pen absolute top-[1rem] left-[12rem] sm:top-[3.5rem] sm:left-[15rem] text-md bg-blue-600 p-2.5 rounded-full text-white"></i>
        <div className="text-center sm:text-left">
          <h1 className="sm:ml-6 font-bold text-3xl capitalize">admin name</h1>
          <span className="sm:ml-6 text-gray-500 sm:text-left">Admin</span>
        </div>
      </div>
      <div className="relative bg-blue-50 capitalize rounded-xl p-8 text-lg sm:text-xl font-semibold h-[20rem]">
        <Link to="/reset-admin-password">
          <span className="absolute top-5 right-5 text-blue-700 capitalize font-bold">
            change password
          </span>
        </Link>
        <h3 className="text-gray-500 mt-6">admin name : </h3>
        <h3 className="text-gray-500 mt-6">e-mail : </h3>
      </div>
    </div>
  );
}
