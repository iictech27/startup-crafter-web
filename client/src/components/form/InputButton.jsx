export default function InputButton({ title, btnColor, icon }) {
  return (
    <div className="w-full text-center">
      <button
        type="submit"
        className={`flex justify-center w-full rounded-md p-1 sm:p-2 ${
          btnColor ? btnColor : "bg-blue-700"
        } ${
          btnColor === "bg-transparent" ? "border text-black" : "text-white"
        } font-semibold capitalize`}
      >
        {icon && <img src={icon} alt="icon" className="mr-3 w-6 h-6" />}
        {title}
      </button>
    </div>
  );
}
