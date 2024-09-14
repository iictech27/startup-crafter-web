import styles from "../style";
import { Link, Outlet } from "react-router-dom";
import { Button, InputWithButton2, HeroCard } from "../components/index";
import image_sm from "../assets/images/image_sm.png";
import smFooterVector from "../assets/vectors/smFooterVector.png";
import smCircleVector from "../assets/vectors/smCircleVector.png";

export default function StudyMaterial() {
  return (
    <>
      <section className="mx-2 md:mx-4 h-[100vh] sm:h-[80vh] overflow-hidden bg-gradient-to-b from-gradient1 from-5% via-transparent via-50% to-transparent to-45% rounded-t-[70px]">
        {/* Hero Section */}
        <div
          className={`relative ${styles.flexStart} lg:pl-10 md:px-18 flex-col px-4 py-6 md:py-10`}
        >
          <div className="z-[10] flex flex-col gap-y-2 md:gap-y-6">
            <h1
              className={`${styles.sectionHead} sm:tracking-wider text-center sm:text-left`}
            >
              <span className="text-btnColor">Learn</span> with us.
            </h1>
            <h1
              className={`${styles.sectionHead} relative lg:ml-40 sm:tracking-wider text-center sm:text-left`}
            >
              <span className="text-violet-600">Grow</span> with us.
              <img
                src={smCircleVector}
                alt="smCircleVector"
                className="absolute w-[9rem] h-[3.5rem] sm:w-[12rem] sm:h-[4.5rem] lg:w-[15rem] lg:h-[6rem] top-0 left-0"
              />
            </h1>
            {/* Search study materials */}
            <p className={`${styles.paragraph} mb-4 sm:mb-0`}>
              Free Learning Resources for You, search below your topic of
              interest
            </p>
            <InputWithButton2
              btnTitle="search"
              placeholder="search resources"
            />
            <div className="flex flex-wrap justify-center items-center mt-6 gap-y-2 gap-x-6">
              <span className="font-bold">try : </span>
              <Button
                title="web developement"
                btnColor="gradientBtnColor"
                small
              />
              <Button
                title="Android development"
                btnColor="gradientBtnColor"
                small
              />
              <Button title="python" btnColor="gradientBtnColor" small />
            </div>
          </div>
          <img
            src={image_sm}
            alt="studymaterial"
            className="absolute md:w-[80rem] md:h-[45rem] top-[95%] left-0 md:top-[20%] md:left-[30%] object-contain"
          />
        </div>
      </section>

      {/* Topics */}
      <section
        className={`mt-0 lg:mt-16 relative flex flex-col justify-center items-center`}
      >
        <h1
          className={`px-4 text-3xl sm:text-5xl lg:text-6xl font-bold capitalize text-center relative z-10 font-inria`}
        >
          Recommended Topic for you
        </h1>
        <section
          className={`flex flex-col w-[80vw] sm:w-[90vw] ${styles.marginX} ${styles.paddingY} justify-between items-center gap-y-8`}
        >
          <Outlet />
        </section>
        {/* </section> */}
      </section>
      {/* Vector at footer */}
      <img
        src={smFooterVector}
        alt="footer"
        className="relative w-full h-[10rem] sm:h-[14rem] md:h-[20rem]"
      />
    </>
  );
}

/*<section
//   className={`mt-10 px-8 sm:px-24 lg:px-20 ${styles.paddingY} w-full flex flex-col lg:flex-row justify-evenly items-center gap-y-8`}
// >
//   {features.map((feature) => (
//     <div className="flex flex-col items-center gap-y-6 basis-[30%]">
//       <img
//         src={feature.imgLink}
//         alt="feature"
//         className="w-[15rem] h-[15rem] object-contain"
//       />
//       <p
//         className={`${styles.paragraph} text-center font-semibold w-2/3`}
//       >
//         {feature.description}
//       </p>
//     </div>
//   ))}
// </section> */
