import { useEffect, useState } from "react";

function ListItem({ forum, joinList, setJoinList }) {
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    console.log(joinList);
  }, [joinList]);

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
      <td>{forum.forumName}</td>
      <td>{forum.members.length}</td>
      <td>
        <button
          onClick={(e) => actionHandler(e, forum._id)}
          className="px-3 py-1.5 my-2 text-sm md:text-base 2xl:text-lg bg-primary border border-primary text-white rounded-full hover:bg-blue-700"
        >
          {joined ? "Cancel" : "Join"}
        </button>
      </td>
    </tr>
  );
}

export default ListItem;
