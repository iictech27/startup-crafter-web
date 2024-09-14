import { NavLink } from "react-router-dom";
import Button from "./Button";

export default function Pagination({
  type,
  totalItems,
  itemsToShow,
  currentPage,
  setCurrentPage,
  className,
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsToShow); i++) {
    pages.push(i);
  }

  return (
    (type === "simple" && (
      <div className="flex gap-x-4">
        {pages.map((pageNo, index) => (
          <div
            key={index}
            className={`font-bold ${pageNo === currentPage && className} size-7 rounded-full cursor-pointer text-center`}
            onClick={() => setCurrentPage(pageNo)}
          >
            {pageNo}
          </div>
        ))}
      </div>
    )) ||
    (type === "button" && (
      <div className={`w-full flex ${currentPage > 1 ? "justify-between" : "justify-end"} items-center`}>
        {currentPage > 1 && (
          <Button
            title="previous"
            btnColor="gradientBtnColor"
            onHandleClick={() => setCurrentPage(currentPage - 1)}
          >
            {" "}
            <i className="ml-2 fa-solid fa-arrow-left"></i>
          </Button>
        )}
        <Button
          title={currentPage === totalItems ? "Done" : "Next"}
          btnColor={
            currentPage === totalItems ? "bg-green-500" : "gradientBtnColor"
          }
          onHandleClick={() => setCurrentPage(currentPage + 1)}
        >
          {" "}
          <i
            className={`ml-2 fa-solid ${currentPage === totalItems ? "fa-check" : "fa-arrow-right"}`}
          ></i>
        </Button>
      </div>
    ))
  );
}
