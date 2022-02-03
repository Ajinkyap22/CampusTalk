import { useEffect, useState } from "react";

function FormControl({
  type,
  placeholder = "",
  name,
  label,
  callback,
  minLength = 0,
  required,
}) {
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (type === "password") {
      type = showPassword;
    }
  }, [type, showPassword]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="my-4">
      <label htmlFor={name} className="text-xs lg:text-sm 2xl:text-lg">
        {label}{" "}
        <span className="text-red-600" hidden={required ? false : true}>
          *
        </span>
      </label>
      <input
        type={type}
        name={name}
        onChange={(e) => callback(e.target.value)}
        placeholder={placeholder}
        className="mt-2 block w-full px-3 py-1.5 border border-gray-300 bg-[#f6f6f6] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm placeholder-[#818181] 
              focus:outline-none focus:border-sky-500"
        minLength={minLength}
        required={required}
      />

      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-auto absolute"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fillRule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clipRule="evenodd"
        />
      </svg> */}
    </div>
  );
}

export default FormControl;
