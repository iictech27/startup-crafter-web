import React from "react";
import getDate from "../../../utils/getDate";

function Timeline({ stages }) {
  return (
    <section className="mx-auto w-[80vw]">
      <h2 className="mt-16 ml-6 text-3xl font-bold text-zinc-800 tracking-[2.1px] max-md:mt-10 max-md:ml-2.5">
        Stages and Timeline
      </h2>
      <div className="flex flex-col items-center justify-center mt-6 w-full">
        <ul className="flex flex-col items-center justify-center mt-10">
          {" "}
          {/* Added space-y-8 for 2rem gap */}
          {/* Prelims Round */}
          {stages?.map((stage, index) => (
            <li
              className="border-l-2 border-blue-600 sm:w-[28rem] lg:w-[48rem]"
              key={index}
            >
              {" "}
              {/* Increased width by 15% */}
              <div className="md:flex flex-start gap-6">
                <div className="bg-white border-4 border-blue-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3" />
                <div className="flex flex-col items-start bg-white p-6 shadow-[4px_4px_25px_rgba(0,0,0,0.25)] rounded-3xl mb-8 relative w-full">
                  <h2 className="text-xl font-bold mb-4">{stage.title}</h2>
                  <p className="text-gray-600">
                    <strong>Rules:</strong> {stage.description}
                  </p>
                  <div className="mt-4 flex gap-4 w-full text-gray-500">
                    <p>
                      <strong>Start Date:</strong> <br />
                      {getDate(stage.startingDate)}
                    </p>
                    <p>
                      <strong>End Date:</strong> <br />
                      {getDate(stage.endingDate)}
                    </p>
                  </div>
                  <div className="absolute top-0 right-0 bg-orange-100 text-orange-600 px-4 py-2 rounded-tr-3xl rounded-bl-3xl text-sm">
                    <strong>On Unstop</strong>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Timeline;
