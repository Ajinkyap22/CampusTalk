import Nav from "../Navbar/Nav";
import Filter from "./Filter";
import { useEffect, useState, useContext } from "react";
import HomeBox from "./HomeBox";
import axios from "axios";
import Post from "../Post/Post";
import { UserContext } from "../../UserContext";
import ForumBox from "./ForumBox";
import { TabContext } from "../../TabContext";

function Feed({ title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [activeFilter, setActiveFilter] = useState("latest");
  const [posts, setPosts] = useState([]);
  const [user] = useContext(UserContext);

  useEffect(() => {
    document.title = title || "Feed | CampusTalk";
  }, [title]);

  useEffect(() => {
    setActiveTab("feed");
  }, [activeTab]);

  useEffect(() => {
    if (user) {
      user.forums.forEach((forum) => {
        axios.get(`/api/forums/${forum.id}/posts`).then((res) => {
          setPosts([...posts, ...res.data]);
        });
      });
    } else {
      // for testing purposes
      axios
        .get("/api/forums/62067ce47911a04b1fd71495/posts")
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
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

        <div className="mt-8">
          {/* home info box */}
          <HomeBox />

          {/* forums joined box */}
          <ForumBox user={user} />
        </div>
      </section>
    </main>
  );
}

export default Feed;
