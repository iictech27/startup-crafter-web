import React, { useEffect } from "react";
import TeamSection from "./TeamSection";
import PastEventHeroCard from "./PastEventHeroCard";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPastEventDetail } from "../../../features/events/eventSlice";

function PastEvent() {
  const dispatch = useDispatch();
  const { eventDetail } = useSelector((state) => state.event || null);
  const { pastEvent } = useParams();

  useEffect(() => {
    dispatch(fetchPastEventDetail(pastEvent));
  }, [dispatch]);

  let settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <>
      <PastEventHeroCard {...eventDetail} />
      <div className="mt-20 overflow-hidden mx-auto w-[100vw] lg:w-[60vw] h-[30rem]">
        <Slider {...settings}>
          <img
            src="https://c8.alamy.com/comp/2D8GN64/cheerful-indian-asian-young-group-of-college-students-or-friends-laughing-together-while-sitting-standing-or-walking-in-campus-2D8GN64.jpg"
            alt="eventimage"
            className="w-full"
          />
          <img
            src="https://c8.alamy.com/comp/2D8GN64/cheerful-indian-asian-young-group-of-college-students-or-friends-laughing-together-while-sitting-standing-or-walking-in-campus-2D8GN64.jpg"
            alt="eventimage"
          />
          <img
            src="https://c8.alamy.com/comp/2D8GN64/cheerful-indian-asian-young-group-of-college-students-or-friends-laughing-together-while-sitting-standing-or-walking-in-campus-2D8GN64.jpg"
            alt="eventimage"
          />
        </Slider>
      </div>
      <section className="flex flex-col items-center w-full max-md:max-w-full">
        <div className="mt-10 w-full max-w-[1147px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col">
            <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex shrink-0 mx-auto max-w-full bg-zinc-300 h-[624px] w-[518px] max-md:mt-8">
                <img
                  src="https://thumbs.dreamstime.com/b/two-indian-students-studying-campus-26973740.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col w-6/12 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-8 max-md:max-w-full">
                <div className="flex shrink-0 bg-zinc-300 h-[312px] max-md:max-w-full">
                  <img
                    src="https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2014/06/29/101798768-india_students_2.1910x1000.jpg"
                    alt=""
                  />
                </div>
                <div className="flex shrink-0 mt-10 bg-zinc-300 h-[272px] max-md:max-w-full">
                  <img src="https://thumbs.dreamstime.com/b/group-college-girls-9332043.jpg" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 mt-10 max-w-full bg-zinc-300 h-[543px] w-[1153px]">
          <img
            src="https://www.visualsstock.com/images/Low/4/AK55122.jpg"
            alt="cover"
            className="object-cover h-full w-full"
          />
        </div>
        <TeamSection
          title="Winners"
          teamName={eventDetail?.previousWinner?.teamName}
          {...eventDetail?.previousWinner}
        />
        <TeamSection
          title="1st Runner up"
          teamName={eventDetail?.firstRunnerUp?.teamName}
          {...eventDetail?.firstRunnerUp}
        />
      </section>
    </>
  );
}

export default PastEvent;
