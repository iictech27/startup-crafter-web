import { NavLink, Link } from "react-router-dom";
import EventCard from "./EventCard";
import PastEventCard from "./PastEventCard";
import useFetchData from "../../../hooks/useFetchData";
import eventImg from "/assets/images/eventHero.png";

export default function AllEvents() {
  const [upcomingEvents, isLoading] = useFetchData(
    "/src/data/upcoming_events.json"
  );
  const [pastEvents, isPastEventsLoading] = useFetchData(
    "/src/data/past_events.json"
  );

  return (
    <>
      <img
        loading="lazy"
        src={eventImg}
        alt="Event banner"
        className="object-contain w-full rounded-none aspect-[1.95] max-md:max-w-full"
      />
      <section className="flex flex-col px-9 mt-16 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <h2 className="self-start mt-24 ml-5 text-4xl font-bold text-black tracking-[2.8px] max-md:mt-10 max-md:ml-2.5">
          Upcoming Events
        </h2>
        <div className="mt-10 max-md:mr-1 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {!isLoading ? (
              upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex flex-col w-[33%] max-md:ml-5 max-md:w-full"
                >
                  <NavLink
                    to={`upcoming-event/${event.title}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <EventCard {...event} />
                  </NavLink>
                </div>
              ))
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
        <div className=" flex shrink-0 self-center mx-auto mt-12 w-80 max-w-full h-2.5 bg-zinc-300 rounded-[40px] max-md:mt-10" />
      </section>
      <section className="flex flex-col px-9 mt-16 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <h2 className="self-start text-4xl font-bold text-black tracking-[2.8px] max-md:ml-2.5">
          Past Events
        </h2>
        <div className="mt-24 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            {!isPastEventsLoading ? (
              pastEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full"
                >
                  <NavLink
                    to={`past-event/${event.title}`}
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    <PastEventCard {...event} />
                  </NavLink>
                </div>
              ))
            ) : (
              <h1>Loading...</h1>
            )}
          </div>
        </div>
        <div className="flex shrink-0 self-center mt-12 w-80 max-w-full h-2 bg-zinc-300 rounded-[40px] max-md:mt-10" />
      </section>
    </>
  );
}
