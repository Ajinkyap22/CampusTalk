import { UserContext } from "../../Contexts/UserContext";
import { TabContext } from "../../Contexts/TabContext";
import { useContext, useEffect, useState } from "react";
import Nav from "../Navbar/Nav";
import ChatList from "./ChatList";
import ChatPage from "./ChatPage";

function Chats({ title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [user] = useContext(UserContext);
  const [activeChat, setActiveChat] = useState(null);

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
        <ChatList
          user={user}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />

        {/* messages */}
        {activeChat ? (
          <ChatPage user={user} chat={activeChat} />
        ) : (
          <div className="col-span-4 flex flex-col justify-center items-center h-full dark:bg-darkSecondary overflow-auto relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 stroke-[#818181] dark:stroke-darkLight"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="pb-4 text-lg text-secondary my-2 dark:text-gray-300">
              Click on one of your chats to open it.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default Chats;
