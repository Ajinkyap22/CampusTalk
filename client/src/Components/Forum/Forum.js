import { ForumContext } from "../../Contexts/ForumContext";
import { TabContext } from "../../Contexts/TabContext";
import { UserContext } from "../../Contexts/UserContext";
import { PostContext } from "../../Contexts/PostContext";
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
import LeaveModal from "./LeaveModal";
import LogoCropped from "../LogoCropped";
import Toast from "../Toast";

function Forum({ forum, title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [user] = useContext(UserContext);
  const [forums, setForums] = useContext(ForumContext);
  const [activeFilter, setActiveFilter] = useState("latest");
  const [dateRange, setDateRange] = useState("Today");
  const [posts, setPosts] = useContext(PostContext);
  const [tab, setTab] = useState("posts");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

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

  useEffect(() => {
    // hiden overflow when modal is open
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [showModal]);

  function removeMember(member) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    let body = {
      id: member._id,
    };

    axios
      .post(`/api/forums/${forum._id}/members/delete`, body, headers)
      .then((res) => {
        let newForums = [...forums];
        newForums = newForums.map((f) =>
          f._id === forum._id ? { ...forum, members: res.data } : f
        );

        setForums(newForums);

        setShowToast(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function makeModerator(member) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    let body = {
      id: member._id,
    };

    axios
      .post(`/api/forums/${forum._id}/moderators/make`, body, headers)
      .then((res) => {
        console.log(res.data, forums);
        let newForums = [...forums];
        newForums = newForums.map((f) =>
          f._id === forum._id ? { ...forum, moderators: res.data } : f
        );

        setForums(newForums);

        setShowToast(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function dismissModerator(member) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    let body = {
      id: member._id,
    };

    axios
      .post(`/api/forums/${forum._id}/moderators/dismiss`, body, headers)
      .then((res) => {
        console.log(res.data, forums);
        let newForums = [...forums];
        newForums = newForums.map((f) =>
          f._id === forum._id ? { ...forum, moderators: res.data } : f
        );

        setForums(newForums);

        setShowToast(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <main className="w-full min-h-full flex flex-col items-center overflow-auto bg-[#F0F2F5] relative">
      <Nav />

      {/* forum content */}
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
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                  />

                  {/* posts */}
                  {posts.map((post) => (
                    <Post
                      key={post._id}
                      post={post}
                      activeFilter={activeFilter}
                      range={dateRange}
                    />
                  ))}

                  {/* if there are no posts */}
                  {posts.length === 0 && (
                    <div className="text-center my-6">
                      <LogoCropped color="rgba(98,98,98,0.9)" width="80" />
                      <p className="text-gray-600 my-4">
                        No posts yet. Be the first to post!
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Members
                  members={forum.members}
                  moderators={forum.moderators}
                  removeMember={removeMember}
                  makeModerator={makeModerator}
                  dismissModerator={dismissModerator}
                />
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
          <ForumInfo
            forum={forum}
            showModal={showModal}
            setShowModal={setShowModal}
          />

          {/* rules */}
          <Rules rules={forum.rules} />
        </div>
      </section>

      {/* leave forum warning modal */}
      <LeaveModal
        forumName={forum.forumName}
        showModal={showModal}
        setShowModal={setShowModal}
        forumId={forum._id}
      />

      {/* overlay */}
      <div
        className="w-full h-full absolute bg-[rgba(0,0,0,0.7)]"
        hidden={!showModal}
      ></div>

      <Toast text="Removed member successfully." show={showToast} />
    </main>
  );
}

export default Forum;
