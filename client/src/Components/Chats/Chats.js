import Nav from "../Navbar/Nav";
import { TabContext } from "../../Contexts/TabContext";
import { useContext, useEffect } from "react";
import ChatList from "./ChatList";

function Chats({ title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);

  useEffect(() => {
    document.title = title || "Chats | CampusTalk";
  }, [title]);

  useEffect(() => {
    setActiveTab("chats");
  }, [activeTab]);
  return (
    <main className="w-full h-full bg-[#F0F2F5] dark:bg-dark">
      <Nav />

      <section className="grid grid-cols-6 w-full h-full">
        {/* chat list */}
        <ChatList />

        {/* messages */}
        <div className="col-span-4 h-full dark:bg-darkSecondary">
          {/* chat title */}
        </div>
      </section>
    </main>
  );
}

export default Chats;
