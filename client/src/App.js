import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext, useEffect } from "react";

import { Join } from "./Components/JoinForum/Join";
import Home from "./Components/Homepage/Home";
import UserInfo from "./Components/User Info/UserInfo";
import CreateForum from "./Components/Create Forum/Create";
import Forums from "./Components/Forum/Forums";
import Forum from "././Components/Forum/Forum";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Feed from "./Components/Feed/Feed";
import CreatePost from "./Components/Create Post/CreatePost";
import PostPage from "./Components/PostPage/PostPage";
import Profile from "./Components/Profile/Profile";
import Chats from "./Components/Chats/Chats";
import FileView from "./Components/Chats/FileView";

import { ForumContext } from "./Contexts/ForumContext";
import { PostContext } from "./Contexts/PostContext";
import { ModeContext } from "./Contexts/ModeContext";
import { FileContext } from "./Contexts/FileContext";
import { TabProvider } from "./Contexts/TabContext";

function App() {
  const [forums, setForums] = useContext(ForumContext);
  const [files] = useContext(FileContext);
  const [posts] = useContext(PostContext);
  const [mode] = useContext(ModeContext);

  useEffect(() => {
    if (mode === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    // add dark class to html element
  }, [mode]);

  return (
    <div className="App relative dark:bg-dark">
      <Router>
        <Switch>
          {/* Homepage */}
          <Route exact path="/" render={() => <Home />} />

          {/* Login */}
          <Route
            exact
            path="/login"
            render={() => <Login title="Log in | CampusTalk" />}
          />

          {/* Signup */}
          <Route
            exact
            path="/signup"
            render={() => <Signup title={"Sign up | CampusTalk"} />}
          />

          {/* User info page*/}
          <Route
            exact
            path="/user-info"
            render={() => <UserInfo title={"User Profile | CampusTalk"} />}
          />

          {/* Join Forum */}
          <Route
            exact
            path="/join-forum"
            render={() => (
              <Join
                title={"Join Forum | CampusTalk"}
                forums={forums}
                setForums={setForums}
              />
            )}
          />

          {/* Create forum */}
          <Route
            exact
            path="/create-forum"
            render={() => <CreateForum title={"Create Forum | CampusTalk"} />}
          />

          {/* chat file view */}
          {files.map((file, i) => (
            <Route
              exact
              path={`/chats/media/${file.file}`}
              render={() => (
                <FileView
                  file={file.file}
                  name={file.name}
                  type={file.type}
                  title={`${file.name} | CampusTalk`}
                />
              )}
              key={i}
            />
          ))}

          {/* Feed */}
          <TabProvider>
            <Route
              exact
              path="/feed"
              render={() => <Feed title={"Feed | CampusTalk"} />}
            />

            {/* Forums */}
            <Route
              exact
              path="/forums"
              render={() => <Forums title={"Forums | CampusTalk"} />}
            />

            {/* forum page */}
            {forums.map((forum, i) => {
              return (
                <Route
                  exact
                  path={`/forums/${forum._id}`}
                  key={i}
                  render={() => (
                    <Forum
                      title={`${forum.forumName} | CampusTalk`}
                      forum={forum}
                    />
                  )}
                />
              );
            })}

            {/* Create post */}
            <Route
              exact
              path="/create-post"
              render={() => <CreatePost title={"Create Post | CampusTalk"} />}
            />

            {/* edit post page for each post */}
            {posts.map((post, i) => (
              <Route
                exact
                path={`/forums/${post.forum._id}/posts/${post._id}/edit-post`}
                key={i}
                render={() => (
                  <CreatePost title={`Edit Post | CampusTalk`} post={post} />
                )}
              />
            ))}

            {/* post page for each post */}
            {posts.map((post, i) => (
              <Route
                exact
                path={`/forums/${post.forum._id}/posts/${post._id}`}
                key={i}
                render={() => (
                  <PostPage
                    title={`${post.author.firstName}'s Post in ${post.forum.forumName} | CampusTalk`}
                    post={post}
                  />
                )}
              />
            ))}

            {/* profile page */}
            <Route
              exact
              path="/profile"
              render={() => <Profile title={"My Profile | CampusTalk"} />}
            />

            {/* chats */}
            <Route
              exact
              path="/chats"
              render={() => <Chats title={"Chats | CampusTalk"} />}
            />
          </TabProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
