import { Link } from "react-router-dom";

function HomeBox() {
  return (
    <div className="bg-white shadow-base max-w-[21rem] pb-2 rounded sticky top-[5.5rem]">
      {/* title */}
      <div className="w-full bg-primary-light p-3 py-2 rounded-t">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          className="inline mr-1 mb-1.5"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M3 14.828v9.172h18v-9.172l-9-8.375-9 8.375zm11 7.172h-4v-6h4v6zm10-9.852l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148z" />
        </svg>
        <p className="text-white text-lg inline"> Home</p>
      </div>

      {/* description */}
      <p className="text-sm p-4">
        This is your feed. Posts from all of your forums will be displayed here.
        Head to the 'Forums' tab to see the posts of a specific forum.
      </p>

      {/* buttons */}
      <div className="">
        <Link
          to="/create-post"
          className="w-1/2 mx-auto text-center block py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-primary bg-primary-light text-white rounded-full hover:bg-blue-700"
        >
          Create Post
        </Link>

        <Link
          to="/create-forum"
          className="w-1/2 mx-auto text-center block py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-primary bg-white text-primary rounded-full hover:bg-primary-light hover:text-white"
        >
          Create Forum
        </Link>
      </div>
    </div>
  );
}

export default HomeBox;
