import { useEffect, useContext } from "react";
import Nav from "../Navbar/Nav";
import { TabContext } from "../../TabContext";
import { UserContext } from "../../UserContext";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import List from "./List";

function Forums({ title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [user] = useContext(UserContext);
  const [forums, setForums] = useState([]);
  const [forumsTab, setForumsTab] = useState("userForums");

  useEffect(() => {
    document.title = title || `Your Forums | CampusTalk`;
  }, [title]);

  useEffect(() => {
    setActiveTab("forums");
  }, [activeTab]);

  useEffect(() => {
    axios
      .get("/api/forums/")
      .then((res) => {
        setForums(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function toggleTab() {
    setForumsTab(forumsTab === "userForums" ? "allForums" : "userForums");
  }

  return (
    <main className="w-full min-h-full overflow-auto bg-[#F0F2F5]">
      <Nav />

      <div className="my-5 mt-8 text-center">
        <button
          className={`p-3 shadow text-sm rounded-l ${
            forumsTab === "userForums" ? "bg-[#0f8cff] text-white" : "bg-white"
          }`}
          onClick={toggleTab}
        >
          My Forums
        </button>
        <button
          className={`p-3 shadow text-sm rounded-r ${
            forumsTab === "allForums" ? "bg-[#0f8cff] text-white" : "bg-white"
          }`}
          onClick={toggleTab}
        >
          All Forums
        </button>
      </div>

      {/* <List forums={forumsTab === "allForums" ? forums : user.forums} /> */}
      <List forums={forums} />
    </main>
  );
}

export default Forums;
