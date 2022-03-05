import { ForumContext } from "../../Contexts/ForumContext";
import { PostContext } from "../../Contexts/PostContext";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import FilePreview from "./FilePreview";
import Caption from "./Caption";
import HiddenInputs from "./HiddenInputs";
import InputButtons from "./InputButtons";
import axios from "axios";

function PostForm({
  anonymous,
  setAnonymous,
  important,
  setImportant,
  forum,
  user,
  setUser,
  file,
  setFile,
  text,
  setText,
  ...props
}) {
  // refs for image input, video input & doc input
  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const docInput = useRef(null);

  const imageButton = useRef(null);
  const videoButton = useRef(null);
  const docButton = useRef(null);

  const [disabled, setDisabled] = useState(false);
  const [enablePost, setEnablePost] = useState(false);
  const [fileType, setFileType] = useState(null);

  const [forums, setForums] = useContext(ForumContext);
  const [posts, setPosts] = useContext(PostContext);

  useEffect(() => {
    // if there is a file in the formdata
    if (file && (file.length > 0 || file.name)) {
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
      setFileType(null);
    }
  }, [file]);

  useEffect(() => {
    // set enablepost to true if there is at least a text or a file, a forum, a mode and an author
    if ((text || file) && forum && user) {
      setEnablePost(true);
    }
  }, [file, text, forum, user]);

  function handleRemoveFile(e, index) {
    // if index is not defined, setFormData.file to null
    if (!index && index !== 0) {
      setFile(null);
    } else {
      // remove the file at the index
      setFile(file.filter((file, i) => i !== index));
    }

    // reset the input
    imageInput.current.value = "";
    videoInput.current.value = "";
    docInput.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    const formData = new FormData();
    formData.append("text", text);
    formData.append("anonymous", anonymous);
    formData.append("important", important);
    formData.append("forumId", forum);
    formData.append("authorId", user._id);
    // if file is an array, add each file to formData
    if (file instanceof Array) {
      file.forEach((file) => {
        formData.append("file", file);
      });
    } else {
      formData.append("file", file);
    }

    // if fileType is image or null
    if (fileType === "image" || !fileType) {
      axios
        .post(`/api/forums/${forum}/posts/create-post`, formData, headers)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (fileType === "video") {
      axios
        .post(`/api/forums/${forum}/posts/create-vid-post`, formData, headers)
        .then((res) => {
          onSuccess(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (fileType === "doc") {
      axios
        .post(`/api/forums/${forum}/posts/create-doc-post`, formData, headers)
        .then((res) => {
          console.log(res.data);
          onSuccess(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function onSuccess(res) {
    // reset form data
    setFile(null);
    setText("");
    setFileType(null);
    setDisabled(false);
    setEnablePost(false);
    setAnonymous(false);
    setImportant(false);

    // reset file type
    setFileType(null);

    // redirect to feed
    props.history.push("/feed");

    // add post to user's posts
    setUser({
      ...user,
      posts: [...user.posts, res],
    });

    const newForums = forums.map((forum) => {
      if (forum._id === res.forum._id) {
        return {
          ...forum,
          posts: [...forum.posts, res],
        };
      } else {
        return forum;
      }
    });

    // add post to forum's posts
    setForums(newForums);

    // add post to posts
    setPosts([...posts, res]);
  }

  return (
    <form
      className="py-2 pt-1"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      {/* caption input */}
      <Caption setText={setText} />

      {/* hidden inputs */}
      <HiddenInputs
        setFile={setFile}
        imageInput={imageInput}
        videoInput={videoInput}
        docInput={docInput}
        setFileType={setFileType}
      />

      {/* names of the uploaded files with a cross button to remove them*/}
      <div className="flex flex-wrap">
        {/* if formData.file is an array map over it*/}
        {file &&
          Array.isArray(file) &&
          file.map((file, index) => (
            <FilePreview
              file={file}
              handleRemoveFile={handleRemoveFile}
              key={index}
              index={index}
            />
          ))}

        {/* if formData.file is not an array but is not null */}
        {file && !Array.isArray(file) && file !== null && (
          <FilePreview file={file} handleRemoveFile={handleRemoveFile} />
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

export default withRouter(PostForm);
