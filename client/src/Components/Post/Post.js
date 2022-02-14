import PostInfo from "./PostInfo";
import PostActions from "./PostActions";

function Post({ post }) {
  return (
    <div className="bg-white shadow-base py-2 mt-8 w-[90%]">
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
      <div className="mt-2 bg-black" hidden={post.file ? false : true}>
        <img
          src={`http://localhost:3000/uploads/${post.file}`}
          alt=""
          className="mx-auto"
        />
      </div>

      {/* actions */}
      <PostActions upvotes={post.upvotes} comments={post.comments} />
    </div>
  );
}

export default Post;
