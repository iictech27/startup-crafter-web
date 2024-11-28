// import "./Login.css";
import login_image from "/assets/images/login_image.jpg";
import loginsvg from "/assets/vectors/loginsvg.png";
import { Input, InputButton } from "../components/index";
import { Link, useNavigate } from "react-router-dom";
import google_icon from "/assets/icons/google_icon.png";
import login_texture1 from "/assets/vectors/login_texture1.png";
import login_texture2 from "/assets/vectors/login_texture2.png";
import logo from "/assets/logo.png";
import styles from "../style";
import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const initialFormValues = { email: "", password: "" };
  const [formValues, handleChange, handleSubmit, validationError] = useAuth({
    authType: "user-login",
    initialFormValues,
  });

  return (
    <>
      <section
        className={`min-h-screen px-[2rem] md:px-[6rem] md:pl-[8rem] lg:px-[8rem] lg:pl-[12rem] ${styles.paddingY} ${styles.flexCenter} relative overflow-y-hidden`}
      >
        {/* logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Startup crafter"
            className="absolute top-8 left-20 w-[100px] h-[34px] md:w-[150px] md:h-[50px]"
          />
        </Link>
        {/* login form */}
        <div className={`relative ${styles.flexCenter} flex-wrap w-full z-10`}>
          <div
            className={`${styles.flexCenter} lg:justify-end w-full h-auto lg:w-1/3`}
          >
            <img
              src={login_image}
              alt="Login image"
              className="w-[28rem] h-[18rem] sm:w-[32rem] sm:h-[28rem] md:w-[38rem] lg:w-full lg:h-full object-contain"
            />
          </div>
          <div className="relative px-6 py-6 lg:py-14 rounded-3xl w-full lg:w-1/2 flex flex-col gap-y-8 overflow-hidden">
            <h2 className={`text-left ${styles.signHead}`}>
              Nice to see you again
            </h2>

            <form onSubmit={handleSubmit}>
              <Input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                placeholder="Enter email address"
              />
              <span className="error-msg">{validationError?.email}</span>
              <Input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
              <span className="error-msg">
                {validationError?.password || validationError?.customError}
              </span>
              <div className="flex justify-around items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                    defaultChecked
                  />
                  <label htmlFor="form1Example3"> Remember me </label>
                </div>
                <Link to="/">Forgot password?</Link>
              </div>

              <InputButton title="Sign in" />

              <div className={`${styles.flexCenter} my-2 md:my-4`}>
                <p className="text-center font-bold mx-3 mb-0">OR</p>
              </div>

              <InputButton
                title="Sign in with google"
                btnColor="bg-slate-900"
                icon={google_icon}
              />
            </form>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/user-signup">
                <span className="capitalize text-blue-700">signup now</span>
              </Link>
            </p>
            <img
              src={login_texture1}
              alt="login-texture1"
              className="absolute top-0 right-0 -z-50"
            />
            <img
              src={login_texture2}
              alt="login-texture2"
              className="absolute left-0 bottom-0 -z-50"
            />
          </div>
        </div>
        {/* login page svg */}
        <div className="absolute left-0 bottom-0 -z-50">
          <img src={loginsvg} alt="login svg" className="w-full h-full" />
        </div>
      </section>
    </>
  );
}
