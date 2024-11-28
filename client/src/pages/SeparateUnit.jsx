import { PageMarker, Pagination } from "../components/index";
import { NavLink, useParams } from "react-router-dom";
import styles from "../style.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchUnitDetail } from "../features/study_material/studyMaterialSlice.js";
import { useEffect, useState } from "react";
//images and vectors
import frontenddev from "/assets/images/frontenddev.png";
import spmsvg from "/assets/vectors/spmsvg.png";
import usePagination from "../hooks/usePagination.js";

export default function SeparateUnit() {
  const { separateUnit } = useParams();
  const dispatch = useDispatch();
  const { unitDetail, loading, error } = useSelector(
    (state) => state.studyMaterial || {}
  );
  // console.log(unitDetail);

  let itemsToShow = 1;
  const [currentItem, currentPage, setCurrentPage] = usePagination(itemsToShow);

  const [unitDetailAvailable, setUnitAvailable] = useState(false);
  const initialModule =
    unitDetail.modules.length > 0 ? unitDetail.modules[0] : null;
  const [selectedModule, setSelectedModule] = useState(initialModule);

  useEffect(() => {
    dispatch(fetchUnitDetail(separateUnit));
  }, [dispatch]);

  useEffect(() => {
    if (unitDetail) {
      setUnitAvailable(true);
    }
  }, [unitDetail]);

  if (error) return <div>Error : {error}</div>;

  return (
    <section className="">
      {/* Hero Section */}
      {unitDetailAvailable ? (
        <>
          <div
            className="head_section min-h-[20vw] flex flex-col justify-center items-center gap-y-4 bg-cover bg-no-repeat relative z-10 p-8"
            style={{ backgroundImage: `url(${frontenddev})` }}
          >
            <h1 className="mt-5 lg:mt-0 text-3xl md:text-5xl font-semibold">
              {!loading && unitDetail.title}
            </h1>
            <p className="md:w-1/2 text-base sm:text-lg text-center">
              {!loading && unitDetail.description2}
            </p>
            <PageMarker>{!loading && unitDetail.title}</PageMarker>
          </div>

          {/* Main Section */}
          <section
            className={`relative ${styles.section} justify-center gap-y-10 ${styles.paddingY} ${styles.marginX}`}
          >
            <div className="content flex-col justify-center items-center p-3 gap-y-8">
              <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 relative z-10">
                {!loading &&
                  unitDetail.modules.map((module, index) => (
                    <NavLink
                      key={index}
                      to="#"
                      onClick={() => setSelectedModule(module)}
                      className={({ isActive }) =>
                        `content_tabs ${
                          isActive
                            ? "gradientBtnColor text-white"
                            : "bg-white text-black border-gray-600"
                        } font-semibold w-fit px-2 py-1.5 rounded-xl shadow-md border cursor-pointer flex items-center gap-x-2`
                      }
                    >
                      <i className="fa-solid fa-circle-check text-2xl text-gray-600"></i>
                      <span>{module.title}</span>
                    </NavLink>
                  ))}
              </div>
            </div>
            <div className="w-full md:w-[70vw] mx-auto relative z-10">
              <div className="main_content p-3 md:p-8 h-screen bg-gray-100 flex flex-col items-end">
                <div className="text-center self-center flex-1">
                  {selectedModule ? (
                    (() => {
                      const formatPdfText = (text) => {
                        // Split by double newlines to identify paragraphs
                        const paragraphs = text
                          .split(/\n\s*\n/)
                          .filter(Boolean);

                        // Create HTML paragraphs
                        return paragraphs
                          .map((paragraph) => {
                            // Replace single newlines with spaces
                            const cleanedParagraph = paragraph
                              .replace(/\n/g, " ")
                              .trim();
                            return `<p>${cleanedParagraph}</p>`;
                          })
                          .join("");
                      };

                      const formattedText = formatPdfText(
                        selectedModule.content
                      );

                      return (
                        <div>
                          <div
                            className="text-2xl"
                            dangerouslySetInnerHTML={{
                              __html: formattedText, // Use the formatted text here
                            }}
                          />
                        </div>
                      );
                    })()
                  ) : (
                    <p className="text-3xl">No Content found</p> // Default text when no module is selected
                  )}
                </div>
                <Pagination
                  type="button"
                  totalItems={unitDetail.modules.length}
                  itemsToShow={itemsToShow}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
            <img
              src={spmsvg}
              alt="spm vector"
              className="absolute -top-[10rem] -left-[10rem] rotate-[270deg]"
            />
          </section>
        </>
      ) : (
        <p>Not Found</p>
      )}
    </section>
  );
}
