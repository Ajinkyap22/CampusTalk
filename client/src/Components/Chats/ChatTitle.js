function ChatTitle({ receiver }) {
  return (
    <div className="w-full sticky top-0 bg-primary-light flex justify-between items-center p-3 border-b border-primary-light">
      {/* picture and name */}
      <div className="flex items-center">
        {/* picture */}
        {receiver && receiver.picture ? (
          <img
            src={`http://localhost:3000/uploads/images/${receiver.picture}`}
            className="rounded-full object-cover w-9 h-auto inline mx-2"
            alt=""
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline mx-2 w-10 align-middle fill-[#818181] dark:fill-darkLight"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        )}

        {/* name */}
        <span className="text-justify mx-1 text-white dark:text-darkLight">
          {receiver && receiver.firstName} {receiver && receiver.lastName}
        </span>
      </div>

      {/* options */}
      <button className="mr-2" title="Options">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          className="fill-white inline rotate-90"
          viewBox="0 0 16 16"
        >
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
        </svg>
      </button>
    </div>
  );
}

export default ChatTitle;
