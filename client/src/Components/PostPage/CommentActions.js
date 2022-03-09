import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../Contexts/UserContext";
import moment from "moment";
import axios from "axios";

function CommentActions({ comment, setComments, forumId, postId }) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (!user) return;
    // check if post is upvoted
    comment.upvotes.indexOf(user._id) !== -1
      ? setUpvoted(true)
      : setUpvoted(false);
    // check if post is downvoted
    comment.downvotes.indexOf(user._id) !== -1
      ? setDownvoted(true)
      : setDownvoted(false);
  }, [user, comment.upvotes, comment.downvotes]);

  function handleUpvote() {
    if (!user) return;

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    if (upvoted) {
    } else {
    }
  }

  function updateComments(data) {
    setComments((prevState) =>
      prevState.map((c) => (data._id === c._id ? data : c))
    );
  }

  return (
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
  );
}

export default CommentActions;
