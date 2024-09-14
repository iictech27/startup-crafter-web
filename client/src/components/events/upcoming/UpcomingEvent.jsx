import React from "react";
import Timeline from "./Timeline";
import EventDetails from "./EventDetails";
import RegisterSection from "./RegisterSection";

function UpcomingEvent() {
  return (
    <>
      <div className="self-stretch max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <EventDetails />
          <RegisterSection />
        </div>
      </div>
      <Timeline />
    </>
  );
}

export default UpcomingEvent;
