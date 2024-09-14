import logo from "../../assets/logo.png";
import { navlinks } from "../../constants/index.js";
import { NavLink, Link } from "react-router-dom";
import Button from "../Button.jsx";
import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import styles from "../../style.js";

export default function Header() {
  const [isLoginMenuOpen, setLoginMenuOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isNavFixed, setNavFixed] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(true);

  //login dropdown
  const openMenu = () => {
    setLoginMenuOpen((prev) => !prev);
    console.log("clicked/blurred");
  };

  //blog dropdown
  const openBlogMenu = () => {
    setBlogDropdownOpen((prev) => !prev);
  };

  //navbar fixed at top
  const fixNav = () => {
    if (window.scrollY > 150) {
      setNavFixed(true);
    } else {
      setNavFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", fixNav);
  }, []);

  return (
    <nav
      className={`${
        styles.paddingX
      } flex flex-row-reverse sm:flex-row justify-between items-center ${
        isNavFixed
          ? "fixed top-0 w-full py-2 lg:py-3 bg-gray-50 z-50 shadow-md transition ease-in-out"
          : "py-6 lg:py-8"
      }`}
    >
      <div className="flex justify-center sm:justify-start items-center flex-1">
        <Link to="/">
          <img
            src={logo}
            alt="Startup crafter"
            className="w-[100px] h-[34px] md:w-[150px] md:h-[50px]"
          />
        </Link>
        {/* Nav items */}
        <ul className={`ml-20 hidden md:flex justify-start items-center`}>
          {navlinks.map((nav, index) => (
            <li
              className={`relative font-imprima font-normal cursor-pointer text-xl ${
                index === navlinks.length - 1 ? "mr-0" : "mr-10"
              }`}
              key={nav.id}
            >
              <NavLink
                to={`/${nav.id === "home" ? "" : nav.id}`}
                className={({ isActive }) =>
                  isActive
                    ? "text-btnColor"
                    : "text-textColor transition ease-in-out hover:text-btnColor"
                }
              >
                {nav.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      {/* Login Button */}
      <div className="hidden md:flex items-center">
        {/* <Button
          title="Login"
          onHandleClick={openMenu}
          loginOption={isLoginMenuOpen}
          setLoginMenuOpen={setLoginMenuOpen}
        /> */}

        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full ring-2 ring-gray-300 p-6 cursor-pointer">
          <span className="font-medium text-gray-600">RD</span>
        </div>
      </div>
      {/* For smaller screens */}
      <div className="md:hidden sm:basis-4/6 lg:basis-0 flex justify-end">
        <Hamburger toggle={setOpen} toggled={isOpen} size={25} />
      </div>
      {isOpen && (
        <div className="absolute top-16 right-0 px-10 py-10 bg-white text-white w-full z-50 shadow-md">
          {/* Nav items */}
          <ul className={`${styles.flexStart} flex-col gap-y-4`}>
            {navlinks.map((nav) => (
              <li
                className={`font-imprima font-normal cursor-pointer text-xl`}
                key={nav.id}
              >
                <NavLink
                  to={`/${nav.id === "home" ? "" : nav.id}`}
                  className={({ isActive }) =>
                    isActive ? "text-btnColor" : "text-textColor"
                  }
                >
                  {nav.title}
                </NavLink>
              </li>
            ))}
            {/* Login Button */}
            {/* <Button
              title="Login"
              onHandleClick={openMenu}
              loginOption={isLoginMenuOpen}
              setLoginMenuOpen={setLoginMenuOpen}
            /> */}
          </ul>
        </div>
      )}
    </nav>
  );
}
