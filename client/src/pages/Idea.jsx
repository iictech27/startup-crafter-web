import curveLineVector from "../assets/vectors/curveLineVector.png";
import idea_submit from "../assets/images/idea_submit-cropped.svg";
import styles from "../style.js";
import Input, { TextArea } from "../components/form/Input";
import { Button } from "../components";

export default function Idea() {
  return (
    <>
      <div className="w-full flex flex-col bg-indigo-200">
        <div className="flex flex-col justify-center items-center gap-y-6">
          <div className="heading relative mt-6">
            <h1 className="text-4xl text-center font-imprima font-bold tracking-wider capitalize">
              <span className="text-blue-600">submit your </span>creative ideas
            </h1>
            <img
              src={curveLineVector}
              alt="curve_line"
              className="hidden md:block absolute top-[100%] left-[35%] translate-x-[35%] translate-y-[50%]"
            />
          </div>
          <div className="flex flex-col md:flex-row w-full p-6">
            <div className="basis-1/2">
              <img
                src={idea_submit}
                alt="idea_submit"
                className="w-full h-full"
              />
            </div>
            <div className="basis-1/2">
              <form className="p-6 flex flex-col gap-y-5">
                <Input type="text" label="title" />
                <TextArea label="description" />
                <Input type="text" label="document link/ppt link" />
                <Input type="text" label="QA" />
                <Button title="submit" btnColor="bg-blue-900" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
