import Navbar from "./Navbar";
import Hero from "../assets/Hero.png";

function Home() {
  return (
    <div className="h-full bg-greek-vase">
      <Navbar />

      {/* Hero section */}
      <section className="m-3 mt-5 flex flex-col p-3 md:py-12">
        <div className="flex items-center justify-around md:p-2">
          <div>
            <p className="uppercase text-secondary font-bold text-[.45rem] tracking-wider md:text-sm md:tracking-widest 2xl:text-lg">
              A tool to help you socialize and learn
            </p>
            <p className="font-[1000] text-2xl md:text-5xl lg:text-6xl 2xl:text-8xl leading-10 md:leading-normal lg:leading-normal 2xl:leading-normal">
              Your College
            </p>
            <p className="font-[1000] text-2xl md:text-5xl lg:text-6xl 2xl:text-8xl leading-10 md:leading-normal lg:leading-normal 2xl:leading-normal">
              life made
            </p>
            <p className="font-[1000] text-2xl md:text-5xl lg:text-6xl 2xl:text-8xl leading-10 md:leading-normal lg:leading-normal 2xl:leading-normal">
              easy
            </p>
            <svg
              width="140"
              height="31"
              viewBox="0 0 173 31"
              fill="none"
              className="w-1/3 h-1/2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 27C31.673 14.9753 103.415 -5.46662 169 8.96299"
                stroke="#0278E4"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <button className="bg-primary self-start text-white p-2 px-3 2xl:p-3 2xl:px-4 mt-3 md:mt-5 text-xs md:text-base xl:text-lg 2xl:text-2xl rounded-full">
              Get Started
            </button>
          </div>

          <img
            src={Hero}
            alt=""
            className="max-h-full w-auto h-28 md:h-72 lg:h-96 2xl:h-128 object-contain"
          />
        </div>
      </section>

      {/* About section */}
      <section className="bg-picture text-center text-white mt-20 p-2">
        <h1 className="font-bold text-3xl pt-8">
          So, what is CampusTalk anyway?
        </h1>

        <div className="grid gap-x-20 grid-cols-3 p-10 mt-2">
          <div className="border-2 rounded border-white p-2 py-10 leading-relaxed">
            CampusTalk is a platform for institutes to host asynchronous online
            discussion forums where students can interact with their peers and
            teachers regarding academic and non academic activities in their
            institute.
          </div>

          <div className="border-2 rounded border-white p-2 py-10 leading-relaxed">
            CampusTalk provides forum’s based on Commuinty Question Answering
            (CQA) system where members can start a conversation with other
            members in the form of posts.
          </div>

          <div className="border-2 rounded border-white p-2 py-10 leading-relaxed">
            CampusTalk forums enable members to voluntarily read and respond to
            posts in their own time through multiple means such as upvotes,
            downvotes and replies, with an optional anonymous environment.
          </div>
        </div>

        <h1 className="font-bold text-3xl pt-8">Why do we need CampusTalk?</h1>

        <div className="grid gap-x-20 grid-cols-3 p-10 mt-2">
          <div className="border-2 rounded border-white p-2 py-10 leading-relaxed">
            In today’s fast growing world, there is a lot of information being
            thrown at students and it can be overwhelming and confusing at
            times, especially for new or introverted students.
          </div>

          <div className="border-2 rounded border-white p-2 py-10 leading-relaxed">
            Students go through a large amount of academic and non-academic
            activities throughout the year; therefore lack of information or
            inaccurate information can lead to many complications.
          </div>

          <div className="border-2 rounded border-white p-2 py-10 leading-relaxed">
            CampusTalk provides platform for students to ask for any information
            related to their institute’s academic and non-academic activities
            which will be provided by their peers and teachers.
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
