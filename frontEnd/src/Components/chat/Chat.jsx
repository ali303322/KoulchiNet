import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ChatContent from "./ChatContent";
import HeaderPres from "../HeaderPres";
import HeaderClient from "../HeaderClient";
import SideBarPres from "../SideBarPres";
import SideBarClient from "../SideBarClient";
import axios from "axios";

export default function Chat() {
  const [activeConversation, setActiveConversation] = useState(null);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]); // Store grouped messages
  const authRole = localStorage.getItem("role");
  const authUser = JSON.parse(localStorage.getItem("user"));
  console.log(role, authUser.id);


  const fetchMessages = async (role, userId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/messages/${role}/${userId}`
      );
      console.log("Messages fetched:", response.data);

      // Sort the `messages` array inside each conversation from older to newer
      const sortedConversations = response.data.map((conversation) => ({
        ...conversation,
        messages: [...conversation.messages].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        ), // Sort messages by created_at in ascending order
      }));

      // Optionally sort conversations by the most recent message
      const sortedByLastMessage = sortedConversations.sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1]?.created_at || 0;
        const lastMessageB = b.messages[b.messages.length - 1]?.created_at || 0;
        return new Date(lastMessageB) - new Date(lastMessageA); // Descending by last message
      });

      // Set sorted messages in state
      setMessages(sortedByLastMessage);

      console.log("Sorted Conversations:", sortedByLastMessage);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };


  console.log('activeConversation',activeConversation);


useEffect(() => {
    if (authRole && (authRole === "prestataire" || authRole === "client")) {
      setRole(authRole);
      setUser(authUser);
      if (authUser?.id) {
        fetchMessages(authRole, authUser.id);
      }
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    // Check if the date is today
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      // Format as HH:MM
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    // Format as DD/MM/YYYY
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  const getLastMessageContent = (lastMessage) => {
    if (lastMessage.audio) return "sent an audio";
    if (lastMessage.file) return "sent a file";
    return lastMessage.message || "No Content";
  };

  const handleClick = (conversation) => {
    setActiveConversation(conversation);
  };

  if (!role) {
    return <div>Loading...</div>;
  }

//   console.log(activeConversation);

  const Header = authRole === "prestataire" ? HeaderPres : HeaderClient;
  const SideBar = authRole === "prestataire" ? SideBarPres : SideBarClient;

  return (
    <div className="bg-gray-100 font-sans">
      <Header />
      <div className="flex min-h-screen">
        <SideBar />
        <div className="flex w-full h-screen max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-1/3 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Messages</h2>
              {user && (
                <p className="text-gray-700 mt-2">
                  {role === "prestataire"
                    ? `Hello Prestataire "${user.nom}" (ID: ${user.id}), you can send messages to your clients.`
                    : `Hello Client "${user.nom}" (ID: ${user.id}), you can send messages to your prestataires.`}
                </p>
              )}
            </div>
            <div className="flex-1 overflow-y-auto">
              {messages.length > 0 ? (
                messages.map((userMessages, index) => {
                  // Get the last message
                  const lastMessages = userMessages.messages;
                  const lastMessage = lastMessages[lastMessages.length - 1];

                  return (
                    <div
                      key={index}
                      className={`p-4 cursor-pointer ${
                        activeConversation?.nom === userMessages.nom
                          ? "bg-blue-100"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleClick(userMessages)}
                    >
                      <h3 className="text-lg font-semibold">
                        {userMessages?.nom} {userMessages?.prenom}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {getLastMessageContent(lastMessage)}
                      </p>
                      <p className="text-gray-400 text-xs">
                        Sent: {formatDate(lastMessage?.created_at)}
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-gray-500">
                  No messages found
                </div>
              )}
            </div>
          </div>
          <div className="w-2/3 flex flex-col">
            {activeConversation != null ? (
              <ChatContent conversation={activeConversation} />
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 text-lg">
                Choose a message to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
