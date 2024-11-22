import { useState } from "react";

export default function Input({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  className,
  required,
}) {
  const [isPasswordOpen, setPasswordOpen] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordOpen(!isPasswordOpen);
  };

  return (
    <>
      <div className={`mb-4 w-full relative ${className}`}>
        <label
          className="ml-2 text-base sm:text-lg md:text-xl capitalize"
          htmlFor={name}
        >
          {label ? label : name.toUpperCase()}
        </label>

        {type === "password" ? (
          <>
            <input
              type={!isPasswordOpen ? "text" : type}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required ? required : false}
              className={`mt md:mt-2 w-full p-1.5 md:p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring`}
            />
            <i
              className={`fa-solid ${
                isPasswordOpen ? "fa-eye-slash" : "fa-eye"
              } text-gray-600 absolute top-[60%] right-5 cursor-pointer`}
              onClick={togglePasswordVisibility}
            ></i>
          </>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required ? required : false}
            className={`mt md:mt-2 w-full p-1.5 md:p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring`}
          />
        )}
      </div>
    </>
  );
}

export function TextArea({
  label,
  className,
  rows,
  cols,
  value,
  required,
  onChange,
}) {
  return (
    <>
      <label className="ml-2 text-base sm:text-lg md:text-xl capitalize">
        {label}
      </label>
      <textarea
        className={`mt md:mt-2 w-full p-1.5 md:p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring ${className}`}
        rows={rows ? rows : "7"}
        cols={cols ? cols : "50"}
        value={value}
        onChange={onChange}
        required={required ? required : false}
      ></textarea>
    </>
  );
}

export function FileUpload({ label, className, content, required, onChange }) {
  return (
    <>
      <label
        htmlFor={label.replace(" ", "_")}
        className={`cursor-pointer p-2 border-2 border-orange-700 rounded-md text-orange-700 font-semibold relative after:absolute after:right-0 after:top-10 ${
          content === "poster" &&
          "after:content-['pdf,png,jpeg'] after:tracking-wider after:ml-0.5 after:text-gray-500 after:font-normal"
        } ${className}`}
      >
        <i className="fa-solid fa-upload mr-2"></i>
        {label}
      </label>
      <input
        type="file"
        id={label.replace(" ", "_")}
        name={label.replace(" ", "_")}
        className="hidden"
        required={required ? required : false}
        onChange={onChange}
      />
    </>
  );
}

export function Select({
  label,
  name,
  value,
  onChange,
  options,
  className,
  required,
}) {
  return (
    <div className={`mb-4 w-full relative ${className}`}>
      <label
        className="ml-2 text-base sm:text-lg md:text-xl capitalize"
        htmlFor={name}
      >
        {label ? label : name.toUpperCase()}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt md:mt-2 w-full p-1.5 md:p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring"
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
