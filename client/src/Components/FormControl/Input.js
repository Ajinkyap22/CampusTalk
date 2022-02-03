function Input({
  type,
  placeholder = "",
  name,
  label,
  callback,
  minLength = 0,
  required,
}) {
  return (
    <div className="my-4 relative">
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
    </div>
  );
}

export default Input;
