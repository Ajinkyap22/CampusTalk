import { useEffect, useRef, useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import axios from "axios";

function useOutsideAlerter(ref, setShowDropdown) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function Options({ postId, showOptions, setShowOptions, author }) {
  const wrapperRef = useRef(null);
  const [user] = useContext(UserContext);
  const [isAuthor, setIsAuthor] = useState(false);
  useOutsideAlerter(wrapperRef, setShowOptions);

  useEffect(() => {
    // check if author is the same as user
    if (user && user._id === author._id) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  }, [user, author]);

  function deletePost() {}

  return (
    <div
      ref={wrapperRef}
      className="absolute bg-white shadow-base p-1.5 top-7 right-0 rounded"
      hidden={!showOptions}
    >
      <ul>
        {/* edit post */}
        <li className="p-1.5 text-sm" hidden={!isAuthor}>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              fill="#818181"
              className="inline mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
            Edit Post
          </button>
        </li>
        <hr hidden={!isAuthor} />

        {/* delete post */}
        <li className="p-1.5 text-sm" hidden={!isAuthor} onClick={deletePost}>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              fill="#818181"
              className="inline mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
            Delete Post
          </button>
        </li>
        <hr hidden={!isAuthor} />

        {/* save post */}
        <li className="p-1.5 text-sm">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              className="inline mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#818181"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            Save Post
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Options;
