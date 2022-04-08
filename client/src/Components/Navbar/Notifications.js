import { useRef } from "react";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";
import Notification from "./Notification";
import axios from "axios";
import { useEffect } from "react";

function Notifications({
  setShowNotifications,
  notifications,
  setNotifications,
  setNotificationCount,
  user,
}) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowNotifications);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      setNotificationCount(0);
    }

    return () => {
      mounted = false;
    };
  }, []);

  function clearNotifications() {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .put(`/api/notifications/${user._id}/clear`, {}, headers)
      .then((res) => {
        setNotifications([]);
        setNotificationCount(0);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div
      ref={wrapperRef}
      className="absolute max-h-[80vh] p-0 top-14 right-2 z-20 bg-white dark:bg-[#3e3d3d] shadow-base flex flex-col max-w-[32rem] rounded-lg overflow-auto postData"
    >
      <button
        className="text-secondary border-b dark:border-secondary self-end dark:text-gray-300 text-right p-2 mx-2 text-sm"
        hidden={!notifications.length}
        onClick={clearNotifications}
      >
        <svg
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-[#818181] dark:fill-gray-300 inline mx-2"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M19 14.586l3.586-3.586 1.414 1.414-3.586 3.586 3.586 3.586-1.414 1.414-3.586-3.586-3.586 3.586-1.414-1.414 3.586-3.586-3.586-3.586 1.414-1.414 3.586 3.586zm-7 6.414h-12v-2h12v2zm0-4.024h-12v-2h12v2zm0-3.976h-12v-2h12v2zm12-4h-24v-2h24v2zm0-4h-24v-2h24v2z" />
        </svg>
        Clear All
      </button>

      {notifications.length ? (
        notifications.map((notification, i) => {
          return (
            <Notification
              key={i}
              notification={notification}
              setNotifications={setNotifications}
              user={user}
            />
          );
        })
      ) : (
        // no new notifications
        <div className="flex flex-col items-center justify-center w-[24rem] p-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#818181] dark:fill-gray-300 w-12 my-2"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>

          <p className="text-center text-sm text-secondary dark:text-gray-300 my-2">
            No new notifications, you're all set!
          </p>
        </div>
      )}
    </div>
  );
}

export default Notifications;
