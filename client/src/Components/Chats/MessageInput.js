import { useState } from "react";
import axios from "axios";

function MessageInput({ chat, user, receiver, setMessages, socket }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    if (text.trim() === "") return;

    let formData;

    if (file) {
      formData = new FormData();

      formData.append("text", text);
      formData.append("sender", user._id);
      formData.append("receiver", receiver._id);
      formData.append("chat", chat._id);
    } else {
      formData = {
        text,
        sender: user._id,
        receiver: receiver._id,
        chat: chat._id,
      };
    }

    axios
      .post(`/api/chats/send-message`, formData, headers)
      .then((res) => {
        setMessages((messages) => [...messages, res.data]);
        setText("");

        socket.emit("sendMessage", {
          senderId: user._id,
          receiverId: receiver._id,
          text,
        });
      })
      .catch((err) => {
        console.error(err.response);
      });
  }

  return (
    <div className="w-full p-2.5 bg-white dark:bg-dark shadow-base fixed bottom-0">
      <form className="flex items-center" onSubmit={handleSubmit}>
        {/* images */}
        <button type="button" className="mx-2" title="Add images">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            className="inline fill-[#818181] dark:fill-darkLight"
            viewBox="0 0 16 16"
          >
            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
          </svg>
        </button>

        {/* video */}
        <button type="button" className="mx-2" title="Add a video">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            className="inline fill-[#818181] dark:fill-darkLight"
            viewBox="0 0 16 16"
          >
            <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
          </svg>
        </button>

        {/* doc */}
        <button type="button" className="mx-2" title="Add a document">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            className="inline fill-[#818181] dark:fill-darkLight"
            viewBox="0 0 16 16"
          >
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
            <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z" />
          </svg>
        </button>

        {/* input field */}
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={handleChange}
          className="p-2 px-3 bg-[#f3f3f3] dark:bg-darkSecondary rounded-full mx-2 shadow-base focus:outline-none w-1/2"
          required
        />

        {/* send button */}
        <button
          type="submit"
          className="bg-primary-light p-2 rounded-full mx-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            className="rotate-45 fill-white dark:fill-darkLight mr-1"
            viewBox="0 0 16 16"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
