import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useContext } from "react";

import { Join } from "./Components/JoinForum/Join";
import Home from "./Components/Homepage/Home";
import UserInfo from "./Components/User Info/UserInfo";
import CreateForum from "./Components/Create Forum/Create";
import Forums from "./Components/Forum/Forums";
import Forum from "././Components/Forum/Forum";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import Feed from "./Components/Feed/Feed";

import { ForumContext } from "./Contexts/ForumContext";
import { UserProvider } from "./Contexts/UserContext";
import { TabProvider } from "./Contexts/TabContext";
import { PostProvider } from "./Contexts/PostContext";

function App() {
  const [forums] = useContext(ForumContext);

  return (
    <div className="App relative">
      <UserProvider>
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
              render={() => <Join title={"Join Forum | CampusTalk"} />}
            />

            {/* Create forum */}
            <Route
              exact
              path="/create-forum"
              render={() => <CreateForum title={"Create Forum | CampusTalk"} />}
            />

            {/* Feed */}
            <TabProvider>
              <PostProvider>
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
                {forums.map((forum, i) => (
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
                ))}
              </PostProvider>
            </TabProvider>
          </Switch>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
