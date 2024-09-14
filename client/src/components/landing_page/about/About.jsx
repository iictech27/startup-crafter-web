import { Link } from "react-router-dom";
import styles from "../../../style";
import Button from "../../Button";
import { homeAbout_features } from "../../../constants/index";

export default function About() {
  return (
    <section className="mt-28 md:mt-44 relative flex flex-col justify-center items-center">
      <h1 className={`${styles.sectionHead2} font-inria`}>
        Why <span className="text-highlight">startup crafter </span>?
      </h1>
      <p
        className={`${styles.paddingX} ${styles.flexCenter} ${styles.paragraph} mt-10 w-full md:w-3/4 text-center`}
      >
        Startup Crafter is your one-stop platform for transforming ideas into
        successful ventures. We provide mentorship, resources, investor
        connections, and industry opportunities to empower aspiring
        entrepreneurs to craft, launch, and grow their startups with confidence
        and support.{" "}
      </p>
      <section
        className={`flex flex-col w-[100vw] pt-4 sm:pt-12 justify-center items-center`}
      >
        <div className="flex flex-wrap gap-x-16">
          <Link to="/contact" className="font-semibold">
            <Button title="contact us" btnColor="bg-highlight" />
          </Link>
          <Link to="/about" className="font-semibold">
            <Button title="about us" btnColor="bg-highlight" />
          </Link>
        </div>
        <div
          className={`mt-10 px-8 sm:px-24 lg:px-20 ${styles.paddingY} bg-gray-100 w-full flex flex-col lg:flex-row justify-center items-center gap-y-8 gap-x-8`}
        >
          {homeAbout_features.map((item, index) => (
            <div
              className="p-6 md:p-10 flex flex-col justify-center items-start gap-y-4 rounded-md border border-gray-400"
              key={index}
            >
              <img src={item.iconLink} alt="icon" className="w-12 h-12" />
              <h1 className="text-2xl font-bold font-inria">{item.title}</h1>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
