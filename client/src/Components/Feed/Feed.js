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
import Loading from "../Loading";

const faqData = [
  {
    question: "How do I post anonymously?",
    answer:
      "You can post anonymously by selecting the anonymous mode in the post form.",
  },

  {
    question: "Can I attach files to my posts?",
    answer:
      "Yes you can attach different types of files to your posts such as images, videos, documents, etc.",
  },

  {
    question: "How can I leave a forum?",
    answer:
      "Visit the forums page that you want to leave and click on the 'Leave a Forum' button.",
  },
  {
    question: "What is the 'important' filter?",
    answer:
      "The 'important' filter will show only the posts that are marked as important.",
  },
  {
    question: "What is the 'top' filter?",
    answer:
      "The 'top' filter will sort the posts by the number of upvotes, you can select different time ranges like 'Today', 'This Week', 'This Month' etc. that will show you the top posts from that period.",
  },
];

function Feed({ title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [activeFilter, setActiveFilter] = useState("latest");
  const [dateRange, setDateRange] = useState("Today");
  const [posts, setPosts, loading] = useContext(PostContext);
  const [user] = useContext(UserContext);

  useEffect(() => {
    document.title = title || "Feed | CampusTalk";
  }, [title]);

  useEffect(() => {
    setActiveTab("feed");
  }, [activeTab]);

  return (
    <main className="w-full min-h-full bg-[#F0F2F5]">
      <Nav />

      <section className="flex justify-evenly md:w-full mx-auto h-full">
        {/* faq */}
        <FAQ faqData={faqData} />

        {/* posts and filters */}
        <div className="flex flex-col items-center my-8 h-full max-w-[32rem] col-start-1 col-span-2">
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
            <div className="mt-10">
              <Loading />
            </div>
          )}

          {/* posts */}
          {!loading &&
            posts.map((post, i) => (
              <Post
                key={i}
                post={post}
                activeFilter={activeFilter}
                range={dateRange}
              />
            ))}

          {/* if feed is empty */}
          <div
            hidden={posts.length || loading ? true : false}
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
