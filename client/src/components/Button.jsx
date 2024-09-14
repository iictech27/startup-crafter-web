import { Link } from "react-router-dom";

export default function Button({
  title,
  absolute,
  responsiveBtn,
  btnColor,
  textColor,
  large,
  small,
  onHandleClick,
  loginOption,
  children,
  className,
}) {
  return (
    <div className="flex flex-col relative">
      <button
        onClick={onHandleClick}
        className={`${btnColor ? btnColor : "bg-btnColor"} rounded-2xl md:rounded-2xl text-sm md:text-lg ${textColor ? textColor : "text-white"} font-semibold shadow-md md:shadow-md cursor-pointer w-max capitalize ${absolute && `flex items-center absolute ${!responsiveBtn ? "-top-10 md:-top-14 right-1 sm:right-0" : "md:-top-14 md:right-0"} rounded-2xl md:rounded-[25px] shadow-none sm:py-3.5 sm:px-8 lg:px-8 font-semibold`} ${large ? "px-4 py-5 md:px-8 lg:px-10" : "px-4 py-2 md:px-6 lg:px-8"} ${small && "text-[10px] md:text-sm px-[8px] py-0.5 sm:py-1 lg:px-2"} transition ease-in-out md:hover:shadow-lg ${className}`}
      >
        {title}
        {children}
      </button>
      {loginOption && (
        <div
          id="dropdown"
          className="z-[100] absolute top-14 left-0 font-inria text-lg divide-y divide-gray-100 rounded-xl shadow w-44 overflow-hidden"
        >
          <ul className="text-sm text-blue-700">
            <li>
              <Link
                to="/user-login"
                className="block px-6 py-4 bg-white text-btnColor"
              >
                Login as User
              </Link>
            </li>
            <li>
              <Link
                to="/admin-login"
                className="block px-6 py-4 bg-btnColor text-white"
              >
                Login as Admin
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

// ${absolute ? "absolute top-0 left-[64%] rounded-xl md:rounded-3xl p-4 shadow-none" : ""}
