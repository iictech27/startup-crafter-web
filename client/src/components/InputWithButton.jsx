import Button from "./Button";

export default function InputWithButton1({ btnTitle, placeholder }) {
  return (
    <div className="md:mt-6 ml-2 md:-ml lg:-ml-2 sm:w-2/4 lg:w-8/12 relative">
      <input
        type="text"
        className={`hidden md:block bg-inputBg rounded-2xl md:rounded-3xl px-4 sm:py-3 md:px-6 md:py-4 w-full outline-none font-inter shadow-md md:shadow-xl text-sm md:text-base`}
        placeholder={placeholder}
      />
      <Button title={btnTitle} absolute responsiveBtn />
    </div>
  );
}
export function InputWithButton2({ btnTitle, placeholder }) {
  return (
    <div className="md:mt-6 w-full relative">
      <i className="fa-solid fa-magnifying-glass absolute top-4 sm:top-5 left-3 sm:left-5 text-gray-700"></i>
      <input
        type="text"
        className={`bg-white rounded-2xl md:rounded-3xl px-10 sm:px-6 py-3 md:px-12 md:py-4 w-full outline outline-indigo-200 font-inter text-sm md:text-base focus:outline-indigo-200`}
        placeholder={placeholder}
      />
      <Button title={btnTitle} btnColor="gradientBtnColor" absolute />
    </div>
  );
}
