import { useState, useEffect } from "react";

function ChatPreview({ chat, user, activeChat, setActiveChat, onlineUsers }) {
  const [receiver, setReceiver] = useState(null);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    let r = chat.members.find((member) => member._id !== user._id);
    setReceiver(r);

    if (onlineUsers[r._id]) {
      setOnline(true);
    }
  }, []);

  function handleClick() {
    setActiveChat(chat);
  }

  return (
    <div
      className={`flex border-b justify-between items-center w-full p-2.5 dark:border-light cursor-pointer hover:bg-[#f3f3f3] dark:hover:bg-darkSecondary ${
        activeChat?._id === chat._id ? "bg-[#f3f3f3] dark:bg-darkSecondary" : ""
      }`}
      onClick={handleClick}
    >
      {/* picture and name */}
      <div className="flex items-center">
        {/* picture */}
        {receiver && receiver.picture ? (
          <img
            src={`http://localhost:3000/uploads/images/${receiver.picture}`}
            className="rounded-full object-cover w-10 h-auto inline mx-2"
            alt=""
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline mx-2 w-10 align-middle fill-[#818181] dark:fill-darkLight"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        )}

        {/* name */}
        <div className="flex flex-col justify-center">
          <span className="text-sm text-justify mx-1 dark:text-darkLight">
            {receiver && receiver.firstName} {receiver && receiver.lastName}
          </span>
        </div>
      </div>

      {/* timestamp & unread messages count */}
      <div className="flex flex-col justify-center items-center">
        {/* <span className="text-xs mb-1 text-justify text-secondary dark:text-gray-300 mx-1">
          08.00 PM
        </span> */}

        {/* online status */}
        {online && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            className="fill-green-500 inline"
            viewBox="0 0 16 16"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
        )}

        {/* <span className="text-xs text-center bg-primary-light text-white py-1 px-2 rounded-full mx-1">
          2
        </span> */}
      </div>
    </div>
  );
}

export default ChatPreview;
