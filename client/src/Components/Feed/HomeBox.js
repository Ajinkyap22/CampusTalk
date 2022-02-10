function HomeBox() {
  return (
    <div className="bg-white shadow-base max-w-sm mt-8">
      {/* title */}
      <div className="w-full bg-primary p-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          fill="white"
          className="inline mr-1 align-middle"
          viewBox="0 0 16 18"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
        <p className="text-white text-xl inline"> Home</p>
      </div>

      {/* description */}
      <p className="text-sm p-4">
        This is your feed. Posts from all of your forums will be displayed here.
        Head to the 'Forums' tab to see the posts of a specific forum.
      </p>

      {/* buttons */}
      <div className="">
        <button className="w-1/2 mx-auto block py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-primary bg-primary text-white rounded-full hover:bg-white hover:text-primary">
          Create Post
        </button>

        <button className="w-1/2 mx-auto block py-1.5 my-5 text-xs md:text-sm 2xl:text-base border border-primary bg-white text-primary rounded-full hover:bg-primary hover:text-white">
          Create Forum
        </button>
      </div>
    </div>
  );
}

export default HomeBox;
