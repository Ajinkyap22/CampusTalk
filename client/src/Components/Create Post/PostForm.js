import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import FilePreview from "./FilePreview";
import Caption from "./Caption";
import HiddenInputs from "./HiddenInputs";
import InputButtons from "./InputButtons";

function PostForm({ formData, setFormData, mode, important, forum, user }) {
  // refs for image input, video input & doc input
  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const docInput = useRef(null);
  const imageButton = useRef(null);
  const videoButton = useRef(null);
  const docButton = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [enablePost, setEnablePost] = useState(false);

  useEffect(() => {
    // if there is a file in the formdata
    if (formData.file && (formData.file.length > 0 || formData.file.name)) {
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

  useEffect(() => {
    // set enablepost to true if there is at least a text or a file, a forum, a mode and an author
    if ((formData.text || formData.file) && forum && mode && user) {
      setEnablePost(true);
    }
  }, [formData, forum, mode, user]);

  function handleRemoveFile(e, index) {
    // if index is not defined, setFormData.file to null
    if (!index && index !== 0) {
      setFormData({ ...formData, file: null });
    } else {
      // remove the file at the index
      setFormData({
        ...formData,
        file: formData.file.filter((file, i) => i !== index),
      });
    }

    // reset the input
    imageInput.current.value = "";
    videoInput.current.value = "";
    docInput.current.value = "";
  }

  return (
    <form className="py-2 pt-1" encType="multipart/form-data">
      {/* caption input */}
      <Caption formData={formData} setFormData={setFormData} />

      {/* hidden inputs */}
      <HiddenInputs
        formData={formData}
        setFormData={setFormData}
        imageInput={imageInput}
        videoInput={videoInput}
        docInput={docInput}
      />

      {/* names of the uploaded files with a cross button to remove them*/}
      <div className="flex flex-wrap">
        {/* if formData.file is an array map over it*/}
        {formData.file &&
          Array.isArray(formData.file) &&
          formData.file.map((file, index) => (
            <FilePreview
              file={file}
              handleRemoveFile={handleRemoveFile}
              key={index}
              index={index}
            />
          ))}

        {/* if formData.file is not an array but is not null */}
        {formData.file &&
          !Array.isArray(formData.file) &&
          formData.file !== null && (
            <FilePreview
              file={formData.file}
              handleRemoveFile={handleRemoveFile}
            />
          )}
      </div>

      {/* 3 input options */}
      <InputButtons
        imageButton={imageButton}
        videoButton={videoButton}
        docButton={docButton}
        imageInput={imageInput}
        videoInput={videoInput}
        docInput={docInput}
        disabled={disabled}
      />

      {/* form actions */}
      <div className="absolute right-3 bottom-2.5">
        <Link
          to="/feed"
          className=" text-primary  border border-primary mx-1 p-1.5 px-4 rounded-full text-sm hover:bg-primary hover:text-white"
        >
          Cancel
        </Link>

        <button
          disabled={!enablePost}
          type="submit"
          className={
            enablePost
              ? "text-white border border-primary bg-primary mx-1 p-1.5 px-4 rounded-full text-sm hover:bg-blue-700"
              : "text-[#ffffff80] bg-[#818181] border border-[#818181] mx-1 p-1.5 px-4 rounded-full text-sm"
          }
        >
          Post
        </button>
      </div>
    </form>
  );
}

export default PostForm;
