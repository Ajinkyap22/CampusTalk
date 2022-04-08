import { TabContext } from "../../Contexts/TabContext";
import { UserContext } from "../../Contexts/UserContext";
import { useEffect, useState, useContext } from "react";
import Nav from "../Navbar/Nav";
import Input from "../FormControl/Input";

function CreateEvent({ title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [user, setUser] = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
    date: "",
    time: "",
    venue: "",
    forum: null,
  });

  useEffect(() => {
    setActiveTab("events");
  }, [activeTab]);

  useEffect(() => {
    document.title = title || `Create Event | CampusTalk`;
  }, [title]);

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
  return (
    <main className="w-full bg-bubble h-full flex flex-col items-center overflow-auto pb-10">
      <Nav />

      <section className="bg-white dark:bg-darkSecondary rounded shadow-base w-[90%] md:w-2/3 xl:w-1/2 2xl:w-1/3 md:mt-10 inline-block 2xl:my-8">
        <h1 className="text-center font-bold mb-1 lg:mb-2 mt-5 lg:mt-8 text-primary dark:text-primary-light text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
          Create Event
        </h1>
        <h2 className="text-center mt-1 text-xs md:text-mxs lg:mt-1 text-primary dark:text-primary-light 2xl:text-xl mx-auto">
          An event can be any activity that students or faculty can participate
          in
        </h2>

        {/* forum */}
        <form className="px-5 md:px-8 py-2">
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
              className="w-full mt-2 px-3 py-1.5 border-2 border-gray-300 bg-[#f6f6f6] rounded-lg text-xs lg:text-sm 2xl:text-base shadow-sm focus:outline-none focus:border-primary-500"
              placeholder="Description of the event"
              onChange={handleChange}
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
              className="w-full mt-2 px-3 py-1.5 border-2 border-gray-300 bg-[#f6f6f6] rounded-lg text-xs lg:text-sm 2xl:text-base shadow-sm focus:outline-none focus:border-primary-500"
              placeholder="Date of the event"
              onChange={handleChange}
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
              placeholder="Link to register for the event"
              className="mt-2 block w-full px-3 py-1.5 border border-gray-300 bg-[#f6f6f6] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm placeholder-[#818181] 
              focus:outline-none focus:border-sky-500"
              onBlur={checkUrl}
            />
          </div>

          {/* forum */}
        </form>
      </section>
    </main>
  );
}

export default CreateEvent;
