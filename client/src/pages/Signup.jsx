import signup_image from "../assets/images/signup_image.png";
import loginsvg from "../assets/vectors/loginsvg.png";
import { Input, InputButton } from "../components/index";
import { Link, useNavigate } from "react-router-dom";
import google_icon from "../assets/icons/google_icon.png";
import github_icon from "../assets/icons/github_icon.png";
import styles from "../style";
import useAuth from "../hooks/useAuth";

export default function Signup() {
  const initialFormValues = { fullName: "", email: "", password: "" };

  const [formValues, handleChange, handleSubmit, validationError] = useAuth({
    authType: "user-register",
    initialFormValues,
  });

  return (
    <>
      <section
        className={`min-h-screen px-[2rem] md:px-[6rem] md:pl-[8rem] lg:px-[3rem] lg:pl-[12rem] ${styles.paddingY} ${styles.flexCenter} relative overflow-y-hidden`}
      >
        {/* signup form */}
        <div
          className={`relative flex justify-center items-center flex-wrap w-full z-10`}
        >
          <div className={`w-full h-auto lg:w-1/3 relative`}>
            <h1 className={`${styles.signHead} capitalize`}>
              Grow learn develop.
            </h1>
            <img
              src={signup_image}
              alt="signup image"
              className="mx-auto w-[20rem] h-[10rem] sm:w-[28rem] sm:h-[16rem] md:w-[30rem] md:h-[20rem] object-contain"
            />

            {/* svg circles */}
            <svg
              height="100"
              width="100"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 right-1 -z-10 drop-shadow-lg"
            >
              <circle r="30" cx="50" cy="50" fill="#f19494" />
            </svg>
            <svg
              height="100"
              width="100"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[15%] right-[20%] -z-10  drop-shadow-lg"
            >
              <circle r="10" cx="50" cy="50" fill="#fede36" />
            </svg>
            <svg
              height="100"
              width="100"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-[60%] -left-10 -z-10  drop-shadow-lg"
            >
              <circle r="15" cx="50" cy="50" fill="#fede36" />
            </svg>
            <svg
              height="120"
              width="120"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-10 -left-4 -z-10  drop-shadow-lg"
            >
              <circle r="60" cx="60" cy="60" fill="#fede36" />
            </svg>
          </div>
          <div className="relative px-6 py-6 lg:py-14 rounded-3xl w-full lg:w-1/2 flex flex-col gap-y-8 shadow-md">
            <h2 className={`text-left ${styles.signHead}`}>Welcome</h2>
            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="fullName"
                value={formValues.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <span className="error-msg">{validationError?.fullName}</span>
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
                placeholder="Enter a password"
              />
              <span className="error-msg">
                {validationError?.password || validationError?.customError}
              </span>
              <InputButton title="Create account" />
            </form>
            <p className="text-center">
              Already have an account ?{" "}
              <Link to="/user-login">
                <span className="capitalize text-blue-700">log in</span>
              </Link>
            </p>
            <div className="w-full sm:w-1/2 mx-auto flex flex-col justify-center items-center gap-y-4">
              <InputButton
                title="Sign up with google"
                btnColor="bg-transparent"
                icon={google_icon}
              />
              <InputButton
                title="Sign up with github"
                btnColor="bg-transparent"
                icon={github_icon}
              />
            </div>
          </div>
        </div>
        {/* signup page svg */}
        <div className="absolute left-0 bottom-0 -z-50">
          <img src={loginsvg} alt="login svg" className="w-full h-full" />
        </div>
      </section>
    </>
  );
}
