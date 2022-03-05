import { UserContext } from "../../Contexts/UserContext";
import { useEffect, useContext, useState } from "react";
import AuthorInfo from "./AuthorInfo";
import Dropdowns from "./Dropdowns";
import PostForm from "./PostForm";
import ProgressBar from "./ProgressBar";

function CreatePost({ title }) {
  const [user, setUser] = useContext(UserContext);
  const [forum, setForum] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [important, setImportant] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.title = title || "Create Post | CampusTalk";
  }, [title]);

  return (
    <main className="w-full h-full bg-[#F0F2F5] flex flex-col items-center p-4 text-center">
      <h1 className="text-primary text-2xl mt-4">Create a Post</h1>

      {/* dropdowns */}
      <Dropdowns
        forums={user.forums}
        setForum={setForum}
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
        />
      </div>

      {/* progress bar to show upload progress */}
      <ProgressBar progress={progress} />
    </main>
  );
}

export default CreatePost;
