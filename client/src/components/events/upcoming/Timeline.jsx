import React from "react";

function Timeline() {
  return (
    <section className="w-full">
      <h2 className="mt-16 ml-6 text-3xl font-bold text-zinc-800 tracking-[2.1px] max-md:mt-10 max-md:ml-2.5">
        Stages and Timeline
      </h2>
      <div className="flex flex-col items-center justify-center mt-6 w-full">
        <ul className="flex flex-col items-center justify-center mt-10">
          {" "}
          {/* Added space-y-8 for 2rem gap */}
          {/* Prelims Round */}
          <li className="border-l-2 border-blue-600 max-w-3xl">
            {" "}
            {/* Increased width by 15% */}
            <div className="md:flex flex-start gap-6">
              <div className="bg-white border-4 border-blue-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3" />
              <div className="flex flex-col items-start bg-white p-6 shadow-[4px_4px_25px_rgba(0,0,0,0.25)] rounded-3xl mb-8 relative w-full">
                <h2 className="text-xl font-bold mb-4">Prelims Round</h2>
                <p className="text-gray-600">
                  <strong>Rules:</strong> Teams will have to submit a ppt or pdf
                  describing their ideas. (You can take the reference for the
                  pitch deck from here:
                  <a
                    href="http://bit.ly/PitchDeck_IICTMSL"
                    className="text-blue-500 underline"
                  >
                    http://bit.ly/PitchDeck_IICTMSL
                  </a>
                  ). Teams must submit a video solution explaining their ideas
                  (max 90 seconds). Teams can also submit their prototype if
                  any. The shortlisted will be invited to the finals.
                </p>
                <div className="mt-4 flex gap-4 w-full text-gray-500">
                  <p>
                    <strong>Start Date:</strong> <br />
                    16 Apr 24, 12:00 AM IST
                  </p>
                  <p>
                    <strong>End Date:</strong> <br />
                    18 Apr 24, 10:33 PM IST
                  </p>
                </div>
                <div className="absolute top-0 right-0 bg-orange-100 text-orange-600 px-4 py-2 rounded-tr-3xl rounded-bl-3xl text-sm">
                  <strong>On Unstop</strong>
                </div>
              </div>
            </div>
          </li>
          {/* Finals Round */}
          <li className="border-l-2 border-blue-600 w-{600px} max-w-3xl">
            {" "}
            {/* Increased width by 15% */}
            <div className="md:flex flex-start gap-6">
              <div className="bg-white border-4 border-blue-600 w-6 h-6 flex items-center justify-center rounded-full -ml-3" />
              <div className="flex flex-col items-start bg-white p-6 shadow-[4px_4px_25px_rgba(0,0,0,0.25)] rounded-3xl relative w-full">
                <h2 className="text-xl font-bold mb-4">Finals (Online)</h2>
                <p className="text-gray-600">
                  <strong>Rules:</strong> They will have to pitch their ideas in
                  front of the panelists. For finals, each team will be allotted
                  10 minutes (6 minutes for pitching and 4 minutes for the QnA
                  round).
                </p>
                <div className="mt-4 flex gap-4 w-full text-gray-500">
                  <p>
                    <strong>Start Date:</strong> <br />
                    19 Apr 24, 12:00 AM IST
                  </p>
                  <p>
                    <strong>End Date:</strong> <br />
                    19 Apr 24, 10:44 PM IST
                  </p>
                </div>
                <div className="absolute top-0 right-0 bg-orange-100 text-orange-600 px-4 py-2 rounded-tr-3xl rounded-bl-3xl text-sm">
                  <strong>On Unstop</strong>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Timeline;
