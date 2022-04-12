import { FileContext } from "../../Contexts/FileContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import ChatTitle from "./ChatTitle";
import Message from "./Message";
import MessageInput from "./MessageInput";
import Loading from "../Loading";
import Messages from "./Messages";

function ChatPage({
  chat,
  user,
  socket,
  activeChat,
  setActiveChat,
  chats,
  setChats,
}) {
  const [files, setFiles] = useContext(FileContext);
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      chat &&
        setReceiver(chat.members.find((member) => member._id !== user?._id));

      // get files
      axios
        .get(`/api/chats/${chat._id}/files`)
        .then((res) => {
          setFiles([...files, ...res.data]);
        })
        .catch((err) => console.error(err));

      // listen for new messages
      socket?.on("message", (message) => {
        setNewMessage({
          sender: message.senderId,
          text: message.text,
          receiver: user?._id,
          timestamp: Date.now(),
        });
      });

      // listen for file messages
      socket?.on("fileMessage", (message) => {
        setNewMessage({
          sender: message.senderId,
          file: message.file,
          fileType: message.fileType,
          originalFileName: message.originalFileName,
          receiver: user._id,
          timestamp: Date.now(),
        });
      });

      // listen for clear chat
      socket?.on("clearChat", (message) => {
        setMessages([]);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    // get messages
    axios
      .get(`/api/chats/messages/${chat._id}/${user?._id}`)
      .then((res) => {
        setMessages(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.response));
  }, [chat]);

  useEffect(() => {
    newMessage &&
      newMessage.sender === receiver._id &&
      setMessages((messages) => [...messages, newMessage]);
  }, [newMessage, receiver]);

  return (
    <div className="lg:col-span-4 h-full lg:grid grid-cols-1 grid-rows-10 justify-between dark:bg-darkSecondary bg-[#F0F2F5] overflow-auto relative">
      {/* chat title */}
      <ChatTitle
        receiver={receiver}
        chat={chat}
        setActiveChat={setActiveChat}
        chats={chats}
        setChats={setChats}
        setMessages={setMessages}
      />

      {/* messages */}
      {loading ? (
        <div className="text-center mt-8 row-span-8">
          <Loading />
        </div>
      ) : (
        <div className="pt-2 row-span-8 overflow-auto postData">
          {messages && messages.length ? (
            <Messages messages={messages} user={user} loading={loading} />
          ) : (
            <div className="p-3 text-center pt-16 text-secondary dark:text-darkLight">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                className="fill-[#818181] dark:fill-darkLight mx-auto my-4"
                viewBox="0 0 256 256"
              >
                <rect width="256" height="256" fill="none"></rect>
                <path
                  d="M94,61.4a20,20,0,0,1,34.6-20l30,51.9"
                  fill="none"
                  className="dark:stroke-darkLight stroke-[#818181]"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
                <path
                  d="M67.4,95.2l-16-27.7A20,20,0,0,1,86,47.5l34,58.9"
                  fill="none"
                  className="dark:stroke-darkLight stroke-[#818181]"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
                <path
                  d="M154,165.3a39.9,39.9,0,0,1,14.6-54.6l-10-17.4a20,20,0,0,1,34.7-20l20,34.7A80,80,0,0,1,74.7,188l-42-72.8a20,20,0,0,1,34.7-20l22,38.1"
                  fill="none"
                  className="dark:stroke-darkLight stroke-[#818181]"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
                <path
                  d="M81.1,240A110.3,110.3,0,0,1,48,204"
                  fill="none"
                  className="dark:stroke-darkLight stroke-[#818181]"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
                <path
                  d="M176,31a51.7,51.7,0,0,1,45,26"
                  fill="none"
                  className="dark:stroke-darkLight stroke-[#818181]"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="16"
                ></path>
              </svg>
              <span>Say hello to {receiver.firstName}!</span>
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
