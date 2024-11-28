import ellipse from "/assets/images/ellipse.png";
import grouped_rectangle from "/assets/images/grouped_rectangle.png";

export default function HeadingBg({ className }) {
  return (
    <img
      src={ellipse}
      alt="ellipse"
      className={`absolute ${
        className
          ? className
          : "w-[200px] md:w-[400px] h-[100px] md:h-[260px] sm:left-[55%] -top-20"
      }`}
    />
  );
}

export function HeadingBg2({ className }) {
  return (
    <img
      src={grouped_rectangle}
      alt="grouped_rectangle"
      className={`absolute -z-[2] ${
        className ? className : "w-[200px] md:w-[400px] h-[100px] md:h-[260px]"
      }`}
    />
  );
}
