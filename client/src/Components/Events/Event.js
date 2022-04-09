import { TabContext } from "../../Contexts/TabContext";
import { FileContext } from "../../Contexts/FileContext";
import { UserContext } from "../../Contexts/UserContext";
import { useEffect, useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Nav from "../Navbar/Nav";
import moment from "moment";
import EventMedia from "./EventMedia";
import axios from "axios";

function Event({ event, title, events, setEvents, history }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [user, setUser] = useContext(UserContext);
  const [files, setFiles] = useContext(FileContext);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    setActiveTab("events");
  }, [activeTab]);

  useEffect(() => {
    document.title = title || `${event.name} | CampusTalk`;
  }, [title]);

  useEffect(() => {
    if (!user) return;
    // check if user is moderator of event's forum
    let isMod = event.forum.moderators.indexOf(user._id) !== -1;

    setIsModerator(isMod);
  }, [user]);

  useEffect(() => {
    let newFiles = [...files];
    let file;
    if (event.document) {
      file = {
        file: event.document,
        name: `${event.name}.${event.document.split(".")[1]}`,
        type: "doc",
      };

      newFiles.push(file);
    }

    let arr;

    if (event.images) {
      arr = event.images.map((image) => {
        return {
          file: image,
          name: `${event.name}.${image.split(".")[1]}`,
          type: "image",
        };
      });

      newFiles.push(...arr);
    }

    setFiles(newFiles);
  }, []);

  function deleteEvent() {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .delete(`/api/events/${event._id}`, headers)
      .then((res) => {
        setEvents(events.filter((e) => e._id !== event._id));

        history.push("/events");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <main className="w-full h-full overflow-auto bg-[#F0F2F5] dark:bg-dark">
      <Nav />

      <div className="grid grid-cols-5">
        {/* left side */}
        <div className="col-span-3">
          <section className="px-6 my-8">
            {/* name */}
            <h1 className="text-3xl inline my-2 text-primary dark:text-primary-light">
              {event.name}
            </h1>

            {/* edit */}
            {isModerator && (
              <button
                className="inline-flex items-center hover:scale-110 transition-all"
                title="Edit Event"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 mx-1 ml-3 stroke-[#818181] dark:stroke-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            )}

            {/* delete */}
            {isModerator && (
              <button
                className="inline-flex items-center hover:scale-110 transition-all"
                hidden={!isModerator}
                onClick={deleteEvent}
                title="Delete Event"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 mx-1 stroke-red-500 dark:stroke-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}

            {/* forum */}
            <Link
              to={`/forums/${event.forum._id}`}
              className="text-lg dark:text-darkLight block mt-1"
            >
              Organized by :{" "}
              <span className="underline underline-offset-1 hover:text-primary dark:hover:text-primary transition-all">
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
          id={event._id}
          video={event.video}
          doc={event.document}
          images={event.images}
          name={event.name}
          setEvents={setEvents}
          isModerator={isModerator}
        />
      </div>
    </main>
  );
}

export default withRouter(Event);
