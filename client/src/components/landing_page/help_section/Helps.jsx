import styles from "../../../style";
import { helps } from "../../../constants/index.js";

export default function Helps() {
  return (
    <>
      {helps.map((help, index) => (
        <div
          key={index}
          className={`flex flex-col-reverse ${help.id % 2 ? "lg:flex-row" : "lg:flex-row-reverse"} justify-between items-center relative`}
        >
          <div className="flex justify-center items-center w-full md:w-1/2">
            <img
              src={help.image}
              alt="help"
              className="w-[36rem] md:w-[50rem] h-[25rem] md:h-[38rem] object-contain"
            />
          </div>
          <div className="w-full lg:w-1/2 p-6 sm:p-10 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-inknut font-bold capitalize underline decoration-primary decoration-4 underline-offset-8">
              {help.title}
            </h1>
            <p
              className={`mt-4 ${styles.paragraph} mx-auto lg:mx-0 w-full md:w-3/4`}
            >
              {help.description}
            </p>
          </div>
          {help.svg && (
            <img
              src={help.svg}
              alt="svg"
              className={`hidden lg:block absolute left-[40%] ${help.id % 2 ? "h-[15vw] top-[70%]" : "h-[15vw] top-[65%]"} z-10`}
            />
          )}
        </div>
      ))}
    </>
  );
}
