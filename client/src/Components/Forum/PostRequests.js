import { PostContext } from "../../Contexts/PostContext";
import LogoCropped from "../LogoCropped";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PostRequest from "./PostRequest";

function PostRequests({ forum, forums, setForums }) {
  const [postRequests, setPostRequests] = useState([]);
  const [posts, setPosts] = useContext(PostContext);

  useEffect(() => {
    axios.get(`/api/forums/${forum._id}/posts/postRequests`).then((res) => {
      setPostRequests(res.data);
    });
  }, []);

  function approvePost(post) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .put(
        `/api/forums/${forum._id}/posts/approve/${post._id}`,
        { authorId: post.author._id },
        headers
      )
      .then((res) => {
        let newForum = forums.find((forum) => forum._id === post.forum._id);

        newForum.posts.push(res.data);

        // sort newForum's post by date
        newForum.posts.sort((a, b) => -a.timestamp.localeCompare(b.timestamp));

        let newForums = forums.map((f) =>
          f._id === newForum._id ? newForum : f
        );

        // update forums
        setForums(newForums);

        // update posts
        let newPosts = [...posts, res.data];

        newPosts.sort((a, b) => -a.timestamp.localeCompare(b.timestamp));

        setPosts(newPosts);

        // update post requests
        setPostRequests(postRequests.filter((p) => p._id !== post._id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function rejectPost(post) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .put(`/api/forums/${forum._id}/posts/reject/${post._id}`, {}, headers)
      .then((res) => {
        console.log(res.data);
        setPostRequests(postRequests.filter((p) => p._id !== post._id));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      {/* if empty */}
      <div className="text-center my-4" hidden={postRequests.length}>
        <LogoCropped color="rgba(98,98,98,0.9)" width="80" />
        <p className="text-secondary">There no new post requests.</p>
      </div>

      {/* if not empty */}
      {postRequests.map((post, i) => (
        <div key={i}>
          <PostRequest post={post} />

          {/* buttons to approve or reject post */}
          <div className="flex items-center mt-3">
            <button
              className="bg-green-500 p-2 text-sm text-white flex-1 hover:bg-green-600"
              onClick={() => approvePost(post)}
            >
              Approve
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                fill="white"
                className="inline mx-1"
                viewBox="0 0 16 16"
              >
                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
              </svg>
            </button>

            <button
              className="bg-red-500 p-2 text-sm text-white flex-1 hover:bg-red-600"
              onClick={() => rejectPost(post)}
            >
              Reject
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                fill="white"
                className="inline mx-1"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                />
                <path
                  fillRule="evenodd"
                  d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostRequests;
