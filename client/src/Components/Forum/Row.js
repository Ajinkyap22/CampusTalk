import { UserContext } from "../../Contexts/UserContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";

function Row({ forum }) {
  const [user, setUser] = useContext(UserContext);

  function joinForum() {
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
        // add forum to users forums
        setUser({ ...user, forums: [...user.forums, forum._id] });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <tr className="text-center text-sm py-4">
      <td className="text-xs pl-3 lg:text-sm 2xl:text-lg">{forum.forumName}</td>
      <td className="text-xs lg:text-sm 2xl:text-lg">{forum.members.length}</td>
      <td>
        {user &&
        user.forums.some((userForum) => userForum._id === forum._id) ? (
          <button className="px-3 py-1 xl:py-1.5 my-2 text-xs lg:text-sm xl:my-2 2xl:text-lg 2xl:px-4 2xl:my-3 bg-primary border border-primary text-white rounded-full hover:bg-blue-700">
            <Link to={`/forums/${forum._id}`}>Visit</Link>
          </button>
        ) : (
          <button
            onClick={joinForum}
            className="px-3 py-1 xl:py-1.5 my-2 text-xs lg:text-sm xl:my-2 2xl:text-lg 2xl:px-4 2xl:my-3 bg-primary border border-primary text-white rounded-full hover:bg-blue-700"
          >
            Join
          </button>
        )}
      </td>
    </tr>
  );
}

export default Row;
