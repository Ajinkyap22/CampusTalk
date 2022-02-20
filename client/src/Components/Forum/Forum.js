import Nav from "../Navbar/Nav";
import { useEffect, useContext } from "react";
import { TabContext } from "../../TabContext";
import { useState } from "react";
import axios from "axios";
import Filter from "../Feed/Filter";
import Post from "../Post/Post";
import { Link } from "react-router-dom";
import LogoCropped from "../LogoCropped";

function Forum({ forum, title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [activeFilter, setActiveFilter] = useState("latest");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = title || `${forum.forumName} | CampusTalk`;
  }, [title, forum.forumName]);

  useEffect(() => {
    setActiveTab("forums");
  }, [activeTab]);

  useEffect(() => {
    // get all posts in the forum
    axios.get(`/api/forums/${forum._id}/posts`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <main className="w-full min-h-full overflow-auto bg-[#F0F2F5]">
      <Nav />

      <section className="flex justify-between items-start md:w-[70%] mx-auto h-full">
        {/* posts and filters */}
        <div className="grid grid-cols-1 justify-items-stretch items-center my-8 h-full">
          {/* filters */}
          <Filter
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            posts={posts}
            setPosts={setPosts}
          />

          {/* posts */}
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>

        <div className="mt-8">
          {/* forum info */}
          <div className="bg-white shadow-base max-w-sm pb-2">
            {/* title */}
            <div className="w-full bg-primary p-3 py-2">
              <LogoCropped width="40" />
              <p className="text-white text-lg inline"> {forum.forumName}</p>
            </div>

            {/* description */}
            <p className="text-sm p-4">
              This is your feed. Posts from all of your forums will be displayed
              here. Head to the 'Forums' tab to see the posts of a specific
              forum.
            </p>

            {/* buttons */}
            <div className="">
              <button className="w-1/2 mx-auto block py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-primary bg-primary text-white rounded-full hover:bg-white hover:text-primary">
                Create Post
              </button>

              <Link
                to="/create-forum"
                className="w-1/2 mx-auto text-center block py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-primary bg-white text-primary rounded-full hover:bg-primary hover:text-white"
              >
                Leave Forum
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Forum;
