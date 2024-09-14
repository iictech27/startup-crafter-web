import { useNavigate } from "react-router-dom";

export default function PageMarker({ children }) {
  const navigate = useNavigate();
  return (
    <div className="absolute bg-black/70 top-0 left-0 w-max px-2 py-2 my-2 mx-6 text-base md:text-xl font-normal lg:font-semibold text-white drop-shadow-xl">
      {/* <span onClick={() => navigate(-1)} className="cursor-pointer">
        Study Materials {">"}
      </span> */}
      <span className="capitalize">{children}</span>
    </div>
  );
}
