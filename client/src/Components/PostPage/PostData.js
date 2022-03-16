import { useState, useEffect } from "react";
import PostActions from "../Post/PostActions";
import PostInfo from "./PostInfo";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import axios from "axios";
import "./PostData.css";

function PostData({ post }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (post.comments) {
      axios
        .get(`/api/forums/${post.forum._id}/posts/${post._id}/comments`)
        .then((res) => {
          // only keep the comments that in the post's comments array
          setComments(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <section className="postData sticky top-0 max-h-screen col-span-1 bg-white py-2 pb-0 overflow-auto w-full">
      <PostInfo post={post} />

      {/* caption */}
      <p className="m-2 my-3 px-2 text-sm">{post.text}</p>

      {/* actions */}
      <PostActions
        id={post._id}
        forumId={post.forum._id}
        upvotes={post.upvotes}
        downvotes={post.downvotes}
        comments={post.comments}
        showCommentButton={false}
      />
      <hr />

      {/* comments */}
      <div className="flex flex-col py-1">
        {comments.map((comment, i) => (
          <Comment
            comment={comment}
            key={i}
            forumId={post.forum._id}
            postId={post._id}
            comments={comments}
            setComments={setComments}
            moderators={post.forum.moderators}
          />
        ))}
      </div>

      {/* comment form */}
      <CommentForm
        forumId={post.forum._id}
        postId={post._id}
        comments={comments}
        setComments={setComments}
      />
    </section>
  );
}

export default PostData;
