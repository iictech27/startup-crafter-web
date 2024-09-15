import { Input, InputButton } from "../components";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { GrClose } from "react-icons/gr";

export default function AdminLogin() {
  const initialFormValues = { adminName: "", password: "" };
  const [formValues, handleChange, handleSubmit, validationError] = useAuth({
    authType: "admin-login",
    initialFormValues,
  });

  return (
    <div className="w-[70vh] mx-auto mt-40">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="mx-auto my-16 w-[200px] h-[55px] md:w-[240px] md:h-[80px]"
        />
      </Link>
      <div className="p-16 bg-indigo-100 rounded-lg shadow-lg">
        <form
          className="flex flex-col justify-start items-center gap-y-2 text-gray-600"
          onSubmit={handleSubmit}
        >
          <span className="text-2xl mb-4">
            Please fill out your unique admin details below
          </span>
          <Input
            type="text"
            name="adminName"
            value={formValues.adminName}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          <span className="error-msg">{validationError?.adminName}</span>
          <Input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
          <span className="error-msg">
            {validationError?.password || validationError?.customError}
          </span>
          <Link className="self-end">
            <span>forgot password ?</span>
          </Link>
          <InputButton title="sign in" color="bg-blue-700" />
        </form>
      </div>
    </div>
  );
}

export function ResetAdminPassword({ onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative p-16 bg-indigo-100 rounded-lg shadow-lg">
        <form className="flex flex-col justify-start items-center gap-y-2 text-gray-600">
          <span className="text-2xl mb-4 font-bold">Change password</span>
          <Input label="Old Password" name="oldPassword" type="text" />
          <Input label="New Password" name="newPassword" type="password" />
          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
          />
          <InputButton title="change password" color="bg-blue-700" />
        </form>
        <GrClose
          className="absolute top-5 right-5 text-2xl cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
