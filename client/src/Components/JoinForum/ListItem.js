import { useState, useContext } from "react";
import { JoinContext } from "./Join";

function ListItem({ forum }) {
  const [joined, setJoined] = useState(false);
  const [joinList, setJoinList] = useContext(JoinContext);

  const handleJoin = (forumId) => {
    setJoinList((joinList) => [...joinList, forumId]);
  };

  const handleCancel = (forumId) => {
    setJoinList((joinList) => joinList.filter((id) => id !== forumId));
  };

  const actionHandler = (e, forumId) => {
    if (joined) {
      e.target.classList.remove("requested");
      handleCancel(forumId);
      setJoined(false);
    } else {
      e.target.classList.add("requested");
      handleJoin(forumId);
      setJoined(true);
    }
  };

  return (
    <tr className="text-center text-sm py-4">
      <td className="text-xs lg:text-sm 2xl:text-lg">{forum.forumName}</td>
      <td className="text-xs lg:text-sm 2xl:text-lg">{forum.members.length}</td>
      <td>
        <button
          onClick={(e) => actionHandler(e, forum._id)}
          className="px-3 py-1 xl:py-1.5 my-2 text-xs lg:text-sm xl:my-2 2xl:text-lg 2xl:px-4 2xl:my-3 bg-primary border border-primary text-white rounded-full hover:bg-blue-700"
        >
          {joined ? "Cancel" : "Join"}
        </button>
      </td>
    </tr>
  );
}

export default ListItem;
