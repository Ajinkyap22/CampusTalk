import { UserContext } from "../../Contexts/UserContext";
import { useEffect, useContext, useState } from "react";
import AuthorInfo from "./AuthorInfo";
import Dropdowns from "./Dropdowns";
import PostForm from "./PostForm";

function CreatePost({ title }) {
  const [user, setUser] = useContext(UserContext);
  const [forum, setForum] = useState(null);
  const [mode, setMode] = useState("public");
  const [important, setImportant] = useState(false);
  const [formData, setFormData] = useState({
    text: "",
    file: null,
    anonymous: false,
    author: user._id,
    forum: null,
    important: false,
  });

  useEffect(() => {
    document.title = title || "Create Post | CampusTalk";
  }, [title]);

  return (
    <main className="w-full h-full bg-[#F0F2F5] flex flex-col items-center p-4 text-center">
      <h1 className="text-primary text-2xl mt-4">Create a Post</h1>

      {/* dropdowns */}
      <Dropdowns forums={user.forums} setForum={setForum} setMode={setMode} />

      {/* post info */}
      <div className="bg-white shadow-base rounded relative w-[30rem]">
        {/* user profile picture & name */}
        <AuthorInfo
          picture={user.picture}
          firstName={user.firstName}
          lastName={user.lastName}
          mode={mode}
          important={important}
          setImportant={setImportant}
        />

        {/* form */}
        <PostForm
          formData={formData}
          setFormData={setFormData}
          mode={mode}
          important={important}
          forum={forum}
          user={user}
        />
      </div>
    </main>
  );
}

export default CreatePost;
