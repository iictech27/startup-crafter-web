export default function ProgressBar({ progress }) {
  return (
    <div className="progress_bar relative z-10 w-full flex justify-evenly items-center text-xl">
      <span>{progress}% completed</span>
      <div className="w-2/3 bg-gray-200 rounded-full border border-l-0 border-black">
        <div className="gradientBtnColor text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-[1%] h-6"></div>
      </div>
    </div>
  );
}
