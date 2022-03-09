import { useState } from "react";
import moment from "moment";
import CommentOptions from "./CommentOptions";

function Comment({ comment }) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  function toggleOptions() {
    setShowOptions(!showOptions);
  }

  return (
    <div className="grid grid-cols-10 my-1.5 w-full px-2 relative">
      {/* author picture */}
      {comment.author.picture ? (
        <img
          src={`http://localhost:3000/uploads/images/${comment.author.picture}`}
          alt=""
          className="rounded-full inline h-8 mx-1"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          fill="#818181"
          className="inline mx-1 col-span-1 mt-0.5"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
      )}

      {/* user name & comment */}
      <div className="flex flex-col col-span-9 relative">
        <div className=" mx-2 bg-[#f3f3f3] p-2 rounded-lg">
          <p className="text-mxs font-bold pr-1">
            {comment.author.firstName} {comment.author.lastName}
          </p>
          <p className="text-mxs">{comment.text}</p>

          {/* options */}
          <button
            className="absolute top-1 right-3"
            title="Options"
            onClick={toggleOptions}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              className="fil-[#65676b] inline"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>

          {/* options dropdown */}
          <CommentOptions
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            author={comment.author}
          />
        </div>

        {/* actions */}
        <div className="mx-2 inline">
          {/* upvote */}
          <button title="Upvote Comment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              fill={upvoted ? "#0F8CFF" : "#484848"}
              className="inline mx-1"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <path
                d="M32,120l96-96,96,96H176v88a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V120Z"
                fill={upvoted ? "#0F8CFF" : "none"}
                stroke={upvoted ? "#0F8CFF" : "#484848"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></path>
            </svg>
          </button>

          <span className="text-mxs">
            {comment.upvotes.length - comment.downvotes.length}
          </span>

          {/* downvote */}
          <button title="Downvote Comment">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              fill={downvoted ? "red" : "#484848"}
              className="inline mx-1"
              viewBox="0 0 256 256"
            >
              <rect width="256" height="256" fill="none"></rect>
              <path
                d="M32,136l96,96,96-96H176V48a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v88Z"
                fill={downvoted ? "red" : "none"}
                stroke={downvoted ? "red" : "#484848"}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              ></path>
            </svg>
          </button>

          <button className="text-mxs mx-2 hover:underline">Reply</button>

          {/* timestamp */}
          <span className="text-xs text-secondary mx-2">
            {moment(comment.timestamp).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
