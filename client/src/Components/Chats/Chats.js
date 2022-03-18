import { TabContext } from "../../Contexts/TabContext";
import { useContext, useEffect } from "react";
import Nav from "../Navbar/Nav";
import ChatList from "./ChatList";
import ChatPage from "./ChatPage";

function Chats({ title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);

  useEffect(() => {
    document.title = title || "Chats | CampusTalk";
  }, [title]);

  useEffect(() => {
    setActiveTab("chats");
  }, [activeTab]);

  return (
    <main className="w-full h-full overflow-hidden bg-[#F0F2F5] dark:bg-dark">
      <Nav />

      <section className="grid grid-cols-6 w-full h-full">
        {/* chat list */}
        <ChatList />

        {/* messages */}
        <ChatPage />
      </section>
    </main>
  );
}

export default Chats;
