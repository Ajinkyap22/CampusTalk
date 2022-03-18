import { Link } from "react-router-dom";

function ForumsList({ forumName, forumId }) {
  return (
    <Link
      to={`/forums/${forumId}`}
      className="block p-3 text-sm border-b dark:border-secondary underline underline-offset-1 text-slate-800 dark:text-[#d1d5db] hover:bg-gray-100 dark:hover:bg-slate-800"
    >
      {forumName}
    </Link>
  );
}

export default ForumsList;
