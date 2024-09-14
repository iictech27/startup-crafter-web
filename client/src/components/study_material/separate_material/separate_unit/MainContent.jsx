import useFetchData from "../../../../hooks/useFetchData";
import usePagination from "../../../../hooks/usePagination";
import { useParams } from "react-router-dom";
import Pagination from "../../../Pagination";

export default function MainContent() {
  const { mainContent } = useParams();
  const [unit, isLoading] = useFetchData("/src/data/unit.json");
  let itemsToShow = 1;
  const [currentItem, currentPage, setCurrentPage] = usePagination(itemsToShow);

  const contents = !isLoading && unit[0].units[0].learnings.topics[0].content;

  return (
    <div className="main_content p-3 md:p-8 h-screen bg-gray-100 flex flex-col items-end">
      <div className="text-center self-center flex-1">
        <h2 className="text-3xl">{mainContent}</h2>

        {!isLoading &&
          unit[0].units[0].learnings.topics[0].content
            .map((content, index) => (
              <p className="text-3xl" key={index}>
                {content.text}
              </p>
            ))
            .slice(currentItem.start, currentItem.end)}
      </div>
      <Pagination
        type="button"
        totalItems={contents.length}
        itemsToShow={itemsToShow}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
