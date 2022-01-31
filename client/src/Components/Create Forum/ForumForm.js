import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../UserContext";

// TODO check if forum already exists before creating

let headers = {
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
  },
};

function ForumForm(props) {
  const [checked, setChecked] = useState(false);
  const [user] = useContext(UserContext);

  const [formData, setFormData] = useState({
    forumName: "",
    address: "",
    website: "",
    email: "",
  });

  const handleChange = function (e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/api/forums/create-forum`, formData, headers)
      .then((res) => {
        // redirect
        props.history.push("/");
        // make moderator
        makeModerator(res.data._id);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function makeModerator(forumId) {
    if (!user) return;

    let body = { id: user._id };

    axios
      .post(`/api/forums/${forumId}/moderators/make`, body, headers)
      .then((res) => {
        // set forums
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form className="px-5 md:px-8 py-2" onSubmit={handleSubmit}>
      {/* forum name */}
      <div className="my-4 lg:my-6 2xl:my-8">
        <label htmlFor="forumName" className="text-xs lg:text-sm 2xl:text-lg">
          Institute's Name <span className="text-red-600">*</span>
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="forumName"
          placeholder="Your institute's official name"
          className="mt-2 block w-full px-3 py-1.5 border border-gray-300 bg-[#f6f6f6] placeholder-[#818181] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm 
              focus:outline-none focus:border-sky-500 focus:bg-white"
          required
        />
      </div>

      {/* address */}
      <div className="my-4 lg:my-6 2xl:my-8">
        <label htmlFor="address" className="text-xs lg:text-sm 2xl:text-lg">
          Institute's Address <span className="text-red-600">*</span>
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="address"
          placeholder="Your institute's address"
          className="mt-2 block w-full px-3 py-1.5 border border-gray-300 bg-[#f6f6f6] placeholder-[#818181] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm 
              focus:outline-none focus:border-sky-500 focus:bg-white"
          required
        />
      </div>

      {/* website */}
      <div className="my-4 lg:my-6 2xl:my-8">
        <label htmlFor="website" className="text-xs lg:text-sm 2xl:text-lg">
          Institute's Website<span className="text-red-600">*</span>
        </label>
        <input
          onChange={handleChange}
          type="url"
          name="website"
          placeholder="Your institute's official website"
          className="mt-2 block w-full px-3 py-1.5 border border-gray-300 bg-[#f6f6f6] placeholder-[#818181] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm 
              focus:outline-none focus:border-sky-500 focus:bg-white"
          required
        />
      </div>

      {/* email */}
      <div className="my-4 lg:my-6 2xl:my-8">
        <label htmlFor="email" className="text-xs lg:text-sm 2xl:text-lg">
          Institute's email <span className="text-red-600">*</span>
        </label>
        <input
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Your institute's official email id"
          className="mt-2 block w-full px-3 py-1.5 border border-gray-300 bg-[#f6f6f6] placeholder-[#818181] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm 
              focus:outline-none focus:border-sky-500 focus:bg-white"
          required
        />
      </div>

      {/* checkbox */}
      <div className="mt-6 md:my-4 relative 2xl:mt-6">
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
          className="text-xsm lg:text-xs mx-2 relative bottom-[0.2rem] lg:bottom-[0.1rem] "
          value="yes"
        >
          I understand that this information will be used for the institute
          verification process. Inaccurate information will result in the
          deletion of the created forum.
        </label>
      </div>

      {/* Submit */}
      <div className="my-4 md:my-5 2xl:my-6 float-right">
        <Link
          to="join-forum"
          className="px-2 md:px-3 py-1.5 lg:py-2 mx-2 text-sm lg:text-base 2xl:text-lg text-secondary"
        >
          Cancel
        </Link>
        <button className="px-2 md:px-3 py-1.5 lg:py-2 mx-1 text-sm lg:text-base 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700">
          Next
        </button>
      </div>
    </form>
  );
}

export default withRouter(ForumForm);
