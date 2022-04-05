import { Link } from "react-router-dom";

function HomeBox() {
  return (
    <div className="hidden md:block bg-white dark:bg-darkSecondary shadow-base lg:max-w-[18rem] xl:max-w-[21rem] 2xl:max-w-[26rem] 3xl:max-w-[30rem] pb-2 rounded sticky top-[5.5rem]">
      {/* title */}
      <div className="w-full bg-primary-light lg:px-2 xl:p-3 py-2 2xl:px-4 2xl:py-3 rounded-t flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline mr-2 mb-1.5 lg:w-5 xl:w-6 2xl:w-9"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M3 14.828v9.172h18v-9.172l-9-8.375-9 8.375zm11 7.172h-4v-6h4v6zm10-9.852l-1.361 1.465-10.639-9.883-10.639 9.868-1.361-1.465 12-11.133 12 11.148z" />
        </svg>
        <p className="text-white text-base xl:text-lg 2xl:text-2xl 3xl:text-3xl inline">
          {" "}
          Feed
        </p>
      </div>

      {/* description */}
      <p className="lg:text-xs xl:text-sm 2xl:text-lg lg:p-3 xl:p-4 dark:text-darkLight">
        This is your feed. Posts from all of your forums will be displayed here.
        Head to the 'Forums' tab to see the posts of a specific forum.
      </p>

      {/* buttons */}
      <div>
        <Link
          to="/create-post"
          className="w-1/2 mx-auto text-center block py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-primary bg-primary-light text-white rounded-full hover:bg-blue-700 dark:hover:bg-primary-light"
        >
          Create Post
        </Link>

        <Link
          to="/create-forum"
          className="w-1/2 mx-auto text-center block py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-primary dark:border-[#389fff] bg-transparent text-primary dark:text-[#389fff] rounded-full hover:bg-primary-light dark:hover:bg-primary hover:text-white dark:hover:text-white"
        >
          Create Forum
        </Link>
      </div>
    </div>
  );
}

export default HomeBox;
