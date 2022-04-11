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
import Events from "./Components/Events/Events";
import Event from "./Components/Events/Event";
import CreateEvent from "./Components/Events/CreateEvent";
import Notifications from "./Components/Navbar/Notifications";
import Verify from "./Components/Auth/Verify";
import Confirm from "./Components/Auth/Confirm";
import Forget from "./Components/Auth/Forget";
import Reset from "./Components/Auth/Reset";

import { ForumContext } from "./Contexts/ForumContext";
import { PostContext } from "./Contexts/PostContext";
import { ModeContext } from "./Contexts/ModeContext";
import { FileContext } from "./Contexts/FileContext";
import { TabProvider } from "./Contexts/TabContext";
import { EventContext } from "./Contexts/EventContext";
import { NotificationContext } from "./Contexts/NotificationContext";
import { UserContext } from "./Contexts/UserContext";

function App() {
  const [forums, setForums] = useContext(ForumContext);
  const [events, setEvents] = useContext(EventContext);
  const [files] = useContext(FileContext);
  const [posts] = useContext(PostContext);
  const [mode] = useContext(ModeContext);
  const [user] = useContext(UserContext);
  const [
    notifications,
    setNotifications,
    showNotifications,
    setShowNotifications,
    notificationCount,
    setNotificationCount,
  ] = useContext(NotificationContext);

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

          {/* verify page */}
          <Route
            exact
            path="/verify"
            render={() => <Verify title={"Account Created | CampusTalk"} />}
          />

          {/* confirm page */}
          {user && (
            <Route
              exact
              path={`/confirm/${user._id}`}
              render={() => (
                <Confirm title={"Account Confirmed | CampusTalk"} />
              )}
            />
          )}

          {/* forget password */}
          <Route
            exact
            path="/forgot-password"
            render={() => <Forget title={"Forget Password | CampusTalk"} />}
          />

          {/* reset password */}
          <Route
            exact
            path="/reset-password"
            render={() => <Reset title={"Reset Password | CampusTalk"} />}
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
              path={`/media/${file.file}`}
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
                <div key={i}>
                  {/* default */}
                  <Route
                    exact
                    path={`/forums/${forum._id}`}
                    render={() => (
                      <Forum
                        title={`${forum.forumName} | CampusTalk`}
                        forum={forum}
                      />
                    )}
                  />

                  {/* postRequests */}
                  <Route
                    exact
                    path={`/forums/${forum._id}/postRequests`}
                    render={() => (
                      <Forum
                        title={`${forum.forumName} | CampusTalk`}
                        forum={forum}
                        defaultTab="postRequests"
                      />
                    )}
                  />

                  {/* joinRequests */}
                  <Route
                    exact
                    path={`/forums/${forum._id}/joinRequests`}
                    render={() => (
                      <Forum
                        title={`${forum.forumName} | CampusTalk`}
                        forum={forum}
                        defaultTab="joinRequests"
                      />
                    )}
                  />
                </div>
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

            {/* events */}
            <Route
              exact
              path="/events"
              render={() => <Events title={"Events | CampusTalk"} />}
            />

            {/* event page */}
            {events.map((event, i) => (
              <Route
                exact
                path={`/events/${event._id}`}
                key={i}
                render={() => (
                  <Event
                    title={`${event.name} | CampusTalk`}
                    event={event}
                    events={events}
                    setEvents={setEvents}
                  />
                )}
              />
            ))}

            {/* create event */}
            <Route
              exact
              path="/create-event"
              render={() => <CreateEvent title={"Create Event | CampusTalk"} />}
            />

            {/* notifications */}
            <Route
              exact
              path="/notifications"
              render={() => (
                <Notifications
                  title={"Notifications | CampusTalk"}
                  isMobile={true}
                  showNotifications={showNotifications}
                  setShowNotifications={setShowNotifications}
                  notifications={notifications}
                  setNotifications={setNotifications}
                  setNotificationCount={setNotificationCount}
                  classes="z-20 bg-white dark:bg-[#3e3d3d] flex flex-col"
                />
              )}
            />
          </TabProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
