import { UserContext } from "../../Contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import ForumBox from "../Feed/ForumBox";
import Filter from "../Feed/Filter";
import Post from "../Post/Post";
import Loading from "../Loading";
import LogoCropped from "../LogoCropped";
import axios from "axios";
import Nav from "../Navbar/Nav";

function Profile({ ...props }) {
  const [user, setUser] = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("latest");
  const [dateRange, setDateRange] = useState("Today");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      props.history.push("/feed");
    }
  }, [user]);

  useEffect(() => {
    axios.get(`/api/users/${user._id}/posts`).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="w-full min-h-full overflow-auto bg-[#F0F2F5] ">
      <Nav />

      <section className="flex items-start relative p-2 mt-4">
        <div className="self-start ml-12">
          <div className="bg-white p-2 rounded shadow-base mt-2 relative text-center">
            {/* user picture */}
            {user && user.picture ? (
              <img
                src={`http://localhost:3000/uploads/images/${user.picture}`}
                alt=""
                className="rounded-full inline h-28 w-auto mt-4 my-2"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                fill="#818181"
                className="inline my-2 mt-4"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            )}
            {/* user name */}
            <h1 className="text-lg text-center mt-2">
              {user.firstName} {user.lastName}
            </h1>

            {/* user join date */}
            <p className="text-mxs text-secondary mt-1">
              Joined {moment(user.timestamp).format("LL")}
            </p>
            <hr className="mt-2" />

            {/* stats */}
            <div className="flex justify-center items-center mt-3">
              {/* members */}
              <div className="flex flex-col items-center px-2.5">
                <span>{user.posts.length}</span>
                <span className="text-mxs">Posts</span>
              </div>

              {/* posts */}
              <div className="flex flex-col items-center px-2.5">
                <span>{user.forums.length}</span>
                <span className="text-mxs">Forums</span>
              </div>
            </div>

            {/* edit icon */}
            <Link to="/user-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#919191"
                className="absolute top-3 right-3"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </Link>
          </div>

          {/* user forums */}
          <div>
            <ForumBox user={user} />
          </div>
        </div>

        {/* user posts */}
        <div className="max-w-[32rem] mt-2 ml-24">
          {/* filters */}
          <Filter
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            posts={posts}
            setPosts={setPosts}
            dateRange={dateRange}
            setDateRange={setDateRange}
          />

          {loading && (
            <div className="mx-auto text-center mt-8">
              <Loading />
            </div>
          )}

          {/* posts */}
          {!loading &&
            posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                activeFilter={activeFilter}
                range={dateRange}
              />
            ))}

          {/* if there are no posts */}
          {posts.length === 0 && !loading && (
            <div className="text-center my-6">
              <LogoCropped color="rgba(98,98,98,0.9)" width="80" />
              <p className="text-gray-600 my-4">
                No posts yet. Be the first to post!
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default withRouter(Profile);
