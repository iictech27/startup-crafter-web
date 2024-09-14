import SelectInput from "./SelectInput";
import { Tooltip } from "react-tooltip";
import { profile_options } from "../../constants/index";
import { location_options } from "../../constants/index";
import { duration_options } from "../../constants/index";
import { useState, useEffect, useRef } from "react";

const checkboxes = [
  {
    title: "Internship with job offer",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed neque et nibh ullamcorper tincidunt.",
  },
  {
    title: "Fast response",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed neque et nibh ullamcorper tincidunt.",
  },
  {
    title: "Early applicant",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed neque et nibh ullamcorper tincidunt.",
  },
  {
    title: "Jobs from women",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed neque et nibh ullamcorper tincidunt.",
  },
];

export default function FilterBox() {
  const [isFilterBoxOpen, setIsFilterBoxOpen] = useState(false);
  const [isMoreFilterOpen, setMoreFilterOpen] = useState(false);

  const toggleFilterBox = () => {
    setIsFilterBoxOpen(!isFilterBoxOpen);
  };

  const toggleMoreFilter = () => {
    setMoreFilterOpen(!isMoreFilterOpen);
  };

  // const [isFilterBoxFixed, setFilterBoxFixed] = useState(false);
  // const filterBoxRef = useRef(null);

  // const fixFilterBox = () => {
  //   let viewport = window.innerHeight;
  //   let contentHeight = filterBoxRef.current.getBoudingClientRect().height;
  //   if (window.scrollY >= contentHeight - viewport) {
  //     setFilterBoxFixed(true);
  //   } else {
  //     setFilterBoxFixed(false);
  //   }
  // };
  // useEffect(() => {
  //   window.addEventListener("scroll", fixFilterBox);
  // }, []);

  return (
    <div
      className={`form_container w-full h-auto bg-white px-4 py-2 lg:p-8 border rounded-xl font-inter shadow-md z-10`}
    >
      <div className="filterUi flex justify-center items-center gap-x-2 mb-0 lg:mb-4">
        <i className="fa-solid fa-filter hidden lg:block"></i>
        <span id="filter_ui" className="text-xl font-semibold hidden lg:block">
          Filters
        </span>
        <button
          className="flex justify-center items-center lg:hidden"
          onClick={toggleFilterBox}
        >
          <i className="fa-solid fa-filter"></i>
          <span id="filter_ui" className="text-xl font-semibold">
            Filters
          </span>
        </button>
      </div>

      <form className={`${isFilterBoxOpen ? "block" : "hidden"} lg:block`}>
        <div className="flex items-center gap-x-2 mb-4">
          <input type="checkbox" className="cursor-pointer" />
          <span className="text-md font-semibold">
            As per my <span className="text-btnColor">preferences</span>
          </span>
        </div>
        <SelectInput
          title="Profile"
          options={profile_options}
          placeholder="e.g. Web Development"
        />
        <SelectInput
          title="Location"
          options={location_options}
          placeholder="e.g. Delhi"
        />
        <div className="filters_checkboxes_containers mb-4">
          <span className="text-md font-semibold">Work Type</span>
          <div className="mt-1">
            <div className="checkbox">
              <input
                type="checkbox"
                className="cursor-pointer"
                name="work_from_home"
                id="work_from_home"
              />
              <label className="ml-2" htmlFor="work_from_home">
                Work from home
              </label>
            </div>
          </div>
          <div className=" htmlForm-group flex-row" id="part_time_check_box">
            <div className="checkbox">
              <input
                type="checkbox"
                className="cursor-pointer"
                id="part_time"
                name="part_time"
              />
              <label className="ml-2" htmlFor="part_time">
                Work from office
              </label>
            </div>
          </div>
          <div className=" htmlForm-group flex-row" id="part_time_check_box">
            <div className="checkbox">
              <input
                type="checkbox"
                className="cursor-pointer"
                id="part_time"
                name="part_time"
              />
              <label className="ml-2" htmlFor="part_time">
                Hybrid
              </label>
            </div>
          </div>
        </div>
        <div
          className="stipend_filter_container mb-4 flex flex-col gap-y-2"
          id="stipend_filter_container"
        >
          <label>Desired minimum monthly stipend (₹)</label>
          <input
            type="range"
            min="0"
            max="12"
            step="2"
            defaultValue="0"
            id="stipend_slider"
            className="slider w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:w-3.5
            [&::-webkit-slider-thumb]:h-3.5
            [&::-webkit-slider-thumb]:-mt-0.5
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:bg-blue-600
            [&::-webkit-slider-thumb]:border-1
            [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(37,99,235,1)]
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:duration-150
            [&::-webkit-slider-thumb]:ease-in-out

            [&::-moz-range-thumb]:w-3.5
            [&::-moz-range-thumb]:h-3.5
            [&::-moz-range-thumb]:appearance-none
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-1
            [&::-moz-range-thumb]:border-white
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:transition-all
            [&::-moz-range-thumb]:duration-150
            [&::-moz-range-thumb]:ease-in-out

            [&::-webkit-slider-runnable-track]:w-full
            [&::-webkit-slider-runnable-track]:h-2
            [&::-webkit-slider-runnable-track]:bg-gray-200
            [&::-webkit-slider-runnable-track]:rounded-full

            [&::-moz-range-track]:w-full
            [&::-moz-range-track]:h-2
            [&::-moz-range-track]:bg-gray-100
            [&::-moz-range-track]:rounded-full"
          />
          <div
            id="stipend_values_container"
            className="stipend_values_container flex justify-between"
          >
            <div className="stipend_value small-text value_0 selected_stipend_value">
              0{" "}
            </div>
            <div className="stipend_value small-text value_2000 ">2K </div>
            <div className="stipend_value small-text value_4000 ">4K </div>
            <div className="stipend_value small-text value_6000 ">6K </div>
            <div className="stipend_value small-text value_8000 ">8K </div>
            <div className="stipend_value small-text value_10000 ">10K </div>
            <div className="stipend_value value_last"></div>
          </div>
        </div>

        <div
          id="filter_toggle"
          className="filter_toggle mb-4 text-btnColor font-semibold"
          onClick={toggleMoreFilter}
        >
          <span className="cursor-pointer">
            {isMoreFilterOpen ? (
              <span>
                View less filters <i className="fa-solid fa-angle-up"></i>
              </span>
            ) : (
              <span>
                View more filters <i className="fa-solid fa-angle-down"></i>
              </span>
            )}
          </span>
        </div>

        {isMoreFilterOpen && (
          <div className="more_filters mb-4">
            <div className="mb-2" id="start_date_container">
              <label htmlFor="start_date" className="font-semibold">
                Starting from (or after)
              </label>
              <div className="optionsContainer">
                <div
                  className="datepicker_wrapper custom_datepicker"
                  id="start_date_pseudo"
                >
                  <input
                    type="date"
                    className="w-full mt-1 border px-2 py-1.5 rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="start_date"
                    name="start_date"
                    min={new Date().toJSON().slice(0, 10)}
                    placeholder="Choose date"
                  />
                </div>
              </div>
            </div>
            <SelectInput
              title="Max. duration (months)"
              options={duration_options}
              placeholder="Choose duration"
            />
            <div className="checkbox_container">
              {checkboxes.map((checkbox) => (
                <div className="checkbox flex items-center gap-x-2 mb-2 relative">
                  <input type="checkbox" className="cursor-pointer" />
                  <label>{checkbox.title}</label>

                  <button
                    data-tooltip-id="details_tooltip"
                    type="button"
                    className="text-black border border-gray-500 size-4 font-medium rounded-full text-center text-gray-500 text-xs"
                  >
                    ?
                  </button>

                  <Tooltip
                    id="details_tooltip"
                    content={checkbox.details}
                    style={{ width: "20rem", borderRadius: "10px" }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="reset_link_container flex justify-end text-btnColor font-semibold">
          <a className="reset_link_desktop cursor-pointer" id="reset_link">
            Clear all
          </a>
        </div>
      </form>
    </div>
  );
}
