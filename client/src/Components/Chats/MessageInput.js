import { useState, useRef, useEffect } from "react";
import axios from "axios";
import FileInputs from "../PostPage/FileInputs";

function MessageInput({ chat, user, receiver, setMessages, socket }) {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const docInput = useRef(null);
  const imageButton = useRef(null);
  const videoButton = useRef(null);
  const docButton = useRef(null);
  const [originalFileName, setOriginalFileName] = useState();
  const [enableSend, setEnableSend] = useState(false);
  const [fileType, setFileType] = useState(null);
  const formRef = useRef(null);

  function handleChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (text && text.trim() === "") return;

    let formData;

    if (file) {
      formData = new FormData();

      formData.append("sender", user._id);
      formData.append("receiver", receiver._id);
      formData.append("chat", chat._id);
      formData.append("file", file);
      formData.append("originalFileName", JSON.stringify(originalFileName));

      apiRequest(fileType, formData);
    } else {
      formData = {
        text,
        sender: user._id,
        receiver: receiver._id,
        chat: chat._id,
      };

      apiRequest("text", formData);
    }
  }

  function onSuccess(res, type) {
    setMessages((messages) => [...messages, res]);
    setText("");
    setFile(null);
    setOriginalFileName("");
    setFileType("");
    setEnableSend(false);

    if (type === "text") {
      socket.emit("sendMessage", {
        senderId: user._id,
        receiverId: receiver._id,
        text,
      });
    } else {
      socket.emit("sendFile", {
        senderId: user._id,
        receiverId: receiver._id,
        file: res.file,
        fileType: res.fileType,
        originalFileName: res.originalFileName,
      });
    }
  }

  function apiRequest(type, formData) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    if (type === "text") {
      axios
        .post(`/api/chats/send-message`, formData, headers)
        .then((res) => {
          onSuccess(res.data, type);
        })
        .catch((err) => {
          console.error(err.response);
        });
    } else {
      axios
        .post(`/api/chats/send-${type}`, formData, headers)
        .then((res) => {
          onSuccess(res.data, type);
        })
        .catch((err) => {
          console.error(err.response);
        });
    }
  }

  useEffect(() => {
    if (text && user) {
      setEnableSend(true);
    } else {
      setEnableSend(false);
    }
  }, [text, user]);

  useEffect(() => {
    if (!file) return;

    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  }, [file]);

  return (
    <div className="w-full p-2.5  bg-white dark:bg-dark shadow-base fixed bottom-0">
      <form className="flex items-center" onSubmit={handleSubmit} ref={formRef}>
        <FileInputs
          imageInput={imageInput}
          videoInput={videoInput}
          docInput={docInput}
          imageButton={imageButton}
          videoButton={videoButton}
          docButton={docButton}
          setFile={setFile}
          setFileType={setFileType}
          setOriginalFileName={setOriginalFileName}
          isChatting={true}
        />

        {/* input field */}
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={handleChange}
          className="p-2 px-3 bg-[#f3f3f3] dark:bg-darkSecondary dark:text-darkLight rounded-full mx-2 shadow-base focus:outline-none w-1/2"
          required
        />

        {/* send button */}
        <button
          type="submit"
          className="bg-primary-light p-2 rounded-full mx-1 disabled:opacity-50"
          disabled={!enableSend}
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
