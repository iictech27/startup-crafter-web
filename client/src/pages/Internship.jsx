import { InternshipCard, FilterBox } from "../components/index";
import styles from "../style";
import footerSVG from "../assets/vectors/footerSVG.png";

export default function Internship() {
  return (
    <>
      <section
        className={`${styles.marginX} flex flex-col lg:flex-row lg:justify-center gap-y-6 ${styles.paddingX} py-4`}
      >
        <div className="sticky top-20 w-full h-auto lg:h-[60rem] lg:w-[30rem] mr-10 mb-10">
          <FilterBox />
        </div>
        <div className="w-full lg:w-[60%] flex flex-col gap-y-9">
          <div className="relative">
            <input
              type="text"
              className="px-6 py-3 bg-[#EDF2F8] shadow-lg rounded-2xl w-full text-xl focus:outline-none"
              placeholder="keyword for search"
            />
            <i className="fa-solid fa-magnifying-glass absolute top-4 sm:top-5 right-3 sm:right-6 text-gray-700"></i>
          </div>
          <div className="w-full flex-1">
            <InternshipCard />
            <InternshipCard />
            <InternshipCard />
            <InternshipCard />
            <InternshipCard />
            <InternshipCard />
            <InternshipCard />
          </div>
        </div>
      </section>
    </>
  );
}
