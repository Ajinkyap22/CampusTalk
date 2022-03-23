function UserModal({ user, hovering }) {
  return (
    <div
      className="absolute top-8 left-0 p-2 bg-white dark:bg-secondary shadow-base rounded"
      hidden={!hovering}
    >
      {/* picture and name */}
      <div className="flex items-center relative">
        {/* picture */}
        {user.picture ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            fill="#818181"
            className="inline mx-1 h-10 fill-[#818181] dark:fill-darkLight"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        ) : (
          <img
            src={`http://localhost:3000/uploads/images/${user.picture}`}
            alt=""
            className="rounded-full inline h-10 mx-1"
          />
        )}

        {/* name */}
        <span className="text-sm text-justify mx-1 dark:text-darkLight">
          {user.firstName} {user.lastName}
        </span>
      </div>
    </div>
  );
}

export default UserModal;
