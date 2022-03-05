function Dropdowns({ forums, setForum, setAnonymous }) {
  function handleForumChange(e) {
    setForum(e.target.value);
  }

  function handleModeChange(e) {
    setAnonymous(e.target.value === "anonymous");
  }

  return (
    <div className="flex justify-center items-center p-6">
      {/* dropdown 1 */}
      <div className="relative mx-2">
        <select
          onChange={handleForumChange}
          className="block appearance-none text-sm w-full bg-white shadow-base px-4 py-2 pr-8 rounded shadow focus:outline-none cursor-pointer focus:shadow-outline"
        >
          <option>Select a Forum</option>
          {forums.map((forum, i) => (
            <option key={i} value={forum._id}>
              {forum.forumName}
            </option>
          ))}
        </select>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          fill="#818181"
          className="absolute right-2 top-3 inline"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>

      {/* dropdown 2 */}
      <div className="relative mx-2">
        <select
          onChange={handleModeChange}
          className="block appearance-none text-sm w-full bg-white shadow-base px-4 py-2 pr-8 rounded shadow focus:outline-none cursor-pointer focus:shadow-outline"
        >
          <option value="public">Public Mode</option>
          <option value="anonymous">Anonymous Mode</option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          fill="#818181"
          className="absolute right-2 top-3 inline"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Dropdowns;