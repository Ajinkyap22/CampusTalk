import { useState } from "react";
import { Link } from "react-router-dom";

function UserInfo({ setUser, user }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <div className="w-full bg-bubble flex relative flex-col justify-center items-center">
      <section className="bg-white rounded shadow-lg p-5 w-[90%] md:w-2/3 lg:w-[40%] 2xl:w-1/3 my-14 md:my-20 2xl:my-28 mb-20 md:mb-14">
        <h1 className="text-primary text-center text-2xl">
          Tell us a bit about yourself
        </h1>

        <form className="px-5 md:px-6 py-3">
          {/* picture */}
          <div className="my-4"></div>

          {/* first name */}
          <div className="my-4">
            <label
              htmlFor="firstName"
              className="text-sm md:text-base 2xl:text-lg"
            >
              First Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              className="mt-2 block w-full px-3 py-1.5 md:py-2 border-2 border-gray-300 bg-[#f6f6f6] placeholder-[#818181] rounded-md text-sm 2xl:text-base shadow-sm 
              focus:outline-none focus:border-sky-500 focus:bg-white"
              required
            />
          </div>

          {/* last name */}
          <div className="my-4">
            <label
              htmlFor="lastName"
              className="text-sm md:text-base 2xl:text-lg"
            >
              Last Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="mt-2 block w-full px-3 py-1.5 md:py-2 border-2 border-gray-300 bg-[#f6f6f6] placeholder-[#818181] rounded-md text-sm 2xl:text-base shadow-sm 
              focus:outline-none focus:border-sky-500 focus:bg-white"
              required
            />
          </div>

          {/* Submit */}
          <div className="my-4 mt-8">
            <button className="px-2 md:px-3 py-2 mr-1  text-sm md:text-base 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
              Next
            </button>
            <Link
              to="/"
              className="px-2 md:px-3 text-sm md:text-base 2xl:text-lg py-2 ml-1 text-[#818181]"
            >
              Go Back
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}

export default UserInfo;
