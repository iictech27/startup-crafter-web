import React from "react";

const EventCard = ({ image, title, startTime, endTime, registerClosesAt }) => {
  return (
    <div className="flex flex-col grow py-4 w-full text-black bg-white rounded-[40px] shadow-[4px_4px_25px_rgba(0,0,0,0.25)] max-md:mt-10 transform transition-transform duration-300 hover:-translate-y-4 hover:shadow-3xl hover:border hover:border-sky-700">
      <img
        src={image}
        alt={title}
        className="object-contain self-start w-full aspect-[1.78]"
      />
      <div className="flex flex-col pr-20 pl-5 mt-4 w-full max-md:pr-5">
        <h3 className="self-start text-2xl tracking-widest">{title}</h3>
        <div className="self-start mt-2 text-lg font-extralight tracking-widest max-md:ml-0.5">
          {startTime && (
            <>
              starts at: <strong>{startTime}</strong>
            </>
          )}
          <br />
          {endTime && (
            <>
              ends at: <strong>{endTime}</strong>
            </>
          )}
        </div>
        <button className="overflow-hidden gap-3 self-center py-1.5 pr-5 pl-5 mt-3 max-w-full text-base font-medium tracking-wider text-white whitespace-nowrap gradientBtnColor min-h-[27px] rounded-[999px] shadow-[0px_3px_8px_rgba(2,37,255,0.25)] w-[106px]">
          Register
        </button>
        <div className="self-center mt-4 text-xs font-bold tracking-wider text-red-600">
          closes at {registerClosesAt}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
