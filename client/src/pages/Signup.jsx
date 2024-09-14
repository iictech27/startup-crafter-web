import signup_image from "../assets/images/signup_image.png";
import loginsvg from "../assets/vectors/loginsvg.png";
import { Input, InputButton } from "../components/index";
import { Link } from "react-router-dom";
import google_icon from "../assets/icons/google_icon.png";
import github_icon from "../assets/icons/github_icon.png";
import styles from "../style";

export default function Signup() {
  return (
    <>
      <section
        className={`min-h-screen px-[2rem] md:px-[6rem] md:pl-[8rem] lg:px-[3rem] lg:pl-[12rem] ${styles.paddingY} ${styles.flexCenter} relative overflow-y-hidden`}
      >
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

            <form>
              <Input label="Full name" type="text" placeholder="John Doe" />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your Email or phone number"
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
              />

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
        <div className="absolute left-0 bottom-0 -z-50">
          <img src={loginsvg} alt="login svg" className="w-full h-full" />
        </div>
      </section>
    </>
  );
}
