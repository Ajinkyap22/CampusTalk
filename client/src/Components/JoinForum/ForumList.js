import ListItem from "./ListItem";
import { UserContext } from "../../UserContext";
import { useState, useContext } from "react";
import axios from "axios";

function ForumList({ forums }) {
  const [joinList, setJoinList] = useState([]);
  const [user] = useContext(UserContext);

  const sendRequests = () => {
    if (!joinList.length) return;

    // send join requests to each selected forum after confirming rather than sending on selection & then cancelling
    joinList.forEach((forumId) => {
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
    });
  };

  return (
    <table className="table-fixed w-full" hidden={forums ? false : true}>
      <thead>
        <tr>
          <th className="text-primary font-normal">Institute Name</th>
          <th className="text-primary font-normal">Members</th>
        </tr>
      </thead>

      <tbody>
        {forums.map((forum, i) => (
          <ListItem
            forum={forum}
            key={i}
            joinList={joinList}
            setJoinList={setJoinList}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ForumList;
