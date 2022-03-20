function TabToggle({ tab, setTab, isModerator }) {
  function toggleTab(tabName) {
    setTab(tabName);
  }

  return (
    <div className="text-center sticky mb-8 min-w-[32rem] mx-auto">
      {/* posts */}
      <button
        className={`p-2 px-8 shadow text-sm border-r border-light dark:border-zinc-700 rounded-l ${
          tab === "posts"
            ? "bg-primary-light text-white"
            : "bg-white dark:bg-darkSecondary text-darkLight"
        }`}
        onClick={() => toggleTab("posts")}
      >
        Posts
      </button>

      {/* members */}
      <button
        className={`p-2 px-4 shadow text-sm border-x border-light dark:border-zinc-700  ${
          tab === "members"
            ? "bg-primary-light text-white"
            : "bg-white dark:bg-darkSecondary text-darkLight"
        }`}
        onClick={() => toggleTab("members")}
      >
        Members
      </button>

      {/* post requests */}
      <button
        className={`p-2 shadow text-sm border-x border-light dark:border-zinc-700  ${
          tab === "postRequests"
            ? "bg-primary-light text-white"
            : "bg-white dark:bg-darkSecondary text-darkLight"
        }`}
        onClick={() => toggleTab("postRequests")}
        hidden={!isModerator}
      >
        Post Requests
      </button>

      {/* join requests */}
      <button
        className={`p-2 shadow text-sm border-l border-light dark:border-zinc-700 rounded-r ${
          tab === "joinRequests"
            ? "bg-primary-light text-white"
            : "bg-white dark:bg-darkSecondary text-darkLight"
        }`}
        onClick={() => toggleTab("joinRequests")}
        hidden={!isModerator}
      >
        Join Requests
      </button>
    </div>
  );
}

export default TabToggle;
