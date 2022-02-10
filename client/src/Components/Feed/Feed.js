import Nav from "./Nav";
import Filter from "./Filter";
import { useState } from "react";

function Feed() {
  const [activeFilter, setActiveFilter] = useState("latest");

  return (
    <main className="w-full h-full bg-[#f3f3f3]">
      <Nav />

      <div className="flex flex-col justify-center items-center mt-8">
        <Filter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>
    </main>
  );
}

export default Feed;
