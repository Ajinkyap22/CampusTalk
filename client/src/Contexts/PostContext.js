import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const PostContext = React.createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setPosts([]);
      user.forums.forEach((forum) => {
        axios.get(`/api/forums/${forum.id}/posts`).then((res) => {
          setPosts((posts) => [...posts, ...res.data]);
        });
      });
    } else {
      // for testing purposes
      axios
        .get("/api/forums/62067ce47911a04b1fd71495/posts")
        .then((res) => {
          setPosts([...res.data]);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  return (
    <PostContext.Provider value={[posts, setPosts]}>
      {children}
    </PostContext.Provider>
  );
}
