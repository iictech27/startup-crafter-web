const styles = {
  paragraph: "font-inter font-normal text-md sm:text-xl",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",
  flexBetween: "flex justify-between items-center",

  paddingX: "sm:px-20 px-8",
  paddingY: "sm:py-12 py-4",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "mx-auto",
  marginY: "sm:my-16 my-6",

  section: "w-[85vw] flex flex-col",
  section2: "w-[80vw] flex flex-col lg:flex-row",
  section3: "w-[70vw] md:w-[50vw] flex flex-col",

  sectionHead: "px-4 text-5xl sm:text-6xl lg:text-7xl font-bold",
  sectionHead2:
    "px-4 text-4xl sm:text-6xl lg:text-7xl font-bold capitalize text-center relative z-10",
  signHead:
    "font-inria text-3xl sm:text-5xl md:text-6xl font-semibold text-center md:text-left",

  sectionSubHead: "text-xl sm:text-2xl md:text-3xl text-center relative z-10",

  sectionFooter:
    "after:content-[''] after:absolute after:-bottom-6 after:left-[50%] after:translate-x-[-50%] after:-translate-y-6 after:block after:w-[25%] sm:after:w-[20%] md:after:w-[10%] after:h-1.5 md:after:h-2.5 after:rounded-md after:bg-gray-300",

  activePage:
    "inline-block mr-4 text-xl size-8 rounded-full bg-pink-600 font-semibold text-center text-white cursor-pointer",
  nonActivePage:
    "inline-block mr-4 text-xl size-8 rounded-full font-semibold text-center text-black",
};

export default styles;
