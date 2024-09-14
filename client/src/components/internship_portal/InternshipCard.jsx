import { Link } from "react-router-dom";
import Button from "../Button";

export default function InternshipCard() {
  return (
    <div className="card w-full bg-[#EEF5FC] rounded-2xl flex flex-col gap-y-6 p-4 shadow-md mb-6">
      <div id="top" className="flex flex-wrap justify-between items-center">
        <div className="font-inter font-semibold">
          <h2 className="text-xl md:text-2xl">Graphic Design</h2>
          <span className="text-base md:text-lg text-gray-500">
            Fluraa Essence
          </span>
        </div>
        <div className="font-inria font-semibold">
          <span>Posted 2 days ago</span>
        </div>
        <div className="font-inter font-semibold text-blue-500">
          <span>View details</span>
        </div>
      </div>
      <div id="mid" className="flex flex-wrap justify-between items-center">
        <div className="basis-2/4 flex justify-between gap-y-4 gap-x-6 sm:gap-x-10 lg:gap-x-20 items-center text-sm sm:text-base">
          <div>
            <h4 className="uppercase font-semibold text-gray-500">
              start date
            </h4>
            <span className="mt-3 capitalize">immediately</span>
          </div>
          <div>
            <h4 className="uppercase font-semibold text-gray-500">duration</h4>
            <span className="mt-3 capitalize">6 months</span>
          </div>
          <div>
            <h4 className="uppercase font-semibold text-gray-500">stipend</h4>
            <span className="mt-3 capitalize">₹ 5000/month</span>
          </div>
        </div>
        <Link to="/user-login" className="hidden sm:block">
          <Button title="Apply now" />
        </Link>
      </div>
      <div
        id="bottom"
        className="w-1/2 flex gap-y-3 gap-x-3 md:gap-x-0 items-center justify-between"
      >
        <Button title="Work from home" small btnColor="bg-gray-400" />
        <Button title="Internship" small btnColor="bg-gray-400" />
        <Button title="Part time" small btnColor="bg-gray-400" />
      </div>
      <Link to="/user-login" className="sm:hidden self-end">
        <Button title="Apply now" />
      </Link>
    </div>
  );
}
