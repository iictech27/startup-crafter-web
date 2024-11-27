import Button from "../../Button";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function UnitCard({ unit, num }) {
  const sectionRef = useRef(null);
  const [isRead, setRead] = useState(false);
  const [isUnitOpen, setUnitOpen] = useState(false);
  const markRead = () => {
    setRead((prev) => !prev);
  };

  const setReadColor = () => {
    if (isRead) {
      return "text-green-500";
    } else {
      return "text-gray-500";
    }
  };

  const openUnit = () => {
    setUnitOpen((prev) => !prev);
  };

  const scrollToNext = () => {
    console.log(sectionRef);
    window.scrollTo({
      top: window.scrollY + sectionRef.current.offsetHeight,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="flex w-full flex-col justify-center items-center"
      ref={sectionRef}
    >
      <div className="head flex flex-wrap items-center w-full gap-x-4 gap-y-2">
        <i
          className={`fa-solid fa-circle-check text-4xl ${setReadColor()}`}
        ></i>
        <h2 className="text-xl sm:text-2xl flex-1 font-bold">
          Unit {num} : {unit.title}
        </h2>
        <Button
          title={isRead ? "mark as unread" : "mark as read"}
          btnColor="bg-white"
          textColor="text-black"
          onHandleClick={markRead}
        >
          <i
            className={`ml-2 fa-solid fa-circle-check ${
              isRead ? "text-gray-500" : "text-green-500"
            }`}
          ></i>
        </Button>
        <i
          className={`cursor-pointer text-2xl fa-solid ${
            isUnitOpen ? "fa-chevron-up" : "fa-chevron-down"
          }`}
          onClick={openUnit}
        ></i>
      </div>
      <div
        className={`content w-full transition-all ease-in-out duration-300 ${
          isUnitOpen ? "h-auto" : "h-0 hidden"
        } py-4 px-8 font-semibold`}
      >
        <p>{unit.description1}</p>
      </div>
      <div className="footer w-full flex justify-between items-center border-t-2 border-black py-4 mt-2">
        <Button
          title="Read later"
          btnColor="gradientBtnColor"
          onHandleClick={scrollToNext}
        />
        <Link to={`${unit.slug}`}>
          <Button title="Explore" btnColor="gradientBtnColor">
            <i className="ml-2 fa-solid fa-arrow-right"></i>
          </Button>
        </Link>
      </div>
    </div>
  );
}
