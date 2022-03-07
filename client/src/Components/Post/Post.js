import { useEffect, useState } from "react";
import PostInfo from "./PostInfo";
import PostActions from "./PostActions";
import { withRouter } from "react-router-dom";
import File from "./File";

function Post({ post, activeFilter, range = "Today", ...props }) {
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

  function onPostClick() {
    props.history.push(`/forums/${post.forum._id}/posts/${post._id}`);
  }

  return (
    <div
      className="bg-white shadow-base py-2 mt-8 w-full rounded"
      hidden={!showPost}
    >
      {/* user info */}
      <PostInfo
        postId={post._id}
        author={post.author}
        forum={post.forum}
        timestamp={post.timestamp}
        anonymous={post.anonymous}
        important={post.important}
      />

      {/* caption */}
      <p className="m-2 my-3 px-2 text-sm">{post.text}</p>

      {/* image */}
      {post.file.length ? (
        <File files={post.file} onPostClick={onPostClick} />
      ) : null}

      {/* actions */}
      <PostActions
        id={post._id}
        forumId={post.forum._id}
        upvotes={post.upvotes}
        downvotes={post.downvotes}
        comments={post.comments}
        onPostClick={onPostClick}
      />
    </div>
  );
}

export default withRouter(Post);
