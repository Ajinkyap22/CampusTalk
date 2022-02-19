import Nav from "../Navbar/Nav";
import { useEffect, useContext } from "react";
import { TabContext } from "../../TabContext";
import { useState } from "react";
import axios from "axios";
import Filter from "../Feed/Filter";
import Post from "../Post/Post";

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
        <div className="flex flex-col items-center my-8 h-full">
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
      </section>
    </main>
  );
}

export default Forum;
