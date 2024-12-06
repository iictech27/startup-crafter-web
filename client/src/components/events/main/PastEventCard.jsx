import React from "react";
import getDate from "../../../utils/getDate";

const PastEventCard = ({ picture, title, startingDate }) => {
  return (
    <div className="flex flex-col grow pt-3.5 pr-3 pb-24 w-full text-black bg-white rounded-[40px] shadow-[4px_4px_25px_rgba(0,0,0,0.25)] max-md:mt-10 transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <img
        loading="lazy"
        src={picture}
        alt={title}
        className="object-contain w-full aspect-[1.95] rounded-t-[40px]"
      />
      <div className="flex flex-col self-start mt-7 ml-5 max-md:ml-2.5">
        <h3 className="font-inknut text-2xl">{title}</h3>
        <div className="self-start mt-6 text-lg tracking-wide">
          {getDate(startingDate)}
        </div>
      </div>
    </div>
  );
};

export default PastEventCard;
