import { UserContext } from "../../Contexts/UserContext";
import { TabContext } from "../../Contexts/TabContext";
import { PostContext } from "../../Contexts/PostContext";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Nav from "../Navbar/Nav";
import Filter from "./Filter";
import HomeBox from "./HomeBox";
import Post from "../Post/Post";
import ForumBox from "./ForumBox";
import FAQ from "./FAQ";
import LogoCropped from "../LogoCropped";

function Feed({ title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [activeFilter, setActiveFilter] = useState("latest");
  const [posts, setPosts] = useContext(PostContext);
  const [user] = useContext(UserContext);

  useEffect(() => {
    document.title = title || "Feed | CampusTalk";
  }, [title]);

  useEffect(() => {
    setActiveTab("feed");
  }, [activeTab]);

  return (
    <main className="w-full min-h-full overflow-auto bg-[#F0F2F5]">
      <Nav />

      <section className="flex justify-evenly md:w-full mx-auto h-full">
        {/* faq */}
        <FAQ />

        {/* posts and filters */}
        <div className="flex flex-col items-center my-8 h-full max-w-[32rem] col-start-1 col-span-2">
          {/* filters */}
          <Filter
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            posts={posts}
            setPosts={setPosts}
          />

          {/* posts */}
          {posts.map((post, i) => (
            <Post key={i} post={post} />
          ))}

          <div
            hidden={posts.length ? true : false}
            className="my-12 text-gray-700 text-center"
          >
            {/* logo */}
            <LogoCropped color="rgba(98, 98, 98, 0.9)" width="75" />

            {/* text */}
            <p className="w-2/3 mx-auto my-4">
              Your feed is empty, why not{" "}
              <Link
                to="/create-post"
                className="text-primary underline underline-offset-1"
              >
                {" "}
                create a post{" "}
              </Link>{" "}
              or{" "}
              <Link
                to="/forums"
                className="text-primary underline underline-offset-1"
              >
                join more forums?
              </Link>
            </p>
          </div>
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
