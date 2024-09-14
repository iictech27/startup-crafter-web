import Input, { TextArea } from "../form/Input";

export default function Stage({ stageNo, className, children }) {
  return (
    <div
      className={`stage grid grid-cols-2 gap-4 bg-white mt-4 p-4 ${className}`}
    >
      <span className="capitalize text-md text-gray-600">
        stage {stageNo} info
      </span>
      <Input label="title" className="col-span-2" />
      <TextArea label="description" className="col-span-2" />
      <Input label="starting date" type="date" />
      <Input label="ending date" type="date" />
      {children}
    </div>
  );
}
