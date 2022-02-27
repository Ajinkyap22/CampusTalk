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
            <img
              src={`http://localhost:3000/uploads/${member.picture}`}
              className="rounded-full object-cover w-10 h-auto inline mx-2"
              alt=""
            />
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
