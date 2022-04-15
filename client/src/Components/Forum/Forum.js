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
import PostRequests from "./PostRequests";
import JoinRequests from "./JoinRequests";
import Loading from "../Loading";
import MobileTabs from "./MobileTabs";
import ForumInfoMobile from "./ForumInfoMobile";

function Forum({ forum, title, defaultTab = "posts" }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [user, setUser] = useContext(UserContext);
  const [forums, setForums] = useContext(ForumContext);
  const [activeFilter, setActiveFilter] = useState("latest");
  const [dateRange, setDateRange] = useState("Today");
  const [posts, setPosts] = useContext(PostContext);
  const [tab, setTab] = useState("posts");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postRequests, setPostRequests] = useState([]);
  const [postRequestLoading, setPostRequestLoading] = useState(true);
  const [joinRequestLoading, setJoinRequestLoading] = useState(true);

  useEffect(() => {
    document.title = title || `${forum.forumName} | CampusTalk`;
  }, [title, forum.forumName]);

  useEffect(() => {
    setActiveTab("forums");
  }, [activeTab]);

  useEffect(() => {
    // get all posts in the forum
    setTab(defaultTab);

    // get posts
    axios.get(`/api/forums/${forum._id}/posts`).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });

    // get post requests
    axios.get(`/api/forums/${forum._id}/posts/postRequests`).then((res) => {
      setPostRequests(res.data);
      setPostRequestLoading(false);
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

  useEffect(() => {
    if (!user) return;

    if (forum.moderators.find((moderator) => moderator._id === user._id)) {
      setIsModerator(true);
    } else {
      setIsModerator(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    // get all join requests
    axios.get(`/api/forums/${forum._id}/join_requests`).then((res) => {
      setJoinRequests(res.data);
      setJoinRequestLoading(false);

      // chec if user is in the join requests
      if (res.data.find((request) => request._id === user._id)) {
        setRequestSent(true);
      } else {
        setRequestSent(false);
      }
    });
  }, [user]);

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
    <main className="w-full min-h-screen lg:h-full flex flex-col items-start bg-[#F0F2F5] dark:bg-dark relative">
      <Nav />

      {/* forum content */}
      <section className="lg:flex justify-between items-start w-full lg:w-[80%] xl:w-[70%] mx-auto h-full">
        <div className="flex flex-col max-w-full lg:max-w-[28rem] xl:max-w-[32rem] my-4 lg:my-8 h-full">
          {/* tab */}
          <TabToggle
            tab={tab}
            setTab={setTab}
            isModerator={isModerator}
            postRequests={postRequests}
            joinRequests={joinRequests}
          />

          <MobileTabs
            tab={tab}
            setTab={setTab}
            isModerator={isModerator}
            postRequests={postRequests}
            joinRequests={joinRequests}
            forumName={forum.forumName}
          />

          {/* if user exists & is a member of the forum */}
          {user &&
          user.forums.some((userForum) => userForum._id === forum._id) ? (
            <div>
              {/* posts */}
              <div hidden={tab !== "posts"}>
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

              {/* members */}
              {tab === "members" && (
                <Members
                  members={forum.members}
                  moderators={forum.moderators}
                  removeMember={removeMember}
                  makeModerator={makeModerator}
                  dismissModerator={dismissModerator}
                />
              )}

              {/* post requests */}
              {tab === "postRequests" && isModerator && (
                <PostRequests
                  forum={forum}
                  forums={forums}
                  setForums={setForums}
                  user={user}
                  setUser={setUser}
                  postRequests={postRequests}
                  setPostRequests={setPostRequests}
                  postRequestLoading={postRequestLoading}
                />
              )}

              {/* join requests */}
              {tab === "joinRequests" && isModerator && (
                <JoinRequests
                  forum={forum}
                  forums={forums}
                  setForums={setForums}
                  user={user}
                  setUser={setUser}
                  joinRequests={joinRequests}
                  setJoinRequests={setJoinRequests}
                  joinRequestLoading={joinRequestLoading}
                />
              )}
            </div>
          ) : (
            <div className="text-center">
              {/* icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-auto mx-auto my-4 fill-zinc-600 dark:fill-gray-300"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>

              {/* text */}
              {requestSent ? (
                <p className="my-4 text-gray-700 dark:text-gray-300">
                  Your request to join the forum has been sent. You will be able
                  to see all the posts when it is accepted.
                </p>
              ) : (
                <p className="my-4 text-gray-700 dark:text-gray-300">
                  You are not a member of this forum. Join the forum to view
                  posts & members.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="hidden lg:block mt-8 sticky">
          {/* forum info */}
          <ForumInfo
            forum={forum}
            forums={forums}
            showModal={showModal}
            setShowModal={setShowModal}
            requestSent={requestSent}
            setRequestSent={setRequestSent}
            joinRequests={joinRequests}
            setJoinRequests={setJoinRequests}
            isModerator={isModerator}
          />

          {/* rules */}
          <Rules rules={forum.rules} />
        </div>

        {tab === "info" && (
          <ForumInfoMobile
            forum={forum}
            showModal={showModal}
            setShowModal={setShowModal}
            requestSent={requestSent}
            setRequestSent={setRequestSent}
            joinRequests={joinRequests}
            setJoinRequests={setJoinRequests}
            isModerator={isModerator}
            user={user}
          />
        )}
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
