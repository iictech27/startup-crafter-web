export default function Card({ children, img, className }) {
  return (
    <div
      className={`lg:max-w-[25vw] mx-auto lg:h-auto flex flex-col justify-between gap-y-4 shadow-md ${className ? className : "p-8 rounded-xl"} cursor-pointer hover:shadow-lg hover:-translate-y-2 transition ease-in-out`}
    >
      <img
        src={img}
        alt={`image ${img}`}
        className="w-full h-[16rem] object-cover rounded-xl"
      />
      {children}
    </div>
  );
}
export function LoadingCard({ children, index }) {
  return (
    <div
      className="w-[75vw] sm:w-[35vw] lg:w-[25vw] lg:h-auto flex flex-col gap-y-4 rounded-xl shadow-md p-8 cursor-pointer hover:shadow-lg hover:-translate-y-2 transition ease-in-out animate-pulse"
      key={index}
    >
      <div className="w-full h-56 rounded-xl bg-gray-300"></div>

      {children}
    </div>
  );
}
