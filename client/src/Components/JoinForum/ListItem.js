import { useContext } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios";

function ListItem({ forum }) {
  const [user] = useContext(UserContext);

  const joinForum = (forumId) => {
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
      .post(`/api/forums/${forumId}/join`, body, headers)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        console.error(err);
      });
  };

  return (
    <tr className="text-center text-sm py-4">
      <td>{forum.forumName}</td>
      <td>{forum.members.length}</td>
      <td>
        <button
          onClick={() => joinForum(forum._id)}
          className="px-5 py-1.5 m-2 text-sm md:text-base 2xl:text-lg bg-primary text-white rounded-full hover:bg-blue-700"
        >
          Join
        </button>
      </td>
    </tr>
  );
}

export default ListItem;
