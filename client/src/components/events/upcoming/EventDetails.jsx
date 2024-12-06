import React from "react";
import getDate from "../../../utils/getDate";

function EventDetails({ startingDate, endingDate, title, location, about }) {
  console.log(startingDate);
  return (
    <section className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col mt-4 text-black max-md:mt-10 max-md:max-w-full">
        <time
          dateTime={startingDate}
          className="self-start text-2xl tracking-widest"
        >
          {getDate(startingDate)}
        </time>
        <div className="flex flex-col items-start px-1 mt-1.5 w-full max-md:max-w-full">
          <h1 className="self-stretch text-6xl tracking-[4.2px] max-md:max-w-full max-md:text-4xl font-imfell">
            {title}
          </h1>
          <p className="mt-6 text-2xl tracking-widest text-stone-500 max-md:ml-1.5">
            {about}
          </p>
          <h2 className="mt-28 ml-5 text-3xl font-bold text-zinc-800 tracking-[2.1px] max-md:mt-10 max-md:ml-2.5">
            Date and Time
          </h2>
          <div className="flex gap-7 mt-2.5 ml-5 text-lg font-extralight tracking-widest max-md:ml-2.5">
            <i className="fa-regular fa-calendar-days"></i>
            <div className="flex-auto">
              starts at:{" "}
              <time dateTime="2023-04-16T11:30">
                <strong>{getDate(startingDate)}</strong>
              </time>
              <br />
              ends at:{" "}
              <time dateTime="2023-04-19T11:30">
                <strong>{getDate(endingDate)}</strong>
              </time>
            </div>
          </div>
          <h2 className="mt-28 ml-5 text-3xl font-bold text-zinc-800 tracking-[2.1px] max-md:mt-10 max-md:ml-2.5">
            Location
          </h2>
          <div className="flex gap-4 mt-2 ml-5 text-xl tracking-widest max-md:ml-2.5">
            <i className="fa-solid fa-location-dot text-blue-700"></i>
            <address className="flex-auto not-italic">
              {location}{" "}
              <a
                href="https://www.google.com/maps/place/22%C2%B034'36.4%22N+88%C2%B025'38.1%22E/@22.5767803,88.4259625,383m/data=!3m2!1e3!4b1!4m4!3m3!8m2!3d22.5767778!4d88.42725?authuser=0&entry=ttu"
                className="text-blue-600"
              >
                Show map
              </a>
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetails;
