import { useState } from "react";
import { ResetAdminPassword } from "../AdminLogin";
import { useSelector } from "react-redux";

export default function AdminProfile() {
  const admin = useSelector((store) => store.admin.admin);
  const [isResetPassFormOpen, setResetPassFormOpen] = useState(false);

  const handleResetPassword = () => {
    setResetPassFormOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col p-2 sm:p-8 gap-y-8">
      <div className="relative flex flex-wrap gap-x-8 justify-center sm:justify-start items-center">
        <div className="admin-profile border-2 border-black p-16 sm:p-20 rounded-full">
          <i className="fa-regular fa-user"></i>
        </div>
        <i className="fa-solid fa-pen absolute top-[1rem] left-[12rem] sm:top-[1.5rem] sm:left-[10rem] text-md bg-blue-600 p-2.5 rounded-full text-white"></i>
        <div className="text-center sm:text-left">
          <h1 className="sm:ml-6 font-bold text-3xl capitalize">
            {admin?.adminName || "admin name"}
          </h1>
          <span className="sm:ml-6 text-gray-500 sm:text-left">Admin</span>
        </div>
      </div>
      <div className="relative bg-blue-50 capitalize rounded-xl p-8 text-lg sm:text-xl font-semibold h-[20rem]">
        <span
          className="absolute top-5 right-5 text-blue-700 capitalize font-bold cursor-pointer"
          onClick={handleResetPassword}
        >
          change password
        </span>
        <h3 className="text-gray-500 mt-6">
          admin name : {admin?.adminName || ""}
        </h3>
        <h3 className="text-gray-500 mt-6">e-mail : </h3>
      </div>
      {isResetPassFormOpen && (
        <ResetAdminPassword onClose={() => setResetPassFormOpen(false)} />
      )}
    </div>
  );
}
