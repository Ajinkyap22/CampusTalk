import { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
// import NotFound from "../assets/404.svg";
import NotFound from "../assets/404Error.svg";

function PageNotFound({ history }) {
  useEffect(() => {
    document.title = "Page Not Found | CampusTalk";
  }, []);

  function handleBack() {
    history.goBack();
  }

  return (
    <div className="w-full h-full flex items-center justify-evenly bg-[#F0F2F5] dark:bg-dark">
      <img src={NotFound} alt="Page Not Found" className="h-screen" />

      <div className="px-16">
        <p className="lg:text-2xl my-2 dark:text-darkLight">
          Sorry, we could not find the page you were looking for.
        </p>
        <p className="text-secondary dark:text-gray-300 my-1.5">
          No need to worry, You can always head over to one of our good 'ol
          pages to get back on track.
        </p>

        <ul className="mt-5">
          {/* home */}
          <li className="my-3 hover:translate-x-3 transition-all">
            <Link to="/" className="text-primary dark:text-primary-light">
              Homepage →
            </Link>
          </li>
          {/* feed */}
          <li className="my-3 hover:translate-x-3 transition-all">
            <Link className="text-primary dark:text-primary-light" to="/feed">
              Feed →
            </Link>
          </li>
          {/* forums */}
          <li className="my-3 hover:translate-x-3 transition-all">
            <Link className="text-primary dark:text-primary-light" to="/forums">
              Forums →
            </Link>
          </li>
          {/* events */}
          <li className="my-3 hover:translate-x-3 transition-all">
            <Link className="text-primary dark:text-primary-light" to="/events">
              Events →
            </Link>
          </li>
          {/* chats */}
          <li className="my-3 hover:translate-x-3 transition-all">
            <Link className="text-primary dark:text-primary-light" to="/chats">
              Chats →
            </Link>
          </li>
        </ul>

        <button
          onClick={handleBack}
          className="px-2 md:px-3 py-1.5 lg:py-2 mt-4 text-xs md:text-sm lg:text-base 2xl:text-lg bg-primary text-white rounded hover:bg-blue-700 hover:scale-105 transition-all"
        >
          Take Me Back
        </button>
      </div>
    </div>
  );
}

export default withRouter(PageNotFound);
