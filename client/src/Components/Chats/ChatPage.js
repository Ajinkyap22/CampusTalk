import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatTitle from "./ChatTitle";
import Message from "./Message";
import MessageInput from "./MessageInput";

function ChatPage({ chat, user }) {
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    chat && setReceiver(chat.members.find((member) => member._id !== user._id));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/chats/messages/${chat._id}`)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="col-span-4 h-full dark:bg-darkSecondary overflow-auto relative postData">
      {/* chat title */}
      <ChatTitle receiver={receiver} />

      {/* messages */}
      <div className="overflow-auto pb-14">
        {messages && messages.length ? (
          messages.map((message, i) => (
            <div ref={scrollRef} key={i}>
              <Message message={message} user={user} />
            </div>
          ))
        ) : (
          <div className="p-3 text-center text-white dark:text-darkLight">
            No messages yet
          </div>
        )}
      </div>

      {/* message input */}
      <MessageInput
        chat={chat}
        user={user}
        receiver={receiver}
        setMessages={setMessages}
      />
    </div>
  );
}

export default ChatPage;
