import { useState, useEffect } from "react";
import ChatPreview from "./ChatPreview";
import axios from "axios";
import Loading from "../Loading";

function ChatList({
  user,
  activeChat,
  setActiveChat,
  onlineUsers,
  chats,
  setChats,
  socket,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      user &&
        axios
          .get(`/api/chats/${user?._id}`)
          .then((res) => {
            setChats(res.data);

            setLoading(false);
          })
          .catch((err) => console.error(err));

      // on new chat
      socket.current?.on("newChat", ({ chat }) => {
        setChats([...chats, chat]);
      });
    }

    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <div
      className={`${
        activeChat ? "hidden lg:block" : ""
      } lg:col-span-2 bg-white h-fit dark:bg-dark overflow-auto postData relative`}
    >
      {/* title */}
      <div className="p-1.5 px-3 border-b border-gray-300 dark:border-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 stroke-[#818181] dark:stroke-darkLight inline mx-1"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
        <span className="text-lg mx-1 dark:text-darkLight">My Chats</span>
      </div>

      {/* chat preview */}
      {loading ? (
        <div className="text-center mt-10 overflow-hidden">
          <Loading />
        </div>
      ) : chats && chats.length ? (
        chats.map((chat, i) => (
          <ChatPreview
            chat={chat}
            user={user}
            key={i}
            activeChat={activeChat}
            setActiveChat={setActiveChat}
            onlineUsers={onlineUsers}
          />
        ))
      ) : (
        <div className="text-center flex flex-col justify-center items-center h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto stroke-[#818181] dark:stroke-darkLight"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>

          <p className="text-[#818181] dark:text-gray-300 my-2 mb-20">
            You have no chats, why not create one?
          </p>
        </div>
      )}

      {/* add new message */}
      {/* <button className="relative top-2/3 float-right mr-8" title="New Chat">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          className="fill-primary"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>
      </button> */}
    </div>
  );
}

export default ChatList;
