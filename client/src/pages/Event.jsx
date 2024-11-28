import React from "react";
import { Outlet } from "react-router-dom";
import smFooterVector from "/assets/vectors/smFooterVector.png";

const Event = () => {
  return (
    <>
      <div className="flex overflow-hidden flex-col pb-5 bg-white">
        <div className="w-full border border-solid border-neutral-400 min-h-[1px] max-md:max-w-full" />
        <main className="flex flex-col px-4 mt-5 w-full max-md:max-w-full">
          <Outlet />
        </main>
      </div>
      <img
        src={smFooterVector}
        alt="footer"
        className="relative w-full h-[10rem] sm:h-[14rem] md:h-[20rem]"
      />
    </>
  );
};

export default Event;
