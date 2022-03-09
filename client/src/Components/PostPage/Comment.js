import { useState } from "react";
import CommentOptions from "./CommentOptions";
import CommentFile from "./CommentFile";
import CommentActions from "./CommentActions";

function Comment({ comment, forumId, postId, comments, setComments }) {
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
            forumId={forumId}
            postId={postId}
            commentId={comment._id}
            comments={comments}
            setComments={setComments}
          />
        </div>

        {/* file */}
        <CommentFile
          file={comment.file}
          type={comment.type}
          setComments={setComments}
          forumId={forumId}
          postId={postId}
        />

        {/* actions */}
        <CommentActions comment={comment} />
      </div>
    </div>
  );
}

export default Comment;
