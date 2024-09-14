import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../features/users/userSlice";

export default function useAuth({ authType, initialFormValues }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState(initialFormValues);

  const [validationError, setValidationError] = useState({
    email: "",
    password: "",
    fullName: "",
    customError: "",
  });

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
    if (authType === "register" && formValues.fullName === "") {
      setValidationError({
        ...validationError,
        fullName: "Name is required !",
      });
      return;
    }
    if (formValues.email === "") {
      setValidationError({ ...validationError, email: "Email is required !" });
      return;
    }
    if (formValues.password === "") {
      setValidationError({
        ...validationError,
        password: "Password is required !",
      });
      return;
    }
    console.log(formValues);

    const res = axios
      .post(`/api/v1/user/${authType}`, formValues, { withCredentials: true })
      .then((res) => {
        console.log(res);
        //user dispatch to global state and redirecting based on auth type
        if (authType === "login") {
          dispatch(setUser(res.data.data));
          navigate("/");
        } else if (authType === "register") {
          navigate("/user-login");
        } else {
          navigate("");
        }
      })
      .catch((error) => {
        console.log(error);
        setValidationError({
          ...validationError,
          customError: error.response.data.message,
        });
      });

    console.log(res);
    setFormValues(initialFormValues);
  };

  return [formValues, handleChange, handleSubmit, validationError];
}
