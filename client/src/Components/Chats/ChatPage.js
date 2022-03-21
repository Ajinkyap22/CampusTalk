import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatTitle from "./ChatTitle";
import Message from "./Message";
import MessageInput from "./MessageInput";
import Loading from "../Loading";

function ChatPage({ chat, user, socket }) {
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    chat && setReceiver(chat.members.find((member) => member._id !== user._id));
  }, []);

  useEffect(() => {
    // get messages
    axios
      .get(`/api/chats/messages/${chat._id}`)
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    // listen for new messages
    socket.on("message", (message) => {
      setNewMessage({
        sender: message.senderId,
        text: message.text,
        receiver: user._id,
        timestamp: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      newMessage &&
        newMessage.sender === receiver._id &&
        setMessages((messages) => [...messages, newMessage]);
    }

    return () => {
      isMounted = false;
    };
  }, [newMessage, receiver]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="col-span-4 h-full dark:bg-darkSecondary overflow-auto relative postData">
      {/* chat title */}
      <ChatTitle receiver={receiver} />

      {/* messages */}
      {loading ? (
        <div className="text-center mt-8">
          <Loading />
        </div>
      ) : (
        <div className="overflow-auto pb-14 ">
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
      )}

      {/* message input */}
      <MessageInput
        chat={chat}
        user={user}
        receiver={receiver}
        setMessages={setMessages}
        socket={socket}
      />
    </div>
  );
}

export default ChatPage;
