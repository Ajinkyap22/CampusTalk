import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";

function Members({
  members,
  moderators,
  removeMember,
  makeModerator,
  dismissModerator,
}) {
  const [moderatorsList, setModeratorsList] = useState({});
  const [user, setUser] = useContext(UserContext);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // create a hashmap of moderators
    let moderatorsHashMap = {};

    moderators.forEach((moderator) => {
      moderatorsHashMap[moderator] = true;
    });

    // update the state
    setModeratorsList(moderatorsHashMap);
  }, []);

  return (
    <div className="bg-white shadow-base min-w-[32rem] rounded">
      {members.map((member, i) => (
        <div
          className="flex border-b justify-between items-center w-full p-2.5"
          key={i}
        >
          <div className="flex items-center">
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

            {moderatorsList[member._id] && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="#0F8CFF"
                className="inline mx-2"
                viewBox="0 0 16 16"
                // check if the user is a moderator
                hidden={moderatorsList[member._id] ? false : true}
              >
                <path
                  fillRule="evenodd"
                  d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
                />
              </svg>
            )}
          </div>

          {/* make moderator */}
          {moderatorsList[user._id] && member._id !== user._id && (
            <div className="flex items-center">
              {moderatorsList[member._id] ? (
                <button
                  className="border border-primary-light p-1 px-2 text-xs rounded-full text-primary mx-1 hover:bg-primary hover:text-white"
                  onClick={() => dismissModerator(member)}
                >
                  Dismiss Moderator
                </button>
              ) : (
                <button
                  onClick={() => makeModerator(member)}
                  className="border border-primary-light p-1 px-2 text-xs rounded-full text-primary mx-1 hover:bg-primary hover:text-white"
                >
                  Make Moderator
                </button>
              )}

              {/* remove member */}
              <button
                className="border border-red-500 p-1 px-1.5 rounded-full text-xs text-red-500 mx-1 hover:bg-red-500 hover:text-white"
                onClick={() => removeMember(member)}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Members;
