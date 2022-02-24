import PostInfo from "./PostInfo";
import PostActions from "./PostActions";

function Post({ post }) {
  return (
    <div className="bg-white shadow-base py-2 mt-8 w-full">
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
          src={`http://localhost:3000/uploads/${post.file}`}
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
