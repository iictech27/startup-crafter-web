import { Input, InputButton } from "../components";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminLogin() {
  const initialFormValues = { adminName: "", password: "" };
  const [formValues, handleChange, handleSubmit, validationError] = useAuth(
    "admin-login",
    initialFormValues
  );

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
            value={formValues.adminName}
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

export function ResetAdminPassword() {
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
        <form className="flex flex-col justify-start items-center gap-y-2 text-gray-600">
          <span className="text-2xl mb-4 font-bold">Change password</span>
          <Input label="old password" type="text" />
          <Input label="new password" type="password" />
          <Input label="confirm new password" type="password" />
          <InputButton title="change password" color="bg-blue-700" />
        </form>
      </div>
    </div>
  );
}
