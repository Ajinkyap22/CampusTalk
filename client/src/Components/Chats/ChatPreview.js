function ChatPreview() {
  return (
    <div className="flex border-b justify-between items-center w-full p-2.5 dark:border-light">
      {/* picture and name */}
      <div className="flex items-center">
        {/* picture */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#818181"
          className="inline mx-2 w-10 align-middle fill-[#818181] dark:fill-darkLight"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>

        {/* name */}
        <div className="flex flex-col justify-center">
          <span className="text-sm text-justify mx-1 dark:text-darkLight">
            Little Lord Fuckleroy
          </span>

          <span className="text-xs text-secondary text-justify mx-1 dark:text-darkLight">
            You : Little Lord Fuckleroy
          </span>
        </div>
      </div>

      {/* timestamp */}
      <span className="text-sm text-justify text-secondary mx-1">08.00 PM</span>
    </div>
  );
}

export default ChatPreview;
