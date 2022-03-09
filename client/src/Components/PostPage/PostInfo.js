import { useState } from "react";
import moment from "moment";
import Options from "../Post/Options";

function PostInfo({ post }) {
  const [showOptions, setShowOptions] = useState(false);

  function toggleOptions() {
    setShowOptions(!showOptions);
  }
  return (
    <div className="my-1 px-2 w-full max-w-[32rem] relative">
      {/* forum name */}
      <p
        to={`/forums/${post.forum._id}`}
        className="p-1 py-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:border-gray-300 rounded-lg"
      >
        {post.forum.forumName}
      </p>
      <hr />

      <div className="flex w-full my-1 py-1 relative">
        {/* user profile pic */}
        {post.anonymous || !post.author.picture ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            fill="#818181"
            className="inline mx-1 h-10"
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
            src={`http://localhost:3000/uploads/images/${post.author.picture}`}
            alt=""
            className="rounded-full inline h-10 mx-1"
          />
        )}

        <div className="inline mx-1 relative w-full">
          {/* user name */}
          <span className="text-sm mx-1">
            {post.anonymous
              ? " Anonymous"
              : `${post.author.firstName} ${post.author.lastName}`}
          </span>

          {/* post options */}
          <button
            className="absolute top-0 right-0"
            title="Options"
            onClick={toggleOptions}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              className="fil-[#65676b] inline rotate-90"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>

          {/* dropdown */}
          <Options
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            author={post.author}
            postId={post._id}
            forum={post.forum}
          />

          {/* date */}
          <p className="text-xs text-secondary">
            {moment(post.timestamp).fromNow()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PostInfo;
