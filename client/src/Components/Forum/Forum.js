import { TabContext } from "../../Contexts/TabContext";
import { UserContext } from "../../Contexts/UserContext";
import { useEffect, useContext } from "react";
import { useState } from "react";
import axios from "axios";
import Nav from "../Navbar/Nav";
import Filter from "../Feed/Filter";
import Post from "../Post/Post";
import ForumInfo from "./ForumInfo";
import Rules from "./Rules";
import TabToggle from "./TabToggle";
import Members from "./Members";

function Forum({ forum, title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [user] = useContext(UserContext);
  const [activeFilter, setActiveFilter] = useState("latest");
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState("posts");

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
        <div className="grid grid-cols-1 items-center max-w-[32rem] my-8 h-full">
          {/* tab */}
          <TabToggle tab={tab} setTab={setTab} />

          {/* if user exists & is a member of the forum */}
          {user &&
          user.forums.some((userForum) => userForum._id === forum._id) ? (
            <div>
              {tab === "posts" ? (
                <div>
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
              ) : (
                <Members members={forum.members} />
              )}
            </div>
          ) : (
            <div className="text-center">
              {/* icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-auto mx-auto my-4"
                viewBox="0 0 20 20"
                fill="rgba(0, 0, 0, 0.6)"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>

              {/* text */}
              <p className="my-4 text-gray-700">
                You are not a member of this forum. Join the forum to view posts
                & members.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8">
          {/* forum info */}
          <ForumInfo forum={forum} />

          {/* rules */}
          <Rules rules={forum.rules} />
        </div>
      </section>
    </main>
  );
}

export default Forum;
