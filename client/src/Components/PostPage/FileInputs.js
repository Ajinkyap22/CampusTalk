function FileInputs({
  imageInput,
  videoInput,
  // linkInput,
  docInput,
  imageButton,
  videoButton,
  docButton,
  // linkButton,
  setFile,
  setOriginalFileName,
  setFileType,
  disabled,
  isChatting = false,
}) {
  function handleFileInput(e, ref) {
    // trigger click on the ref
    ref.current.click();
  }

  function handleImageFileChange(e) {
    const file = e.target.files[0];

    // check if the file is an image
    if (!file.type.match("image.*")) {
      // if the file is not an image, alert the user
      alert("Please select an image file");

      // set formData.file to null
      setFile(null);

      // reset the input
      imageInput.current.value = "";

      // break the loop, we don't need to check the rest of the files
      return;
    }

    // check if the size is greater than 10mb
    if (file.size > 10485760) {
      // alert the user
      alert("File size must be less than 10mb");

      setFile(null);

      // reset the input
      imageInput.current.value = "";

      return;
    }

    // set the formData
    setFile(file);
    setOriginalFileName({ name: file.name, type: "image" });

    setFileType("image");
  }

  function handleVideoFileChange(e) {
    // get the file
    const file = e.target.files[0];

    // check if file size is greater than 50mb
    if (file.size > 50485760) {
      // alert the user
      alert("File size must be less than 50mb");

      // set formData.file to null
      setFile(null);
      setOriginalFileName(null);

      // reset the input
      videoInput.current.value = "";

      return;
    }

    // check if the file is a video
    if (!file.type.match("video.*")) {
      // alert the user that the file is not a video
      alert("Please select a video file");

      // set the formData
      setFile(null);
      setOriginalFileName(null);
    } else {
      setFileType("video");

      // set the formData
      setFile(file);
      setOriginalFileName({ name: file.name, type: "video" });

      // reset the input
      videoInput.current.value = "";
    }
  }

  function handleDocFileChange(e) {
    // get the file
    const file = e.target.files[0];

    // check if file size is greater than 10mb
    if (file.size > 10485760) {
      // alert the user
      alert("File size must be less than 10mb");

      // set formData.file to null
      setFile(null);
      setOriginalFileName(null);

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
      setFile(file);
      setOriginalFileName({ name: file.name, type: "doc" });

      setFileType("doc");
    } else {
      // alert the user that the file is not a doc
      alert("Please select a doc file");

      // set the formData
      setFile(null);
      setOriginalFileName(null);

      // reset the input
      docInput.current.value = "";
    }
  }

  return (
    <div className="inline">
      <button
        ref={imageButton}
        onClick={(e) => handleFileInput(e, imageInput)}
        type="button"
        className={isChatting ? "mx-2" : "mx-1"}
        title="Add images"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
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
        ref={videoButton}
        onClick={(e) => handleFileInput(e, videoInput)}
        type="button"
        className={isChatting ? "mx-2" : "mx-1"}
        title="Add a video"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          fill={disabled ? "#ababab" : "#818181"}
          className="inline"
          viewBox="0 0 16 16"
        >
          <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
        </svg>
      </button>
      {/* doc */}
      {isChatting && (
        <button
          type="button"
          className="mx-2"
          title="Add a document"
          ref={docButton}
          onClick={(e) => handleFileInput(e, docInput)}
        >
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
      )}

      {/* link */}
      {/* <button
        ref={linkButton}
        onClick={(e) => handleFileInput(e, linkInput)}
        type="button"
        className={isChatting ? "mx-2" : "mx-1"}
        title="Add a link"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          className="vertical-align-middle inline"
          fill="none"
          viewBox="0 0 24 24"
          stroke={disabled ? "#ababab" : "#818181"}
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </button> */}

      <input
        onChange={handleImageFileChange}
        ref={imageInput}
        type="file"
        name="file"
        accept="image/*"
        className="hidden"
        data-max-size="20971520"
      />

      <input
        onChange={handleVideoFileChange}
        ref={videoInput}
        type="file"
        name="file"
        accept="video/*"
        className="hidden"
        data-max-size=" 10485760"
      />

      {isChatting && (
        <input
          onChange={handleDocFileChange}
          ref={docInput}
          type="file"
          name="file"
          accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className="hidden"
          data-max-size="10485760"
        />
      )}

      {/* <input
        // onChange={handleVideoFileChange}
        ref={linkInput}
        type="text"
        name="link"
        className="hidden"
      /> */}
    </div>
  );
}

export default FileInputs;
