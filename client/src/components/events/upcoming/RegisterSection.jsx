import React from "react";

import eventImg from "/assets/images/events1.png";
import Button from "../../Button";

function RegisterSection() {
  return (
    <section className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col w-full h-full max-md:mt-10 max-md:max-w-full">
        <div className=" self-end mr-24 max-w-full text-white whitespace-nowrap max-md:mr-2.5">
          <Button title="register" btnColor="gradientBtnColor" />
        </div>
        <div className="relative mt-10 flex-1">
          <p className="relative z-10 px-16 pt-9 text-center text-nowrap text-2xl font-bold tracking-widest text-red-600 max-md:px-5">
            Last Date May 20, 12.00 AM
          </p>
          <img
            src={eventImg}
            alt="Hackathon event poster"
            className="object-cover w-[50rem] h-full"
          />
        </div>
      </div>
    </section>
  );
}

export default RegisterSection;
