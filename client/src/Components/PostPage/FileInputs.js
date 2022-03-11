function FileInputs({
  imageInput,
  videoInput,
  linkInput,
  imageButton,
  videoButton,
  linkButton,
  setFile,
  setOriginalFileName,
  setFileType,
  disabled,
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

  return (
    <div className="inline">
      <button
        ref={imageButton}
        onClick={(e) => handleFileInput(e, imageInput)}
        type="button"
        className="mx-1"
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
        className="mx-1"
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

      {/* link */}
      {/* <button
        ref={linkButton}
        onClick={(e) => handleFileInput(e, linkInput)}
        type="button"
        className="mx-1"
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
