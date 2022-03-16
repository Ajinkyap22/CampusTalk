import LogoCropped from "../LogoCropped";
import ForumsList from "./ForumsList";
import { Link } from "react-router-dom";

function ForumBox({ user, fixed = true }) {
  return (
    <div
      className={`bg-white shadow-base max-w-[21rem] my-4 mt-8 rounded ${
        fixed ? "fixed top-[60%]" : ""
      }`}
    >
      {/* title */}
      <div className="w-full bg-primary-light p-3 py-2  rounded-t">
        <LogoCropped width="40" />

        <p className="text-white inline"> Your Forums</p>
      </div>

      {/* forums list */}
      <div>
        {user && user.forums.length ? (
          <div>
            {user.forums.map((forum, i) => {
              return (
                <ForumsList
                  key={i}
                  forumName={forum.forumName}
                  forumId={forum._id}
                />
              );
            })}
            <Link
              to={`/forums/`}
              className="block p-3 text-primary text-center text-sm underline underline-offset-1 hover:bg-blue-100"
            >
              See all
            </Link>
          </div>
        ) : (
          <p className="block p-3 text-center text-sm text-slate-800 hover:bg-gray-100">
            You have not joined any forums yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default ForumBox;
