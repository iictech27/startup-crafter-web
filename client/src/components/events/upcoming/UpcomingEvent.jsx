import React, { useEffect } from "react";
import Timeline from "./Timeline";
import EventDetails from "./EventDetails";
import RegisterSection from "./RegisterSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpcomingEventDetail } from "../../../features/events/eventSlice";
import { useParams } from "react-router-dom";

function UpcomingEvent() {
  const dispatch = useDispatch();
  const { eventDetail } = useSelector((state) => state.event || null);
  const { upcomingEvent } = useParams();

  useEffect(() => {
    dispatch(fetchUpcomingEventDetail(upcomingEvent));
  }, [dispatch]);

  return (
    <>
      <div className="mx-auto w-[80vw]">
        <div className="flex gap-5 max-md:flex-col">
          <EventDetails {...eventDetail} />
          <RegisterSection {...eventDetail} />
        </div>
      </div>
      <Timeline {...eventDetail} />
    </>
  );
}

export default UpcomingEvent;
