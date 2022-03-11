function TabToggle({ tab, setTab, isModerator }) {
  function toggleTab(tabName) {
    setTab(tabName);
  }

  return (
    <div className="text-center mb-8">
      {/* posts */}
      <button
        className={`p-2 px-8 shadow text-sm border-r border-light rounded-l ${
          tab === "posts" ? "bg-primary-light text-white" : "bg-white"
        }`}
        onClick={() => toggleTab("posts")}
      >
        Posts
      </button>

      {/* members */}
      <button
        className={`p-2 px-4 shadow text-sm border-x border-light  ${
          tab === "members" ? "bg-primary-light text-white" : "bg-white"
        }`}
        onClick={() => toggleTab("members")}
      >
        Members
      </button>

      {/* post requests */}
      <button
        className={`p-2 shadow text-sm border-x border-light  ${
          tab === "postRequests" ? "bg-primary-light text-white" : "bg-white"
        }`}
        onClick={() => toggleTab("postRequests")}
        hidden={!isModerator}
      >
        Post Requests
      </button>

      {/* join requests */}
      <button
        className={`p-2 shadow text-sm border-l border-light rounded-r ${
          tab === "joinRequests" ? "bg-primary-light text-white" : "bg-white"
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
