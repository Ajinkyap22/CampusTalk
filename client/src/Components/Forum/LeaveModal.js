import { UserContext } from "../../Contexts/UserContext";
import { ForumContext } from "../../Contexts/ForumContext";
import { useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

function LeaveModal({ forumName, forumId, showModal, setShowModal, ...props }) {
  const [user, setUser] = useContext(UserContext);
  const [forums, setForums] = useContext(ForumContext);

  function leaveForum() {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    let body = {
      id: user._id,
    };

    axios
      .post(`/api/forums/${forumId}/members/delete`, body, headers)
      .then((res) => {
        // remove forum from users forums
        setUser({
          ...user,
          forums: user.forums.filter((forum) => forum._id !== forumId),
        });

        // remove user from forum members
        setForums((prevForums) =>
          prevForums.map((forum) => {
            if (forum._id === forumId) {
              return {
                ...forum,
                members: res.data,
              };
            } else {
              return forum;
            }
          })
        );

        setShowModal(false);
        props.history.push(`/forums/${forumId}`);
      });
  }

  return (
    <div
      className="absolute bg-white top-[35vh] rounded text-center py-2 shadow-base z-10 w-[80%] xsm:w-[70%] md:w-[50%] lg:w-[30%] 2xl:w-[25%]"
      hidden={!showModal}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        className="mx-auto mt-3 mb-2"
        fill="#626262"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
      </svg>

      <p className="p-4">Are you sure you want to leave {forumName}?</p>

      <button
        className="bg-red-500 text-sm px-4 py-2 text-white rounded mb-4"
        onClick={leaveForum}
      >
        Leave Forum
      </button>
    </div>
  );
}

export default withRouter(LeaveModal);
