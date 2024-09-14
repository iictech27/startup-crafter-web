import { NavLink } from "react-router-dom";

export default function ContentTab({ topic}) {
  return (
    <NavLink
      to={topic.key}
      className={({ isActive }) =>
        `content_tabs ${isActive ? "gradientBtnColor text-white" : "bg-white text-black border-gray-600"} font-semibold w-[12rem] px-2 py-1.5 rounded-xl shadow-md border cursor-pointer flex items-center gap-x-2`
      }
    >
      <i className="fa-solid fa-circle-check text-2xl text-gray-600"></i>
      <span>{topic.title}</span>
    </NavLink>
  );
}
