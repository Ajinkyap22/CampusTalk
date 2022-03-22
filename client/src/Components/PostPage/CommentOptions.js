import { useEffect, useRef, useContext, useState } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { PostContext } from "../../Contexts/PostContext";
import { Link } from "react-router-dom";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";
import axios from "axios";

function CommentOptions({
  forumId,
  postId,
  commentId,
  showOptions,
  setShowOptions,
  comments,
  setComments,
  isAuthor,
  user,
  setUser,
  isModerator,
}) {
  const wrapperRef = useRef(null);
  const [posts, setPosts] = useContext(PostContext);

  useOutsideAlerter(wrapperRef, setShowOptions);

  function deleteComment() {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .delete(
        `/api/forums/${forumId}/posts/${postId}/comments/${commentId}/delete-comment`,
        headers
      )
      .then((res) => {
        // update user's comments
        setUser({
          ...user,
          comments: user.comments.filter(
            (comment) => comment._id !== commentId
          ),
        });

        // updates posts
        setPosts(
          posts.map((post) => (post._id === postId ? res.data.post : post))
        );

        // update comments
        setComments(comments.filter((comment) => comment._id !== commentId));

        setShowOptions(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div
      ref={wrapperRef}
      className="absolute bg-white dark:bg-darkSecondary shadow-base p-1.5 top-7 right-0 rounded z-10"
      hidden={!showOptions}
    >
      <ul>
        {/* delete comment */}
        <li
          className="p-1.5 text-sm dark:text-darkLight"
          hidden={!isAuthor && !isModerator}
          onClick={deleteComment}
        >
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
            Delete Comment
          </button>
        </li>
      </ul>
    </div>
  );
}

export default CommentOptions;
