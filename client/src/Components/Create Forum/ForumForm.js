import { ForumContext } from "../../Contexts/ForumContext";
import { UserContext } from "../../Contexts/UserContext";
import { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Input from "../FormControl/Input";
import ActionButtons from "../FormControl/ActionButtons";

function ForumForm(props) {
  const [checked, setChecked] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [forums, setForums] = useContext(ForumContext);
  const [status, setStatus] = useState(0);

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

  function checkUrl(e) {
    let string = e.target.value;

    if (!string.match(/^https?:/) && string.length) {
      string = "https://" + string;

      e.target.value = string;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    axios
      .post(`/api/forums/create-forum`, formData, headers)
      .then((res) => {
        // make moderator
        makeModerator(res.data._id);
        // add forum to user's forums
        setForums((forums) => [...forums, res.data]);
        // redirect
        // props.history.push(`forums/${res.data._id}`);
        props.history.push(`/forums/${res.data._id}`);
      })
      .catch((err) => {
        setStatus(err?.response?.status || 0);
      });
  }

  function makeModerator(forumId) {
    if (!user) return;

    let body = { id: user._id };

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    axios
      .post(`/api/forums/${forumId}/moderators/make`, body, headers)
      .then((res) => {
        setUser((user) => ({ ...user, forums: [...user.forums, res.data] }));
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form className="px-5 md:px-8 py-2" onSubmit={handleSubmit}>
      {/* forum name */}
      <Input
        type="text"
        name="forumName"
        label="Institute's Name"
        callback={(e) => handleChange(e)}
        placeholder="Your institute's official name"
        required={true}
        setState={false}
      />

      {/* address */}
      <Input
        type="text"
        name="address"
        label="Institute's Address"
        callback={(e) => handleChange(e)}
        placeholder="Your institute's address"
        required={true}
        setState={false}
      />

      {/* website */}
      <div className="my-4 relative">
        <label htmlFor="website" className="text-xs lg:text-sm 2xl:text-lg">
          Institute's Website
          <span className="text-red-600">*</span>
        </label>
        <input
          type="url"
          name="website"
          onChange={handleChange}
          placeholder="Your institute's official website"
          className="mt-2 block w-full px-3 py-1.5 border border-gray-300 bg-[#f6f6f6] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm placeholder-[#818181] 
              focus:outline-none focus:border-sky-500"
          required
          onBlur={checkUrl}
        />
      </div>

      {/* email */}
      <Input
        type="email"
        name="email"
        label="Institute's email"
        callback={(e) => handleChange(e)}
        placeholder="Your institute's official email id"
        required={true}
        setState={false}
      />

      <p
        className="mt-3 text-sm text-red-600"
        hidden={status === 409 ? false : true}
      >
        A forum with the same email address or website already exists. Please
        make sure your institute's forum doesn't already exist.
      </p>

      {/* checkbox */}
      <div className="mt-6 relative">
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
      <ActionButtons
        path="join-forum"
        action="Next"
        classes="my-4 md:my-5 2xl:my-6 float-right"
      />
    </form>
  );
}

export default withRouter(ForumForm);
