import LogoCropped from "../LogoCropped";
import moment from "moment";

function ForumInfo({ forum }) {
  return (
    <div className="bg-white shadow-base max-w-[22rem] pb-1">
      {/* title */}
      <div className="flex items-center w-full bg-primary p-3 py-2">
        <div className="mr-1">
          <LogoCropped />
        </div>
        <p className="text-white text-lg inline"> {forum.forumName}</p>
      </div>

      {/* info */}
      <div className="p-2 border-b border-[#cfcdcd] px-3">
        <p className="text-xs p-1">
          <span className="underline underline-offset-1">Website: </span>
          <a href={forum.website} className="text-primary px-2">
            {forum.website}
          </a>
        </p>
        <p className="text-xs p-1">
          <span className="underline underline-offset-1">Email: </span>
          <a href={forum.website} className="text-primary px-6">
            {forum.email}
          </a>
        </p>
        <p className="text-xs p-1">
          <span className="underline underline-offset-1">Address: </span>
          <span className="px-2">{forum.address}</span>
        </p>
      </div>

      {/* stats */}
      <div className="p-3 py-2 border-b border-[#cfcdcd] text-center px-24">
        <div className="flex justify-center items-center">
          {/* members */}
          <div className="flex flex-col items-center px-2">
            <span>{forum.members.length}</span>
            <span className="text-sm">Members</span>
          </div>

          {/* posts */}
          <div className="flex flex-col items-center px-2">
            <span>{forum.posts.length}</span>
            <span className="text-sm">Posts</span>
          </div>
        </div>

        {/* created data */}
        <p className="text-xs pt-3 text-secondary">
          Created {moment(forum.timestamp).format("LL")}
        </p>
      </div>

      {/* buttons */}
      <div>
        <button className="mx-auto w-1/2 block p-2 py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-primary bg-primary text-white rounded-full hover:bg-blue-700">
          Create Post
        </button>

        <button className="mx-auto w-1/2 block text-centr p-2 py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-red-500 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white">
          Leave Forum
        </button>
      </div>
    </div>
  );
}

export default ForumInfo;
