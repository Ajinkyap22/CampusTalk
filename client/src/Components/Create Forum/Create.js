import { useState } from "react";
import { Link } from "react-router-dom";

function CreateForum() {
  const [checked, setChecked] = useState(false);
  // TODO apply similar font styles to join page too

  return (
    <main className="w-full bg-bubble h-full overflow-auto flex flex-col justify-center items-center m-0">
      {/* form */}
      <section className="bg-white rounded shadow-lg w-[90%] md:w-2/3 xl:w-1/2 2xl:w-1/3 mt-20 mb-10 inline-block 2xl:my-8">
        {/* title */}
        <h1 className="text-center font-bold mb-1 lg:mb-2 mt-5 lg:mt-8 text-primary text-xl lg:text-2xl 2xl:text-3xl">
          Create Your Institute's Forum
        </h1>
        <h2 className="text-center my-1 text-sm md:text-base lg:my-2 text-primary 2xl:text-xl">
          Tell us a bit about your institute
        </h2>

        <form className="px-5 md:px-8 py-2">
          {/* forum name */}
          <div className="my-6">
            <label htmlFor="forumName" className="text-sm 2xl:text-lg">
              Institute's Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="forumName"
              placeholder="Your institute's official name"
              className="mt-2 block w-full px-3 py-1.5 border border-gray-300 bg-[#f6f6f6] placeholder-[#818181] rounded-md text-sm 2xl:text-base shadow-sm 
              focus:outline-none focus:border-sky-500 focus:bg-white"
              required
            />
          </div>

          {/* address */}
          <div className="my-6">
            <label htmlFor="address" className="text-sm 2xl:text-lg">
              Institute's Address <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Your institute's address"
              className="mt-2 block w-full px-3 py-1.5 md:py-2 border border-gray-300 bg-[#f6f6f6] placeholder-[#818181] rounded-md text-sm 2xl:text-base shadow-sm 
              focus:outline-none focus:border-sky-500 focus:bg-white"
              required
            />
          </div>

          {/* website */}
          <div className="my-6">
            <label htmlFor="website" className="text-sm 2xl:text-lg">
              Institute's Website<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="website"
              placeholder="Your institute's official website"
              className="mt-2 block w-full px-3 py-1.5 md:py-2 border border-gray-300 bg-[#f6f6f6] placeholder-[#818181] rounded-md text-sm 2xl:text-base shadow-sm 
              focus:outline-none focus:border-sky-500 focus:bg-white"
              required
            />
          </div>

          {/* email */}
          <div className="my-6">
            <label htmlFor="email" className="text-sm 2xl:text-lg">
              Institute's email <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="Your institute's official email id"
              className="mt-2 block w-full px-3 py-1.5 md:py-2 border border-gray-300 bg-[#f6f6f6] placeholder-[#818181] rounded-md text-sm 2xl:text-base shadow-sm 
              focus:outline-none focus:border-sky-500 focus:bg-white"
              required
            />
          </div>

          {/* checkbox */}
          <div className="my-4 relative">
            <input
              type="checkbox"
              name="consent"
              id="consent"
              className="cursor-pointer"
              value={false}
              onChange={() => setChecked(!checked)}
              required
            />
            <label
              htmlFor="consent"
              className="text-xs mx-2 relative bottom-[0.1rem]"
              value="yes"
            >
              I understand that this information will be used for the institute
              verification process. Inaccurate information will result in the
              deletion of the created forum.
            </label>
          </div>

          {/* Submit */}
          <div className="my-4 md:my-5 float-right">
            <Link
              to="join-forum"
              className="px-2 md:px-3 py-2 mx-2 text-sm md:text-base 2xl:text-lg text-secondary"
            >
              Cancel
            </Link>
            <button className="px-2 md:px-3 py-2 mx-1 text-sm md:text-base 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
              Next
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreateForum;
