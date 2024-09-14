import React from "react";

function TeamMember({ role, name, image }) {
  return (
    <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow mt-1.5 text-xl text-black max-md:mt-10">
        <div className="relative w-40 h-60 rounded-3xl overflow-hidden border-4 border-gray-500">
          <img
            loading="lazy"
            src={image}
            alt={`${name}'s profile`}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col pr-0.5 pl-4 mt-3 max-md:pl-5">
          <div className="self-start font-bold">{role}</div>
          <div className="self-start font-medium">{name}</div>
        </div>
      </div>
    </div>
  );
}

export default TeamMember;
