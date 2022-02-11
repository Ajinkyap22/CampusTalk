import moment from "moment";

function PostInfo({ author, forum, timestamp, anonymous }) {
  return (
    <div className="flex my-1 px-2">
      {/* user profile pic */}
      {anonymous ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          fill="#818181"
          className="inline mx-1"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
      ) : (
        <img
          src={author.picture}
          alt=""
          className="rounded-full inline h-10 mx-1"
        />
      )}

      <div>
        {/* user name */}
        <span className="mx-1 text-sm">
          {anonymous ? " Anonymous" : `${author.firstName} ${author.lastName}`}
        </span>

        <svg
          width="16"
          viewBox="0 0 16 16"
          className="inline"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.1844 7.71093L5.23437 2.57968C5.0125 2.38906 4.6875 2.56093 4.6875 2.86875V13.1312C4.6875 13.4391 5.0125 13.6109 5.23437 13.4203L11.1844 8.28906C11.3547 8.14218 11.3547 7.85781 11.1844 7.71093Z"
            fill="#484848"
          />
        </svg>

        {/* forum name */}
        <span className="mx-1 text-sm">{forum.forumName}</span>

        {/* date */}
        <p className="mx-1 text-xs text-secondary">
          {moment(timestamp).fromNow()}
        </p>
      </div>
    </div>
  );
}

export default PostInfo;
