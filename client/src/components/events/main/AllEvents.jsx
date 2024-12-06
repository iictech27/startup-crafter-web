import { NavLink } from "react-router-dom";
import EventCard from "./EventCard";
import PastEventCard from "./PastEventCard";
import eventImg from "/assets/images/eventHero.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchPastEvents,
  fetchUpcomingEvents,
  resetEvents,
} from "../../../features/events/eventSlice";

export default function AllEvents() {
  const dispatch = useDispatch();
  const { loading, error, upcomingEvents, pastEvents } = useSelector(
    (state) => state.event || {}
  );

  const [upcomingEventsAvailable, setUpcomingEventsAvailable] = useState(false);
  const [pastEventsAvailable, setPastEventsAvailable] = useState(false);

  useEffect(() => {
    dispatch(resetEvents());
    dispatch(fetchUpcomingEvents());
    dispatch(fetchPastEvents());
  }, [dispatch]);

  useEffect(() => {
    if (upcomingEvents.length > 0) {
      setUpcomingEventsAvailable(true);
      console.log(upcomingEvents);
    }
  }, [upcomingEvents]);

  useEffect(() => {
    if (pastEvents.length > 0) {
      setPastEventsAvailable(true);
      console.log(pastEvents);
    }
  }, [pastEvents]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{Error}</p>;

  return (
    <>
      <img
        loading="lazy"
        src={eventImg}
        alt="Event banner"
        className="object-contain w-full rounded-none aspect-[1.95] max-md:max-w-full"
      />
      <section className="flex flex-col px-9 mt-16 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <h2 className="font-inria self-start mt-20 tracking-wide text-4xl font-bold text-black max-md:mt-10 max-md:ml-2.5">
          Upcoming Events
        </h2>
        <div className="mt-10 max-md:mr-1 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {upcomingEventsAvailable ? (
              upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex flex-col w-[33%] max-md:ml-5 max-md:w-full"
                >
                  <NavLink
                    to={`upcoming-event/${event.slug}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <EventCard {...event} />
                  </NavLink>
                </div>
              ))
            ) : (
              <h1>No Upcoming Events available...</h1>
            )}
          </div>
        </div>
        <div className=" flex shrink-0 self-center mx-auto mt-12 w-80 max-w-full h-2.5 bg-zinc-300 rounded-[40px] max-md:mt-10" />
      </section>
      <section className="flex flex-col px-9 mt-16 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <h2 className="font-inria self-start text-4xl font-bold text-black tracking-wide max-md:ml-2.5">
          Past Events
        </h2>
        <div className="mt-10 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {pastEventsAvailable ? (
              pastEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
                >
                  <NavLink
                    to={`past-event/${event.slug}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <PastEventCard {...event} />
                  </NavLink>
                </div>
              ))
            ) : (
              <h1>No past events available...</h1>
            )}
          </div>
        </div>
        <div className="flex shrink-0 self-center mt-12 w-80 max-w-full h-2 bg-zinc-300 rounded-[40px] max-md:mt-10" />
      </section>
    </>
  );
}
