import { PageMarker, ContentTab } from "../components/index";
import { Outlet, useParams } from "react-router-dom";
import styles from "../style.js";
//images and vectors
import frontenddev from "../assets/images/frontenddev.png";
import spmsvg from "../assets/vectors/spmsvg.png";
import useFetchData from "../hooks/useFetchData.js";

export default function SeparateUnit() {
  const { separateUnit } = useParams();
  const [unit, isLoading] = useFetchData("/src/data/unit.json");
  const title = !isLoading && unit[0].units[0].title;
  const content = !isLoading && unit[0].units[0].learnings;

  return (
    <section className="">
      {/* Hero Section */}
      <div
        className="head_section min-h-[20vw] flex flex-col justify-center items-center gap-y-4 bg-cover bg-no-repeat relative z-10 p-8"
        style={{ backgroundImage: `url(${frontenddev})` }}
      >
        <h1 className="mt-5 lg:mt-0 text-3xl md:text-5xl font-semibold">
          {title}
        </h1>
        <p className="md:w-1/2 text-base sm:text-lg">{content.desc}</p>
        <PageMarker>{separateUnit.split("-").join(" ")}</PageMarker>
      </div>

      {/* Main Section */}
      <section
        className={`relative ${styles.section} justify-center gap-y-10 ${styles.paddingY} ${styles.marginX}`}
      >
        <div className="content flex-col justify-center items-center p-3 gap-y-8">
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 relative z-10">
            {!isLoading &&
              unit[0].units[0].learnings.topics.map((topic, index) => (
                <ContentTab topic={topic} key={index} />
              ))}
          </div>
        </div>
        <div className="w-full md:w-[70vw] mx-auto relative z-10">
          <Outlet />
        </div>
        <img
          src={spmsvg}
          alt="spm vector"
          className="absolute -top-[10rem] -left-[10rem] rotate-[270deg]"
        />
      </section>
    </section>
  );
}
