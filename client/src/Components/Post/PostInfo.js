import { UserContext } from "../../Contexts/UserContext";
import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import moment from "moment";
import Options from "./Options";
import UserModal from "../UserModal";

function PostInfo({ postId, author, forum, timestamp, anonymous, important }) {
  const [user] = useContext(UserContext);
  const [showOptions, setShowOptions] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // check if author is the same as user
    if (user && user._id === author._id) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }, [user, author]);

  useEffect(() => {
    if (forum.moderators.includes(user._id)) {
      setIsModerator(true);
    } else {
      setIsModerator(false);
    }
  }, [forum.moderators, user]);

  function handleHover() {
    setHovering(true);
  }

  function handleLeave() {
    setHovering(false);
  }

  function toggleOptions() {
    setShowOptions(!showOptions);
  }

  return (
    <div className="flex my-1 px-2 w-full max-w-[32rem] relative">
      {/* user profile pic */}
      {anonymous || !author.picture ? (
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
          src={`http://localhost:3000/uploads/images/${author.picture}`}
          alt=""
          className="rounded-full inline h-10 mx-1"
        />
      )}
      <div className="mx-1 relative">
        {/* user name */}
        <span
          className="text-sm dark:text-darkLight"
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
        >
          {anonymous ? " Anonymous" : `${author.firstName} ${author.lastName}`}
        </span>

        <svg
          width="16"
          viewBox="0 0 16 16"
          className="inline"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.1844 7.71093L5.23437 2.57968C5.0125 2.38906 4.6875 2.56093 4.6875 2.86875V13.1312C4.6875 13.4391 5.0125 13.6109 5.23437 13.4203L11.1844 8.28906C11.3547 8.14218 11.3547 7.85781 11.1844 7.71093Z"
            className="fill-[#484848] dark:fill-darkLight"
          />
        </svg>

        {/* forum name */}
        <Link
          to={`/forums/${forum._id}/`}
          className="mx-1 text-sm hover:underline dark:text-darkLight"
        >
          {forum.forumName}
          {/* important */}
          {important && (
            <svg
              width="20"
              viewBox="0 0 20 20"
              fill="#027bff"
              className="inline ml-1 rotate-90"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.9165 15.825L12.0832 15.8333C12.6415 15.8333 13.1415 15.5583 13.4415 15.1333L17.0832 9.99999L13.4415 4.86666C13.1415 4.44166 12.6415 4.16666 12.0832 4.16666L2.9165 4.17499L6.94984 9.99999L2.9165 15.825Z" />
            </svg>
          )}
        </Link>

        {/* post options */}
        <button
          className="absolute top-0 right-[-6px] dropDownToggle"
          onClick={toggleOptions}
          title="Options"
          hidden={!isAuthor && !isModerator}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            className="fil-slate-400 inline dropDownToggle dark:fill-darkLight"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        </button>

        {/* dropdown */}
        <Options
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          isAuthor={isAuthor}
          postId={postId}
          forum={forum}
        />

        {/* date */}
        <p className="text-xs text-secondary dark:text-gray-300">
          {moment(timestamp).fromNow()}
        </p>
      </div>

      <UserModal hovering={hovering} user={author} />
    </div>
  );
}

export default PostInfo;
