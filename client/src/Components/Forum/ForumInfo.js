import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import LogoCropped from "../LogoCropped";
import moment from "moment";
import axios from "axios";

function ForumInfo({
  forum,
  showModal,
  setShowModal,
  requestSent,
  setRequestSent,
  joinRequests,
  setJoinRequests,
  isModerator,
  ...props
}) {
  const [user] = useContext(UserContext);

  function joinForum() {
    if (!user) return;

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    let body = {
      id: user._id,
    };

    axios
      .post(`/api/forums/${forum._id}/join`, body, headers)
      .then((res) => {
        // update requestSent
        setRequestSent(true);

        // update joinRequests
        setJoinRequests([...joinRequests, user]);
        props.history.push(`/forums/${forum._id}`);

        axios
          .post(
            `/api/notifications/requestNotification`,
            { forum: forum._id || forum, type: "joinRequest" },
            headers
          )
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  function deleteForum() {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };
    let body = {
      text: "Are you sure you want to delete this forum?",
    };

    axios
      .post("/api/mail/send_mail", body, headers)
      .then((res) => {
        console.log("mail sent");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="bg-white dark:bg-darkSecondary shadow-base max-w-[22rem] pb-1 rounded">
      {/* title */}
      <div className="flex items-center w-full bg-primary-light p-3 py-2  rounded-t">
        <div className="mr-1">
          <LogoCropped />
        </div>
        <p className="text-white text-lg inline"> {forum.forumName}</p>
      </div>

      {/* info */}
      <div className="p-2 border-b border-[#cfcdcd] dark:border-secondary px-3">
        {/* website */}
        <p className="text-xs p-1">
          <span className="underline underline-offset-1 dark:text-darkLight">
            Website:{" "}
          </span>
          <a
            href={forum.website}
            target="_blank"
            rel="noreferrer"
            className="text-primary dark:text-primary-dark px-2 hover:underline"
          >
            {forum.website}
          </a>
        </p>

        {/* email */}
        <p className="text-xs p-1">
          <span className="underline underline-offset-1 dark:text-darkLight">
            Email:{" "}
          </span>
          <span className="text-primary dark:text-primary-dark px-6">
            {forum.email}
          </span>
        </p>

        {/* address */}
        <p className="text-xs p-1">
          <span className="underline underline-offset-1 dark:text-darkLight">
            Address:{" "}
          </span>
          <span className="px-2 dark:text-darkLight">{forum.address}</span>
        </p>
      </div>

      {/* stats */}
      <div className="p-3 py-2 border-b border-[#cfcdcd] dark:border-secondary text-center px-24">
        <div className="flex justify-center items-center">
          {/* members */}
          <div className="flex flex-col items-center px-2">
            <span className="dark:text-darkLight">{forum.members.length}</span>
            <span className="text-sm dark:text-darkLight">Members</span>
          </div>

          {/* posts */}
          <div className="flex flex-col items-center px-2">
            <span className="dark:text-darkLight">{forum.posts.length}</span>
            <span className="text-sm dark:text-darkLight">Posts</span>
          </div>
        </div>

        {/* created date */}
        <p className="text-xs pt-3 text-secondary dark:text-gray-300">
          Created {moment(forum.timestamp).format("LL")}
        </p>
      </div>

      {/* buttons */}
      {user && user.forums.some((userForum) => userForum._id === forum._id) ? (
        <div>
          <Link
            to="/create-post"
            className="mx-auto text-center w-1/2 block p-2 py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-primary-light bg-primary-light text-white rounded-full hover:bg-blue-700"
          >
            Create Post
          </Link>

          <button
            onClick={toggleModal}
            className="mx-auto w-1/2 block text-centr p-2 py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-red-500 bg-transparent text-red-500 dark:text-[#ff5656] rounded-full hover:bg-red-500 hover:text-white dark:hover:text-darkLight"
          >
            Leave Forum
          </button>

          {isModerator && (
            <button
              onClick={deleteForum}
              className="mx-auto w-1/2 block text-centr p-2 py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-red-500 bg-transparent text-red-500 dark:text-[#ff5656] rounded-full hover:bg-red-500 hover:text-white dark:hover:text-darkLight"
            >
              Delete Forum
            </button>
          )}
        </div>
      ) : (
        <div>
          {requestSent ? (
            <button
              disabled
              className="mx-auto w-1/2 block p-2 py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-primary-light bg-primary-light text-white rounded-full"
            >
              Request Pending
            </button>
          ) : (
            <button
              onClick={joinForum}
              disabled={!user}
              className="mx-auto w-1/2 block p-2 py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-primary-light bg-primary-light text-white rounded-full hover:bg-blue-700 disabled:opacity-70 disabled:hover:bg-primary-light"
            >
              Join Forum
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default withRouter(ForumInfo);
