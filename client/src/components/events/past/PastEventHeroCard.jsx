import React from "react";
import styles from "../../../style";
import eventImg from "/assets/images/events1.png";
import getDate from "../../../utils/getDate";

function PastEventHeroCard({ startingDate, about, picture, title }) {
  return (
    <section className="mx-2 md:mx-4 h-[100vh] sm:h-[80vh] overflow-hidden">
      {/* Hero Section */}
      <div
        className={`relative ${styles.flexStart} lg:pl-10 md:px-18 flex-col px-4 py-6 md:py-10`}
      >
        <div className="z-[10] flex flex-col gap-y-2 md:gap-y-6">
          <time
            dateTime="2023-05-30"
            className="text-3xl text-center tracking-widest"
          >
            {getDate(startingDate)}
          </time>
          <div className="flex flex-col items-start px-1 mt-7 w-full">
            <h1 className="self-stretch text-5xl font-imfell text-nowrap tracking-[4.2px] max-md:text-4xl">
              {title}
            </h1>
            {/* Increased gap between header and paragraph */}
            <p className="mt-8 w-1/2 text-2xl text-center tracking-widest text-stone-500">
              {about}
            </p>
          </div>
        </div>
        <img
          src={picture}
          alt={title}
          className="absolute md:w-full md:h-[50rem] top-0 left-0 md:left-[10%] object-contain"
        />
      </div>
    </section>
  );
}

export default PastEventHeroCard;
