import { UserContext } from "../../Contexts/UserContext";
import { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import AuthorInfo from "./AuthorInfo";
import Dropdowns from "./Dropdowns";
import PostForm from "./PostForm";
import ProgressBar from "./ProgressBar";

function CreatePost({ title, post, ...props }) {
  const [user, setUser] = useContext(UserContext);
  const [forum, setForum] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [important, setImportant] = useState(false);
  const [progress, setProgress] = useState(0);
  const [originalFileNames, setOriginalFileNames] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // if post is undefined or null
    if (!post) {
      document.title = title || "Create Post | CampusTalk";
    } else {
      document.title = title || "Edit Post | CampusTalk";
    }
  }, [title, post]);

  useEffect(() => {
    // redirect to the previus page if there is no user or if the user is not the author of the post
    if (!user || (post && post.author._id !== user._id)) {
      props.history.goBack();
    }
  }, [user, post]);

  useEffect(() => {
    if (!post) return;

    setForum(post.forum);
    setText(post.text);
    setAnonymous(post.anonymous);
    setImportant(post.important);
    setOriginalFileNames(post.originalFileNames);
    setFile(post.file);
    setIsEditing(true);
  }, [post]);

  return (
    <main className="w-full h-full bg-[#F0F2F5] flex flex-col items-center p-4 text-center">
      <h1 className="text-primary text-2xl mt-4">Create a Post</h1>

      {/* dropdowns */}
      <Dropdowns
        forums={user.forums}
        forum={post?.forum || forum}
        setForum={setForum}
        anonymous={anonymous}
        setAnonymous={setAnonymous}
      />

      {/* post info */}
      <div className="bg-white shadow-base rounded relative w-[30rem]">
        {/* user profile picture & name */}
        <AuthorInfo
          picture={user.picture}
          firstName={user.firstName}
          anonymous={anonymous}
          lastName={user.lastName}
          important={important}
          setImportant={setImportant}
        />

        {/* form */}
        <PostForm
          anonymous={anonymous}
          setAnonymous={setAnonymous}
          important={important}
          setImportant={setImportant}
          forum={forum}
          user={user}
          setUser={setUser}
          file={file}
          setFile={setFile}
          text={text}
          setText={setText}
          progress={progress}
          setProgress={setProgress}
          originalFileNames={originalFileNames}
          setOriginalFileNames={setOriginalFileNames}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          postId={post?._id}
        />
      </div>

      {/* progress bar to show upload progress */}
      <ProgressBar progress={progress} />
    </main>
  );
}

export default withRouter(CreatePost);
