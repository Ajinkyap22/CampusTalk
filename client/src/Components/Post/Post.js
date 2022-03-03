import { useEffect, useState } from "react";
import PostInfo from "./PostInfo";
import PostActions from "./PostActions";

function Post({ post, activeFilter, range = "Today" }) {
  const [showPost, setShowPost] = useState(true);
  useEffect(() => {
    if (activeFilter !== "top") return;
    const now = new Date();
    const postDate = new Date(post.timestamp);
    const diff = now - postDate;
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    // if range is today, show post if it's within the last 24 hours
    if (range === "Today") {
      setShowPost(diffDays <= 1);
      // if range is This week, show post if it's within the last 7 days
    } else if (range === "This week") {
      setShowPost(diffDays <= 7);
    } else if (range === "This month") {
      setShowPost(diffDays <= 30);
    } else {
      setShowPost(true);
    }
  }, [activeFilter, range, post.timestamp]);

  useEffect(() => {
    if (activeFilter === "important" && !post.important) setShowPost(false);

    if (activeFilter === "latest") setShowPost(true);
  }, [activeFilter]);

  return (
    <div
      className="bg-white shadow-base py-2 mt-8 w-full rounded"
      hidden={!showPost}
    >
      {/* user info */}
      <PostInfo
        author={post.author}
        forum={post.forum}
        timestamp={post.timestamp}
        anonymous={post.anonymous}
        important={post.important}
      />

      {/* caption */}
      <p className="m-2 my-3 px-2 text-sm">{post.text}</p>

      {/* image */}
      <div
        className="mt-2 mx-auto bg-black max-w-fit"
        hidden={post.file ? false : true}
      >
        <img
          src={`http://localhost:3000/uploads/images/${post.file}`}
          alt=""
          className="mx-auto w-full"
        />
      </div>

      {/* actions */}
      <PostActions
        id={post._id}
        forumId={post.forum._id}
        upvotes={post.upvotes}
        downvotes={post.downvotes}
        comments={post.comments}
      />
    </div>
  );
}

export default Post;
