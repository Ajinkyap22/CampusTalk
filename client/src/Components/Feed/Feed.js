import Nav from "../Navbar/Nav";
import Filter from "./Filter";
import { useEffect, useState } from "react";
import HomeBox from "./HomeBox";
import axios from "axios";
import Post from "../Post/Post";

function Feed() {
  const [activeFilter, setActiveFilter] = useState("latest");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch all posts
    axios
      .get("/api/forums/61d021d0efe0870d38c657a2/posts")
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        console.error(err);
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
          />

          {/* posts */}
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>

        {/* home info box */}
        <HomeBox />
      </section>
    </main>
  );
}

export default Feed;
