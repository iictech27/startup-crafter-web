import { admin_navlinks } from "../constants/index.js";
import { NavLink, Outlet, Link, useNavigate } from "react-router-dom";
import logo from "/assets/logo.png";
import Button from "../components/Button.jsx";
import Hamburger from "hamburger-react";
import { useState, useEffect } from "react";
import styles from "../style.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearAdmin } from "../features/users/adminSlice";
import { clearIdeas } from "../features/ideas/ideaSlice.js";

export default function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const [isNavFixed, setNavFixed] = useState(false);

  const fixNav = () => {
    if (window.scrollY > 100) {
      setNavFixed(true);
    } else {
      setNavFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", fixNav);
  }, []);

  const logout = async () => {
    try {
      const res = await axios.post(
        "https://startup-crafter-web-server.onrender.com/api/v1/admin-logout",
        {
          withCredentials: true,
        }
      );
      console.log(res);

      dispatch(clearIdeas());
      dispatch(clearAdmin());

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="relative flex min-h-screen">
      <div
        className={`hidden navbar md:w-[20rem] h-[100vh] px-6 py-8 md:flex flex-col justify-between shadow-2xl`}
      >
        {/* logo */}
        <Link to="/">
          <img
            src={logo}
            alt="Startup crafter"
            className="w-[100px] h-[34px] md:w-[150px] md:h-[50px]"
          />
        </Link>
        <ul className="w-full basis-[60%] flex flex-col justify-start items-start gap-y-5">
          {admin_navlinks.map((nav) => (
            <li className={`font-inter cursor-pointer text-xl`} key={nav.id}>
              <NavLink
                to={nav.id}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full font-semibold ${
                    isActive
                      ? "gradientBtnColor text-white shadow-md"
                      : "bg-white text-textColor"
                  }`
                }
              >
                {nav.title}
              </NavLink>
            </li>
          ))}
        </ul>
        <Button
          title="Logout"
          onHandleClick={logout}
          btnColor="gradientBtnColor"
        />
      </div>
      <div className="flex-1 h-[100vh] overflow-y-scroll">
        <div
          className={`${
            isNavFixed && "fixed w-full bg-gray-50 z-50"
          } h-[5rem] p-4 flex justify-between items-center shadow-md md:shadow-none`}
        >
          <div className="md:hidden">
            <Hamburger toggle={setOpen} toggled={isOpen} size={25} />
          </div>
          {isOpen && (
            <div className="absolute top-20 right-0 px-10 py-10 bg-white text-white w-full z-50 shadow-md">
              {/* Nav items */}
              <ul className={`${styles.flexStart} flex-col gap-y-4`}>
                {admin_navlinks.map((nav) => (
                  <li
                    className={`font-imprima font-normal cursor-pointer text-lg`}
                    key={nav.id}
                  >
                    <NavLink
                      to={nav.id}
                      className={({ isActive }) =>
                        `px-3 py-1 rounded-full font-semibold ${
                          isActive
                            ? "gradientBtnColor text-white shadow-md"
                            : "bg-white text-textColor"
                        }`
                      }
                    >
                      {nav.title}
                    </NavLink>
                  </li>
                ))}
                {/* Logout Button */}
                <Button title="Logout" btnColor="gradientBtnColor" />
              </ul>
            </div>
          )}
          <Link to="/">
            <img
              src={logo}
              alt="Startup crafter"
              className="block md:hidden w-[100px] h-[34px] md:w-[150px] md:h-[50px]"
            />
          </Link>
          <Link to="" className="border-2 border-black p-3 rounded-full">
            <i className="fa-regular fa-user"></i>
          </Link>
        </div>
        <section className="p-4 md:p-8">
          <Outlet />
        </section>
      </div>
    </section>
  );
}
