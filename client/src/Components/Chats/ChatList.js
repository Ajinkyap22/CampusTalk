import { useState, useEffect } from "react";
import ChatPreview from "./ChatPreview";
import axios from "axios";
import Loading from "../Loading";

function ChatList({ user, activeChat, setActiveChat }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/chats/${user._id}`)
      .then((res) => {
        setChats(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="col-span-2 h-full bg-white dark:bg-dark overflow-auto postData">
      {/* chat preview */}
      {loading ? (
        <div className="text-center mt-10">
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
    </div>
  );
}

export default ChatList;
