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
      />

      {/* caption */}
      <p className="m-2 my-3 px-2 text-sm">{post.text}</p>

      {/* image */}
      <div className="mt-2 bg-black">
        <img
          src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"
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
