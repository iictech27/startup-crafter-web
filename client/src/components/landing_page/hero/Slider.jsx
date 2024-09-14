import React from "react";
import styles from "../../../style";
import Button from "../../Button";
import InputWithButton1 from "../../InputWithButton";

export default function SliderCard({
  heading,
  subHeading,
  footerText,
  inputBtn,
  btn,
  para,
  center,
}) {
  return (
    <>
      <h1
        className={`text-4xl ${styles.sectionHead} font-inter w-full ${
          center && "text-center"
        }`}
      >
        {heading}
      </h1>

      {subHeading && (
        <p className={`px-4 ${styles.paragraph} uppercase`}>{subHeading}</p>
      )}

      {para && (
        <p
          className={`px-4 ${styles.paragraph} ${
            center ? "w-full md:w-2/3 text-center" : "w-full lg:w-11/12"
          }`}
        >
          {para}
        </p>
      )}

      {footerText && (
        <p className="px-4 text-2xl sm:text-3xl lg:text-4xl w-full lg:w-10/12 font-inknut capitalize">
          {footerText}
        </p>
      )}
      {inputBtn && (
        <InputWithButton1
          btnTitle="Subscribe"
          placeholder="your email address"
        />
      )}

      {btn && (
        <div className={`px-2`}>
          <Button title="Learn More" />
        </div>
      )}
    </>
  );
}
