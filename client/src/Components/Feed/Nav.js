import { NavLink } from "react-router-dom";
import Logo from "../Logo";

function Nav() {
  return (
    <nav className="fixed top-0 z-10 w-full flex bg-white pt-2 shadow-md justify-between md:justify-around items-center">
      {/* logo */}
      <div className="mb-2">
        <Logo width="120" height="40" />
      </div>

      {/* Mid part */}
      <div className="">
        <NavLink
          to={"/feed"}
          className="mx-4 text-sm py-3 border-b-[3px] px-2 border-primary text-primary"
        >
          Feed
        </NavLink>
        <NavLink to={"/chat"} className="mx-4 text-sm p-2">
          Chats
        </NavLink>
        <NavLink to={"/forums"} className="mx-4 text-sm p-2">
          Forums
        </NavLink>
      </div>

      {/* user section */}
      <div>
        {/* notifications */}
        <button className="w-5 h-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#818181"
            className="bi bi-bell"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>
        </button>

        {/* profile */}
        <button className="w-14 h-auto">
          {/* avatar */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            fill="#818181"
            className="inline ml-2 mr-1 align-baseline"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>

          {/* dropdown */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline align-text-top"
            width="14"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#818181"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default Nav;
