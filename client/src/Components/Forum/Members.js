function Members({ members }) {
  return (
    <div className="bg-white shadow-base min-w-[32rem] rounded">
      {members.map((member, i) => (
        <div
          className="flex border-b justify-between items-center w-full p-2.5"
          key={i}
        >
          <div className="mr-2">
            {/* image */}
            {member.picture ? (
              <img
                src={`http://localhost:3000/uploads/images/${member.picture}`}
                className="rounded-full object-cover w-10 h-auto inline mx-2"
                alt=""
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#818181"
                className="inline mx-2 w-10 align-middle"
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
            <span className="text-sm text-justify mx-1">
              {member.firstName} {member.lastName}
            </span>
          </div>

          {/* button */}
          <button className="bg-primary-light text-sm text-white px-2.5 py-1.5 mx-2 rounded-full hover:bg-blue-700">
            Messsage
          </button>
        </div>
      ))}
    </div>
  );
}

export default Members;
