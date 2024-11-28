import { Button, PageMarker, UnitCard, ProgressBar } from "../components/index";
import { useParams } from "react-router-dom";
import styles from "../style.js";
//images and vectors
import webdev from "/assets/images/webdev.png";
import spmsvg from "/assets/vectors/spmsvg.png";
import prereq_vector from "/assets/images/prereq_vector.png";
import smFooterVector from "/assets/vectors/smFooterVector.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSubTopicDetail } from "../features/study_material/studyMaterialSlice.js";

export default function SeparateTopic() {
  const { separateTopic } = useParams();
  const dispatch = useDispatch();
  const { subTopicDetail, loading, error } = useSelector(
    (state) => state.studyMaterial || {}
  );
  console.log(subTopicDetail);
  const [subTopicAvailable, setSubTopicAvailable] = useState(false);

  useEffect(() => {
    dispatch(fetchSubTopicDetail(separateTopic));
  }, [dispatch]);

  useEffect(() => {
    if (subTopicDetail) {
      setSubTopicAvailable(true);
    }
  }, [subTopicDetail]);

  if (error) return <div>Error : {error}</div>;

  return (
    <section className="">
      {/* Hero section */}
      {subTopicAvailable ? (
        <>
          <div className="head_section flex min-h-[40vw] flex-col-reverse lg:flex-row-reverse justify-between bg-[#000041] relative z-10">
            <div className="basis-[45%] font-inter p-8 flex flex-col md:items-center justify-center gap-y-8 md:gap-y-14 gradientBgColor text-white">
              <h1 className="mt-5 lg:mt-0 text-3xl md:text-5xl font-semibold">
                {!loading && subTopicDetail.title}
              </h1>
              <p className="text-base sm:text-lg text-center lg:w-3/4">
                {!loading && subTopicDetail.description}
              </p>
              <Button title="Start Course" btnColor="gradientBtnColor" />
            </div>
            <div
              className="relative basis-[55%] bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${webdev})` }}
            >
              <PageMarker>{subTopicDetail.title}</PageMarker>
            </div>
          </div>
          {/* Main section */}
          <section
            className={`relative ${styles.section} justify-center gap-y-10 ${styles.paddingY} ${styles.marginX}`}
          >
            <ProgressBar progress={0} />
            <div className="prerequisites relative z-10 flex flex-wrap justify-center sm:justify-between font-inter bg-blue-50 p-10 rounded-3xl shadow-md">
              <div>
                <h2 className="text-2xl font-bold mb-6">Prerequisites</h2>
                <ul className="list-disc px-6 text-lg">
                  {!loading &&
                    subTopicDetail.prerequisites.map((prerequisite, index) => (
                      <li key={index}>{prerequisite}</li>
                    ))}
                </ul>
              </div>
              <img
                src={prereq_vector}
                alt="prerequisites"
                className="w-[20rem] h-[15rem] object-contain"
              />
            </div>
            <div className="units relative z-10 flex flex-col justify-center items-center gap-y-20">
              {!loading &&
                subTopicDetail.units.map((unit, index) => (
                  <UnitCard key={index} num={index + 1} unit={unit} />
                ))}
            </div>
          </section>
          {/* images and vectors */}
          <img
            src={spmsvg}
            alt="spm vector"
            className="absolute top-[25rem] right-0"
          />
          <img
            src={smFooterVector}
            alt="footer"
            className="relative w-full h-[10rem] sm:h-[14rem] md:h-[20rem]"
          />
        </>
      ) : (
        <p>Not Found</p>
      )}
    </section>
  );
}
