import { withRouter } from "react-router-dom";
import File from "../Post/File";
import PostActions from "../Post/PostActions";
import PostInfo from "../Post/PostInfo";

function PostPage({ post, ...props }) {
  function handleBack() {
    props.history.goBack();
  }

  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3 bg-black relative">
        {/* file */}
        {post.file.length ? (
          <File
            classes="flex items-center relative mx-auto bg-black max-w-fit"
            files={post.file}
            fullScreen={true}
          />
        ) : null}

        {/* back button */}
        <button
          onClick={handleBack}
          className="absolute left-5 top-4 bg-[rgba(255,255,255,0.2)] p-1 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="white"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* post info */}
      <div className="col-span-1 bg-white py-2">
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
          {/* {post.comments.map((comment) => ( */}
          <div className="grid grid-cols-10 my-1.5 w-full px-2 relative">
            {/* author picture */}
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

            {/* user name & comment */}
            <div className="flex flex-col col-span-9 mx-2 bg-[#f3f3f3] p-2 rounded-lg">
              <p className="text-mxs font-bold">Ajinkya Palaskar</p>
              <p className="text-mxs">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
                atque dolore ad commodi ipsa dicta mollitia nisi odio maxime
                numquam. Sint velit delectus sit magnam est totam ducimus minus
                voluptate.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-10 my-1.5 w-full px-2 relative">
            {/* author picture */}
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

            {/* user name & comment */}
            <div className="flex flex-col col-span-9 mx-2 bg-[#f3f3f3] p-2 rounded-lg">
              <p className="text-mxs font-bold">Ajinkya Palaskar</p>
              <p className="text-mxs">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
                atque dolore ad commodi ipsa dicta mollitia nisi odio maxime
                numquam. Sint velit delectus sit magnam est totam ducimus minus
                voluptate.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-10 my-1.5 w-full px-2 relative">
            {/* author picture */}
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

            {/* user name & comment */}
            <div className="flex flex-col col-span-9 mx-2 bg-[#f3f3f3] p-2 rounded-lg">
              <p className="text-mxs font-bold">Ajinkya Palaskar</p>
              <p className="text-mxs">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
                atque dolore ad commodi ipsa dicta mollitia nisi odio maxime
                numquam. Sint velit delectus sit magnam est totam ducimus minus
                voluptate.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-10 my-1.5 w-full px-2 relative">
            {/* author picture */}
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

            {/* user name & comment */}
            <div className="flex flex-col col-span-9 mx-2 bg-[#f3f3f3] p-2 rounded-lg">
              <p className="text-mxs font-bold">Ajinkya Palaskar</p>
              <p className="text-mxs">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
                atque dolore ad commodi ipsa dicta mollitia nisi odio maxime
                numquam. Sint velit delectus sit magnam est totam ducimus minus
                voluptate.
              </p>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>
    </div>
  );
}

export default withRouter(PostPage);
