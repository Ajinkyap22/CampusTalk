import { Link } from "react-router-dom";

function ForumsList({ forumName, forumId }) {
  return (
    <Link
      to={`/forums/${forumId}`}
      className="block p-3 text-sm border-b underline underline-offset-1 text-slate-800 hover:bg-gray-100"
    >
      {forumName}
    </Link>
  );
}

export default ForumsList;
