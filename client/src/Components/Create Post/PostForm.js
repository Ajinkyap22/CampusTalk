import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

function PostForm({ formData, setFormData, mode, important, forum, user }) {
  // refs for image input, video input & doc input
  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const docInput = useRef(null);
  const imageButton = useRef(null);
  const videoButton = useRef(null);
  const docButton = useRef(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    // if there is a file in the formdata
    if (formData.file) {
      // disable all input buttons
      imageButton.current.disabled = true;
      videoButton.current.disabled = true;
      docButton.current.disabled = true;
      // disable all input refs
      imageInput.current.disabled = true;
      videoInput.current.disabled = true;
      docInput.current.disabled = true;
      setDisabled(true);
    } else {
      // enable all input buttons
      imageButton.current.disabled = false;
      videoButton.current.disabled = false;
      docButton.current.disabled = false;
      // enable all input refs
      imageInput.current.disabled = false;
      videoInput.current.disabled = false;
      docInput.current.disabled = false;
      setDisabled(false);
    }
  }, [formData.file]);

  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function handleFileInput(e, ref) {
    // trigger click on the ref
    ref.current.click();
  }

  function handleImageFileChange(e) {
    // get all files
    const files = e.target.files;
    // create an empty array
    const images = [];

    let size = 0;

    // loop through all files
    for (let i = 0; i < files.length; i++) {
      // check if the file is an image
      if (files[i].type.match("image.*")) {
        // push the file to the array
        images.push(files[i]);
        // add the file size to the size variable
        size += files[i].size;
      } else {
        // if the file is not an image, alert the user
        alert("Please select an image file");

        // set formData.file to null
        setFormData({ ...formData, file: null });

        // reset the input
        imageInput.current.value = "";

        // break the loop, we don't need to check the rest of the files
        return;
      }

      // if the array has more than 12 files
      if (images.length > 12) {
        // remove the last file
        images.pop();
      }
    }

    // check if the size is greater than 10mb
    if (size > 50000) {
      // alert the user
      alert("Total file size must be less than 50mb");

      // set formData.file to null
      setFormData({ ...formData, file: null });

      // reset the input
      imageInput.current.value = "";

      return;
    }

    // set the formData
    setFormData({
      ...formData,
      file: images,
    });
  }

  function handleVideoFileChange(e) {
    // get the file
    const file = e.target.files[0];

    // check if file size is greater than 50mb
    if (file.size > 50000) {
      // alert the user
      alert("File size must be less than 50mb");

      // set formData.file to null
      setFormData({ ...formData, file: null });

      // reset the input
      videoInput.current.value = "";

      return;
    }

    // check if the file is a video
    if (file.type.match("video.*")) {
      // set the formData
      setFormData({
        ...formData,
        file: file,
      });
    } else {
      // alert the user that the file is not a video
      alert("Please select a video file");

      // set the formData
      setFormData({
        ...formData,
        file: null,
      });

      // reset the input
      videoInput.current.value = "";
    }
  }

  function handleDocFileChange(e) {
    // get the file
    const file = e.target.files[0];

    // check if file size is greater than 10mb
    if (file.size > 50000) {
      // alert the user
      alert("File size must be less than 10mb");

      // set formData.file to null
      setFormData({ ...formData, file: null });

      // reset the input
      docInput.current.value = "";

      return;
    }

    // check if the file is either a pdf, doc, docx, txt, ppt, pptx, xls, xlsx, or csv
    if (
      file.type.match("application/pdf") ||
      file.type.match("application/msword") ||
      file.type.match(
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) ||
      file.type.match("text/plain") ||
      file.type.match("application/vnd.ms-powerpoint") ||
      file.type.match(
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ) ||
      file.type.match("application/vnd.ms-excel") ||
      file.type.match(
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) ||
      file.type.match("text/csv")
    ) {
      // set the formData
      setFormData({
        ...formData,
        file: file,
      });
    } else {
      // alert the user that the file is not a doc
      alert("Please select a doc file");

      // set the formData
      setFormData({
        ...formData,
        file: null,
      });

      // reset the input
      docInput.current.value = "";
    }
  }

  return (
    <form className="py-2 pt-1" encType="multipart/form-data">
      {/* caption input */}
      <div className="p-2">
        <textarea
          name="text"
          cols="30"
          rows="1"
          className="p-2 w-full rounded focus:outline-none focus:border-gray-500 overflow-hidden"
          placeholder="Write something..."
          onKeyDown={handleKeyDown}
        ></textarea>
      </div>

      {/* image input, accept only images */}
      <input
        onChange={handleImageFileChange}
        ref={imageInput}
        type="file"
        name="file"
        accept="image/*"
        multiple
        className="hidden"
        data-max-size="50240"
      />

      {/* video inputm accept only videos */}
      <input
        onChange={handleVideoFileChange}
        ref={videoInput}
        type="file"
        name="file"
        accept="video/*"
        className="hidden"
        data-max-size="50000"
      />

      {/* docs input - accept only pdf|doc|docx|ppt|pptx|xls|xlsx */}
      <input
        onChange={handleDocFileChange}
        ref={docInput}
        type="file"
        name="file"
        accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        className="hidden"
        data-max-size="10240"
      />

      {/* 3 buttons */}
      <div className="p-2 flex items-center w-full">
        {/* images */}
        <button
          type="button"
          ref={imageButton}
          className="mx-2"
          onClick={(e) => handleFileInput(e, imageInput)}
          title="Add images"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            fill={disabled ? "#ababab" : "#818181"}
            className="inline"
            viewBox="0 0 16 16"
          >
            <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
            <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
          </svg>
        </button>

        {/* video */}
        <button
          type="button"
          ref={videoButton}
          className="mx-2"
          onClick={(e) => handleFileInput(e, videoInput)}
          title="Add a video"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            fill={disabled ? "#ababab" : "#818181"}
            className="inline"
            viewBox="0 0 16 16"
          >
            <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
          </svg>
        </button>

        {/* doc */}
        <button
          type="button"
          ref={docButton}
          className="mx-2"
          onClick={(e) => handleFileInput(e, docInput)}
          title="Add a document"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            fill={disabled ? "#ababab" : "#818181"}
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
