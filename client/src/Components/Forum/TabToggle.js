function TabToggle({ tab, setTab }) {
  function toggleTab() {
    setTab(tab === "posts" ? "members" : "posts");
  }

  return (
    <div className="text-center mb-8">
      <button
        className={`p-2 px-6 shadow text-sm rounded-l ${
          tab === "posts" ? "bg-primary-light text-white" : "bg-white"
        }`}
        onClick={toggleTab}
      >
        Posts
      </button>
      <button
        className={`p-2 shadow text-sm rounded-r ${
          tab === "members" ? "bg-primary-light text-white" : "bg-white"
        }`}
        onClick={toggleTab}
      >
        Members
      </button>
    </div>
  );
}

export default TabToggle;
