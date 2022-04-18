import { UserContext } from "../../Contexts/UserContext";
import { EventContext } from "../../Contexts/EventContext";
import { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import Input from "../FormControl/Input";
import ActionButtons from "../FormControl/ActionButtons";
import axios from "axios";

function EventForm({ history }) {
  const [user, setUser] = useContext(UserContext);
  const [events, setEvents] = useContext(EventContext);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
    date: "",
    time: "",
    venue: "",
    forum: null,
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
      .post("/api/events/create-event", formData, headers)
      .then((res) => {
        setEvents([...events, res.data]);

        history.push(`/events/${res.data._id}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <form className="px-5 md:px-8 py-2" onSubmit={handleSubmit}>
      {/* event name */}
      <Input
        type="text"
        name="name"
        label="Event's Name"
        callback={(e) => handleChange(e)}
        placeholder="Name of the event"
        required={true}
        setState={false}
      />

      {/* event description */}
      <div className="my-4 relative">
        <label
          htmlFor="description"
          className="text-xs lg:text-sm 2xl:text-lg dark:text-darkLight"
        >
          Event Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          cols="30"
          rows="8"
          value={formData.description}
          className="w-full mt-2 px-3 py-1.5 border-2 border-gray-300 bg-[#f6f6f6] rounded-lg text-xs lg:text-sm 2xl:text-base shadow-sm focus:outline-none focus:border-primary-500"
          placeholder="Information about the event e.g. What is the event about, rules, themes, requirements etc."
          onChange={handleChange}
          required
        ></textarea>
      </div>

      {/* date */}
      <div className="my-4 relative">
        <label
          htmlFor="date"
          className="text-xs lg:text-sm 2xl:text-lg dark:text-darkLight"
        >
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          className="w-full mt-2 px-3 py-1.5 border-2 border-gray-300 bg-[#f6f6f6] rounded-lg text-xs lg:text-sm 2xl:text-base shadow-sm focus:outline-none focus:border-primary-500"
          placeholder="Date of the event"
          onChange={handleChange}
          required
        />
      </div>

      {/* time */}
      <div className="my-4 relative">
        <label
          htmlFor="time"
          className="text-xs lg:text-sm 2xl:text-lg dark:text-darkLight"
        >
          Time
        </label>

        <input
          type="time"
          name="time"
          value={formData.time}
          className="w-full mt-2 px-3 py-1.5 border-2 border-gray-300 bg-[#f6f6f6] rounded-lg text-xs lg:text-sm 2xl:text-base shadow-sm focus:outline-none focus:border-primary-500"
          placeholder="Time of the event"
          onChange={handleChange}
        />
      </div>

      {/* venue */}
      <Input
        type="text"
        name="venue"
        label="Event's Venue"
        callback={(e) => handleChange(e)}
        placeholder="Venue of the event"
        required={false}
        setState={false}
      />

      {/* link */}
      <div className="my-4 relative">
        <label
          htmlFor="website"
          className="text-xs lg:text-sm 2xl:text-lg dark:text-darkLight"
        >
          Registration Link
        </label>
        <input
          type="url"
          name="link"
          onChange={handleChange}
          value={formData.link}
          placeholder="Link to register for the event"
          className="mt-2 block w-full px-3 py-1.5 border border-gray-300 bg-[#f6f6f6] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm placeholder-[#818181] 
              focus:outline-none focus:border-sky-500"
          onBlur={checkUrl}
        />
      </div>

      {/* forum */}
      <div className="my-4 relative">
        <label
          htmlFor="forum"
          className="text-xs lg:text-sm 2xl:text-lg dark:text-darkLight"
        >
          Forum <span className="text-red-500">*</span>
        </label>

        <select
          name="forum"
          onChange={handleChange}
          className="mt-2 block w-full px-3 py-1.5 border border-gray-300 bg-[#f6f6f6] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm placeholder-[#818181]
              focus:outline-none focus:border-sky-500"
          required
        >
          <option value="">Select a forum</option>
          {user?.forums?.map((forum) => (
            <option key={forum?._id} value={forum?._id}>
              {forum?.forumName}
            </option>
          ))}
        </select>
      </div>

      {/* submit */}
      <ActionButtons
        path="/events"
        action="Create"
        classes="my-4 md:my-5 2xl:my-6 float-right"
      />
    </form>
  );
}

export default withRouter(EventForm);
