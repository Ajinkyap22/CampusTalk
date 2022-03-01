import { Link } from "react-router-dom";

function Row({ forum }) {
  console.log(forum);
  return (
    <tr className="text-center text-sm py-4">
      <td className="text-xs pl-3 lg:text-sm 2xl:text-lg">{forum.forumName}</td>
      <td className="text-xs lg:text-sm 2xl:text-lg">{forum.members.length}</td>
      <td>
        <button className="px-3 py-1 xl:py-1.5 my-2 text-xs lg:text-sm xl:my-2 2xl:text-lg 2xl:px-4 2xl:my-3 bg-primary border border-primary text-white rounded-full hover:bg-blue-700">
          <Link to={`/forums/${forum._id}`}>Visit</Link>
        </button>
      </td>
    </tr>
  );
}

export default Row;
