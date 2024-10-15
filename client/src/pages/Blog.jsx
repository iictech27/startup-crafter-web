import { Link, Outlet } from "react-router-dom";
import smFooterVector from "../assets/vectors/smFooterVector.png";

export default function Blog() {
  return (
    <>
      <header className="w-[90vw] mx-auto flex mb-4 items-center">
        <Link to="/blog" className="basis-[20%]">
          <h1 className="blogtitle text-2xl md:text-4xl font-italiana uppercase">
            Blogs
          </h1>
        </Link>
        <div className="search-box basis-[60%] mx-auto relative">
          <i className="fa-solid fa-magnifying-glass absolute top-3 left-2 text-gray-700"></i>
          <input
            type="search"
            placeholder="Search blogs"
            className="search-input hidden sm:block w-full h-full rounded-xl pl-10 py-2.5 bg-gray-200"
          />
        </div>
        <div className="header-right basis-[20%] flex justify-end items-center gap-x-10 text-2xl text-zinc-500">
          <Link to="editor">
            <i className="fa-regular fa-pen-to-square cursor-pointer"></i>
          </Link>
          <Link to="saved-blogs">
            <i className="fa-regular fa-bookmark cursor-pointer"></i>
          </Link>
          <Link to="my-blogs">
            <i className="fa-regular fa-user cursor-pointer"></i>
          </Link>
        </div>
      </header>
      <section className={`border-t border-zinc-400 min-h-[70vh]`}>
        <Outlet />
      </section>
      <img
        src={smFooterVector}
        alt="footer"
        className="relative w-full h-[10rem] sm:h-[14rem] md:h-[20rem]"
      />
    </>
  );
}
