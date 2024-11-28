import { Input, InputButton } from "../components";
import logo from "/assets/logo.png";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import axios from "axios";

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
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    customError: "",
  });

  const [isPasswordChanged, setPasswordChanged] = useState(false);

  const handlePasswordChangedSuccess = () => {
    setPasswordChanged(!isPasswordChanged);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Clear the validation error for the current field if it becomes valid
    if (value !== "") {
      setValidationError((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.oldPassword === "") {
      setValidationError({
        ...validationError,
        oldPassword: "Old Password is required !",
      });
      return;
    }
    if (formValues.newPassword === "") {
      setValidationError({
        ...validationError,
        newPassword: "New Password is required !",
      });
      return;
    }
    if (formValues.confirmPassword === "") {
      setValidationError({
        ...validationError,
        confirmPassword: "Confirm you new Password !",
      });
      return;
    }
    if (formValues.confirmPassword !== formValues.newPassword) {
      setValidationError({
        ...validationError,
        confirmPassword: "Type the new password to confirm !",
      });
      return;
    }

    const res = axios
      .post(
        "https://startup-crafter-web-server.onrender.com/api/v1/admin/reset-admin-password",
        {
          oldPassword: formValues.oldPassword,
          newPassword: formValues.newPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        handlePasswordChangedSuccess();
      })
      .catch((error) => {
        console.log(error);
        setValidationError({
          ...validationError,
          customError: error.response.data.message,
        });
      });

    console.log(res);
    setFormValues({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative p-16 bg-indigo-100 rounded-lg shadow-lg">
        {isPasswordChanged ? (
          <div>
            <h1 className="text-3xl text-green-400">
              Password Changed Successfully !
            </h1>
          </div>
        ) : (
          <form
            className="flex flex-col justify-start items-center gap-y-2 text-gray-600"
            onSubmit={handleSubmit}
          >
            <span className="text-2xl mb-4 font-bold">Change password</span>
            <Input
              label="Old Password"
              name="oldPassword"
              value={formValues.oldPassword}
              onChange={handleChange}
              type="text"
            />
            <span className="error-msg">{validationError?.oldPassword}</span>
            <Input
              label="New Password"
              name="newPassword"
              value={formValues.newPassword}
              onChange={handleChange}
              type="password"
            />
            <span className="error-msg">{validationError?.newPassword}</span>
            <Input
              label="Confirm Password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              onChange={handleChange}
              type="password"
            />
            <span className="error-msg">
              {validationError?.confirmPassword || validationError?.customError}
            </span>
            <InputButton title="change password" color="bg-blue-700" />
          </form>
        )}
        <GrClose
          className="absolute top-5 right-5 text-2xl cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>
  );
}
