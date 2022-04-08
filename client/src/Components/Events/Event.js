import { TabContext } from "../../Contexts/TabContext";
import { FileContext } from "../../Contexts/FileContext";
import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Nav from "../Navbar/Nav";
import moment from "moment";
import EventMedia from "./EventMedia";

function Event({ event, title, events, setEvents, history }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [files, setFiles] = useContext(FileContext);

  useEffect(() => {
    setActiveTab("events");
  }, [activeTab]);

  useEffect(() => {
    document.title = title || `${event.name} | CampusTalk`;
  }, [title]);

  useEffect(() => {
    let file = {
      file: event.document,
      name: `${event.name}.${event.document.split(".")[1]}`,
      type: "doc",
    };

    let arr = event.images.map((image) => {
      return {
        file: image,
        name: `${event.name}.${image.split(".")[1]}`,
        type: "image",
      };
    });

    setFiles([...files, ...arr, file]);
  }, []);

  return (
    <main className="w-full h-full overflow-auto bg-[#F0F2F5] dark:bg-dark">
      <Nav />

      <div className="grid grid-cols-5">
        {/* left side */}
        <div className="col-span-3">
          <section className="px-6 my-8">
            {/* name */}
            <h1 className="text-3xl my-2 text-primary dark:text-primary-light">
              {event.name}
            </h1>

            {/* forum */}
            <Link
              to={`/forums/${event.forum._id}`}
              className="text-lg dark:text-darkLight"
            >
              Organized by :{" "}
              <span className="underline underline-offset-1 hover:text-primary dark:hover:text-primary">
                {event.forum.forumName}
              </span>
            </Link>
          </section>

          {/* event info */}
          <section className="px-6 my-8 w-2/3">
            <h2 className="text-xl my-4 text-primary dark:text-primary-light">
              About the event
            </h2>

            {/* description */}
            <p className="my-2 dark:text-darkLight">{event.description}</p>

            {/* Event date */}
            {event.date && (
              <div className="mt-4">
                <h2 className="text-xl text-primary dark:text-primary-light">
                  Date
                </h2>
                <p className="my-2 dark:text-darkLight">
                  {moment(event.date).format("MMMM Do YYYY")}
                </p>
              </div>
            )}

            {/* Event venue */}
            {event.venue && (
              <div className="mt-4">
                <h2 className="text-xl  text-primary dark:text-primary-light">
                  Venue
                </h2>
                <p className="my-2 dark:text-darkLight">{event.venue}</p>
              </div>
            )}
          </section>

          {/* event registration link */}
          {event.link && (
            <section className="px-6 my-8 w-2/3">
              <h2 className="text-xl my-4 text-primary dark:text-primary-light">
                Registration
              </h2>

              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-primary-light underline"
              >
                {event.link}
              </a>
            </section>
          )}
        </div>

        {/* right side */}
        <EventMedia
          video={event.video}
          doc={event.document}
          images={event.images}
          name={event.name}
        />
      </div>
    </main>
  );
}

export default Event;
