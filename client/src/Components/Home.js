import Navbar from "./Navbar";
import Hero from "../assets/Hero.png";
import Carousel from "./Carousel";
import Accordion from "./Accordion";

const data1 = [
  "CampusTalk is a platform for institutes to host asynchronous online discussion forums where students can interact with their peers and teachers regarding academic and non academic activities in their institute.",
  "CampusTalk provides forum's based on Commuinty Question Answering (CQA) system where members can start a conversation with other members in the form of posts.",
  "CampusTalk forums enable members to voluntarily read and respond to posts in their own time through multiple means such as upvotes, downvotes and replies, with an optional anonymous environment.",
];

const data2 = [
  "In today's fast growing world, there is a lot of information being thrown at students and it can be overwhelming and confusing at times, especially for new or introverted students.",
  "Students go through a large amount of academic and non-academic activities throughout the year; therefore lack of information or inaccurate information can lead to many complications.",
  "CampusTalk provides platform for students to ask for any information related to their institute's academic and non-academic activities which will be provided by their peers and teachers.",
];

function Home() {
  return (
    <div className="h-full bg-greek-vase">
      <Navbar />

      {/* Hero section */}
      <section className="m-3 mt-16 md:mt-10 flex flex-col p-3 py-5 md:py-20 2xl:py-20">
        <div className="flex items-center justify-around md:p-2">
          <div>
            <p className="uppercase text-secondary font-bold text-[.45rem] tracking-wider md:text-xs md:tracking-widest 2xl:text-lg">
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

            <button className="bg-primary self-start text-white p-2 px-3 2xl:p-3 2xl:px-5 mt-3 md:mt-5 text-xs md:text-base xl:text-lg 2xl:text-3xl rounded-full">
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
      <section
        className="bg-picture text-center text-white mt-20 p-2 2xl:p-4"
        id="about"
      >
        <h1 className="font-bold text-xl md:text-3xl 2xl:text-5xl 2xl:pt-14 pt-8">
          So, what is CampusTalk anyway?
        </h1>

        <div className="hidden lg:grid lg:gap-x-20 lg:grid-cols-3 p-10 mt-2 2xl:gap-x-40 2xl:px-28 2xl:text-2xl">
          <div className="border-2 rounded my-4 border-white p-4 py-10 leading-relaxed tracking-wide 2xl:p-8 2xl:py-12">
            CampusTalk is a platform for institutes to host asynchronous online
            discussion forums where students can interact with their peers and
            teachers regarding academic and non academic activities in their
            institute.
          </div>

          <div className="border-2 rounded my-4 border-white p-4 py-10 leading-relaxed tracking-wide 2xl:p-8 2xl:py-12">
            CampusTalk provides forum’s based on Commuinty Question Answering
            (CQA) system where members can start a conversation with other
            members in the form of posts.
          </div>

          <div className="border-2 rounded my-4 border-white p-4 py-10 leading-relaxed tracking-wide 2xl:p-8 2xl:py-12">
            CampusTalk forums enable members to voluntarily read and respond to
            posts in their own time through multiple means such as upvotes,
            downvotes and replies, with an optional anonymous environment.
          </div>
        </div>

        <Carousel data={data1} />

        <h1 className="font-bold text-xl md:text-3xl 2xl:text-5xl 2xl:pt-14 pt-8">
          Why do we need CampusTalk?
        </h1>

        <Carousel data={data2} />

        <div className="hidden lg:grid lg:gap-x-20 lg:grid-cols-3 p-10 mt-2 2xl:gap-x-40 2xl:px-28 2xl:text-2xl">
          <div className="border-2 rounded my-4 border-white p-4 py-10 leading-relaxed tracking-wide 2xl:p-8 2xl:py-12">
            In today’s fast growing world, there is a lot of information being
            thrown at students and it can be overwhelming and confusing at
            times, especially for new or introverted students.
          </div>

          <div className="border-2 rounded my-4 border-white p-4 py-10 leading-relaxed tracking-wide 2xl:p-8 2xl:py-12">
            Students go through a large amount of academic and non-academic
            activities throughout the year; therefore lack of information or
            inaccurate information can lead to many complications.
          </div>

          <div className="border-2 rounded my-4 border-white p-4 py-10 leading-relaxed tracking-wide 2xl:p-8 2xl:py-12">
            CampusTalk provides platform for students to ask for any information
            related to their institute’s academic and non-academic activities
            which will be provided by their peers and teachers.
          </div>
        </div>
      </section>

      {/* How it works */}
      <div className="relative text-center mt-20" id="working">
        <div className="shape flex flex-col">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 700 120"
            fill="#0278E4"
          >
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
          </svg>

          <div className="bg-primary py-5 border border-primary text-white">
            <div className="mx-5 lg:mx-20 bg-light border-2 border-light rounded-xl 2xl:mx-40 2xl:p-5">
              <h1 className="text-2xl md:text-3xl lg:text-4xl p-5 2xl:text-5xl 2xl:p-10">
                How does it work?
              </h1>

              <div className="flex flex-col md:grid md:grid-cols-5 jmd:ustify-items-center mt-5 md:p-5 lg:p-7 2xl:p-12">
                <div className="mb-8 mx-4 md:my-0 md:mx-0 flex flex-col items-center">
                  {/* icon */}
                  <svg
                    width="64"
                    height="57"
                    viewBox="0 0 64 57"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="p-1 lg:p-0"
                  >
                    <path
                      d="M52 1.88892H12C6.479 1.88892 2 5.86847 2 10.7778V46.3334C2 51.2427 6.479 55.2222 12 55.2222H52C57.523 55.2222 62 51.2427 62 46.3334V10.7778C62 5.86847 57.523 1.88892 52 1.88892ZM57 40.7031C57.0003 41.6759 56.7849 42.6392 56.3663 43.5379C55.9477 44.4367 55.334 45.2534 54.5603 45.9413C53.7866 46.6292 52.868 47.1749 51.857 47.5472C50.846 47.9195 49.7623 48.1111 48.668 48.1111H15.334C13.1237 48.1111 11.0039 47.3307 9.44097 45.9414C7.87804 44.5521 7 42.6679 7 40.7031V11.0747C7 9.10997 7.87804 7.22572 9.44097 5.83645C11.0039 4.44718 13.1237 3.66669 15.334 3.66669H48.668C49.7623 3.66669 50.846 3.85832 51.857 4.23063C52.868 4.60294 53.7866 5.14863 54.5603 5.83655C55.334 6.52447 55.9477 7.34114 56.3663 8.23991C56.7849 9.13868 57.0003 10.1019 57 11.0747V40.7031Z"
                      fill="white"
                    />
                    <path
                      d="M38 40.1111H31.893V19.648C29.661 21.5022 27.03 22.8737 24 23.7626V18.8355C25.594 18.3724 27.326 17.4915 29.195 16.1982C31.066 14.9048 32.347 13.3928 33.043 11.6666H38V40.1111Z"
                      fill="white"
                    />
                  </svg>

                  {/* title */}
                  <p className="my-6 lg:my-8 text-base lg:text-2xl 2xl:text-4xl">
                    Sign up and join your institute’s forum
                  </p>

                  {/* description */}
                  <p className="text-xs lg:text-base 2xl:text-2xl">
                    After signing up, select your institute from the list to
                    join it’s forum or create one if it’s not in the list.
                  </p>
                </div>

                <svg
                  width="93"
                  height="41"
                  viewBox="0 0 93 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="self-center hidden md:block md:mx-auto"
                >
                  <path
                    d="M85.2501 18.8229L58.1251 4.09314V12.2763C11.8072 12.2763 6.46356 28.1157 7.75006 36.8259C9.69531 32.4315 10.5982 25.3694 58.1251 25.3694V33.5526L85.2501 18.8229Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="my-8 mx-4 md:my-0 md:mx-0 flex flex-col items-center">
                  {/* icon */}
                  <svg
                    width="64"
                    height="57"
                    viewBox="0 0 64 57"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="p-1 lg:p-0"
                  >
                    <path
                      d="M52 1.88892H12C6.479 1.88892 2 5.86847 2 10.7778V46.3334C2 51.2427 6.479 55.2222 12 55.2222H52C57.523 55.2222 62 51.2427 62 46.3334V10.7778C62 5.86847 57.523 1.88892 52 1.88892ZM57 40.7031C57.0003 41.6759 56.7849 42.6392 56.3663 43.5379C55.9477 44.4367 55.334 45.2534 54.5603 45.9413C53.7866 46.6292 52.868 47.1749 51.857 47.5472C50.846 47.9195 49.7623 48.1111 48.668 48.1111H15.334C13.1237 48.1111 11.0039 47.3307 9.44097 45.9414C7.87804 44.5521 7 42.6679 7 40.7031V11.0747C7 9.10997 7.87804 7.22572 9.44097 5.83645C11.0039 4.44718 13.1237 3.66669 15.334 3.66669H48.668C49.7623 3.66669 50.846 3.85832 51.857 4.23063C52.868 4.60294 53.7866 5.14863 54.5603 5.83655C55.334 6.52447 55.9477 7.34114 56.3663 8.23991C56.7849 9.13868 57.0003 10.1019 57 11.0747V40.7031Z"
                      fill="white"
                    />
                    <path
                      d="M42 35.0675V40.1111H22C22.2164 38.203 22.8804 36.3565 23.949 34.6906C25.033 32.9822 27.17 30.72 30.365 27.8969C32.937 25.6177 34.513 24.072 35.097 23.2595C35.88 22.1395 36.273 21.0302 36.273 19.9368C36.273 18.7253 35.931 17.7946 35.248 17.1431C34.565 16.4915 33.621 16.1671 32.416 16.1671C31.225 16.1671 30.277 16.5093 29.574 17.1911C28.869 17.8737 28.463 19.0088 28.355 20.592L22.669 20.0506C23.007 17.0631 24.071 14.9191 25.857 13.6168C27.645 12.3173 29.879 11.6666 32.559 11.6666C35.495 11.6666 37.805 12.4204 39.483 13.9271C41.161 15.4337 42 17.3093 42 19.5502C42 20.8248 41.76 22.04 41.279 23.1928C40.799 24.3475 40.037 25.5537 38.996 26.816C38.305 27.6524 37.058 28.8577 35.258 30.4284C33.459 32.0017 32.319 33.0444 31.838 33.56C31.394 34.0269 31.0028 34.5316 30.67 35.0666H42V35.0675Z"
                      fill="white"
                    />
                  </svg>

                  {/* title */}
                  <p className="my-6 lg:my-8 text-base lg:text-2xl 2xl:text-4xl">
                    Read and create posts
                  </p>

                  {/* description */}
                  <p className="text-xs lg:text-base 2xl:text-2xl">
                    Read posts created by other members & create posts with an
                    optional annonymous environment.
                  </p>
                </div>

                <svg
                  width="93"
                  height="41"
                  viewBox="0 0 93 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="self-center hidden md:block md:mx-auto"
                >
                  <path
                    d="M85.2501 18.8229L58.1251 4.09314V12.2763C11.8072 12.2763 6.46356 28.1157 7.75006 36.8259C9.69531 32.4315 10.5982 25.3694 58.1251 25.3694V33.5526L85.2501 18.8229Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="my-8 mx-4 md:my-0 md:mx-0 flex flex-col items-center">
                  {/* icon */}
                  <svg
                    width="64"
                    height="58"
                    viewBox="0 0 64 58"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="p-1 lg:p-0"
                  >
                    <path
                      d="M52 2.66675H12C6.479 2.66675 2 6.6463 2 11.5556V47.1112C2 52.0205 6.479 56.0001 12 56.0001H52C57.523 56.0001 62 52.0205 62 47.1112V11.5556C62 6.6463 57.523 2.66675 52 2.66675ZM57 41.481C57.0003 42.4537 56.7849 43.417 56.3663 44.3158C55.9477 45.2145 55.334 46.0312 54.5603 46.7191C53.7866 47.407 52.868 47.9527 51.857 48.325C50.846 48.6973 49.7623 48.889 48.668 48.889H15.334C13.1237 48.889 11.0039 48.1085 9.44097 46.7192C7.87804 45.3299 7 43.4457 7 41.481V11.8525C7 9.8878 7.87804 8.00355 9.44097 6.61428C11.0039 5.22501 13.1237 4.44453 15.334 4.44453H48.668C49.7623 4.44453 50.846 4.63615 51.857 5.00846C52.868 5.38077 53.7866 5.92647 54.5603 6.61439C55.334 7.30231 55.9477 8.11897 56.3663 9.01774C56.7849 9.91651 57.0003 10.8798 57 11.8525V41.481Z"
                      fill="white"
                    />
                    <path
                      d="M22 33.0222L27.586 32.3938C27.764 33.7111 28.242 34.72 29.024 35.416C29.803 36.112 30.749 36.4613 31.858 36.4613C33.047 36.4613 34.051 36.0427 34.866 35.208C35.68 34.3716 36.089 33.2445 36.089 31.824C36.089 30.4818 35.698 29.4178 34.917 28.6329C34.136 27.8462 33.187 27.456 32.063 27.456C31.323 27.456 30.44 27.5876 29.413 27.8533L30.05 23.5022C31.611 23.5405 32.802 23.2258 33.624 22.5609C34.444 21.896 34.856 21.0125 34.856 19.9102C34.856 18.9725 34.555 18.2249 33.952 17.6693C33.35 17.112 32.548 16.8329 31.55 16.8329C30.564 16.8329 29.722 17.1485 29.025 17.7822C28.326 18.416 27.902 19.3396 27.752 20.5565L22.434 19.7218C22.803 18.0365 23.362 16.6907 24.108 15.6836C24.854 14.6765 25.893 13.8853 27.229 13.3085C28.561 12.7325 30.057 12.4445 31.713 12.4445C34.547 12.4445 36.82 13.2791 38.529 14.9529C39.939 16.3209 40.644 17.864 40.644 19.5885C40.644 22.0329 39.201 23.984 36.312 25.4409C38.037 25.7831 39.416 26.5485 40.451 27.7396C41.484 28.9307 42 30.368 42 32.0542C42 34.4987 41.035 36.5822 39.105 38.304C37.174 40.0258 34.771 40.8889 31.898 40.8889C29.173 40.8889 26.914 40.1636 25.121 38.7138C23.328 37.2622 22.289 35.3645 22 33.0222Z"
                      fill="white"
                    />
                  </svg>

                  {/* title */}
                  <p className="my-6 lg:my-8 text-base lg:text-2xl 2xl:text-4xl">
                    Read and send responses to posts
                  </p>

                  {/* description */}
                  <p className="text-xs lg:text-base 2xl:text-2xl">
                    Respond to posts with information/resources and read
                    responses posts by other members.
                  </p>
                </div>
              </div>

              <button className="bg-white rounded-full p-3 md:p-4 text-sm md:text-base my-5 font-bold text-primary 2xl:text-2xl 2xl:my-10">
                Sign up now &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="bg-primary py-20 text-white" id="faq">
        <h1 className="text-2xl px-2 leading-normal md:leading-normal md:text-5xl text-center">
          Frequently Asked Questions (FAQ)
        </h1>

        <Accordion />
      </section>
    </div>
  );
}

export default Home;
