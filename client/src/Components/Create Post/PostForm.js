import { useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";

function PostForm() {
  const tx = useRef(null);

  useEffect(() => {
    tx.current.setAttribute(
      "style",
      "height:" + tx.current.scrollHeight + "px;overflow-y:hidden;"
    );
  }, [tx]);

  function OnInput() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  return (
    <form className="py-2 pt-1">
      {/* caption input */}
      <div className="p-2">
        <textarea
          ref={tx}
          name="text"
          cols="30"
          rows="5"
          className="p-2 w-full rounded focus:outline-none focus:border-gray-500"
          placeholder="Write something..."
          onInput={OnInput}
        ></textarea>
      </div>

      {/* image input, accept only images */}
      <input
        type="file"
        name="file"
        accept="image/*"
        multiple
        className="hidden"
      />

      {/* video inputm accept only videos */}
      <input type="file" name="file" accept="video/*" className="hidden" />

      {/* docs input - accept only pdf|doc|docx|ppt|pptx|xls|xlsx */}
      <input
        type="file"
        name="file"
        accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="hidden"
      />

      <input type="file" name="file" className="hidden" />

      {/* 3 buttons */}
      <div className="p-2 flex items-center w-full">
        {/* images */}
        <button className="mx-2" title="Add images">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            fill="#818181"
            className="inline"
            viewBox="0 0 16 16"
          >
            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
          </svg>
        </button>

        {/* video */}
        <button className="mx-2" title="Add a video">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            fill="#818181"
            className="inline"
            viewBox="0 0 16 16"
          >
            <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
          </svg>
        </button>

        {/* doc */}
        <button className="mx-2" title="Add a document">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            fill="#818181"
            className="inline"
            viewBox="0 0 16 16"
          >
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
            <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z" />
          </svg>
        </button>
      </div>

      {/* form actions */}
      <div className="absolute right-3 bottom-2.5">
        <Link
          to="/feed"
          className=" text-primary  border border-primary mx-1 p-1.5 px-4 rounded-full text-sm hover:bg-primary hover:text-white"
        >
          Cancel
        </Link>

        <button className="text-white border border-primary bg-primary mx-1 p-1.5 px-4 rounded-full text-sm hover:bg-blue-700">
          Post
        </button>
      </div>
    </form>
  );
}

export default PostForm;
