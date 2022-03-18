import { useState, useEffect } from "react";
import ChatPreview from "./ChatPreview";
import axios from "axios";

function ChatList({ user, activeChat, setActiveChat }) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/chats/${user._id}`)
      .then((res) => {
        setChats(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="col-span-2 h-full bg-white dark:bg-dark overflow-auto">
      {/* chat preview */}
      {chats.map((chat, i) => (
        <ChatPreview
          chat={chat}
          user={user}
          key={i}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
      ))}
    </div>
  );
}

export default ChatList;
