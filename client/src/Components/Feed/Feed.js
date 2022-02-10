import Nav from "./Nav";
import Filter from "./Filter";
import { useState } from "react";
import HomeBox from "./HomeBox";

function Feed() {
  const [activeFilter, setActiveFilter] = useState("latest");

  return (
    <main className="w-full h-full bg-[#f3f3f3]">
      <Nav />

      <section className="flex justify-between items-start md:w-[70%] mx-auto">
        {/* posts and filters */}
        <div className="flex flex-col justify-center items-center mt-8">
          <Filter
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </div>

        {/* home info box */}
        <HomeBox />
      </section>
    </main>
  );
}

export default Feed;
