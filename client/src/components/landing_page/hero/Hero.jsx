import React from "react";
import Slider from "react-slick";
import HeroCard from "./HeroCard";
import { sliderinfo } from "../../../constants/index";
import SliderCard from "./Slider";

export default function Hero() {
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
    <Slider {...settings}>
      {sliderinfo.map((info, index) => {
        const highlightedText = info.element.highlight;
        let leftText = info.element.heading.split(
          `${info.element.highlight}`
        )[0];
        let rightText = info.element.heading.split(
          `${info.element.highlight}`
        )[1];

        return (
          <HeroCard
            key={index}
            bg={info.bg && info.bg}
            imgLink={info.imgLink && info.imgLink}
            center={info.center && info.center}
          >
            <SliderCard
              heading={[
                leftText,
                <span className={`${info.element.highlight_color}`}>
                  {highlightedText}
                </span>,
                rightText,
              ]}
              subHeading={info.element.subHeading && info.element.subHeading}
              btn={info.element.btn && info.element.btn}
              footerText={info.element.footerText && info.element.footerText}
              para={info.element.para && info.element.para}
              inputBtn={info.element.inputBtn && info.element.inputBtn}
              center={info.element.center && info.element.center}
            />
          </HeroCard>
        );
      })}
    </Slider>
  );
}
