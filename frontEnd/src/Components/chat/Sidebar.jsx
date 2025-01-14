/* eslint-disable react/prop-types */


// eslint-disable-next-line react/prop-types
export default function Sidebar({conversations, activeConversation, handleClick}) {
  return (
    <aside className="w-80 bg-white border-r border-gray-200">
    <div className="overflow-y-auto h-full">
      {Array.isArray(conversations) &&
        conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`flex p-4 gap-4 border-b border-gray-200 cursor-pointer transition-colors ${
              activeConversation?.id === conversation.id ? 'bg-gray-100' : 'hover:bg-gray-50'
            }`}
            onClick={() => handleClick(conversation)} // Wrap in an arrow function
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-lg font-semibold">
              {conversation.initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-1">
                <span className="font-semibold text-gray-800">{conversation.name}</span>
                <span className="text-sm text-gray-500">{conversation.time}</span>
              </div>
              <div className="text-gray-600 text-sm truncate">{conversation.lastMessage}</div>
            </div>
          </div>
        ))}

    </div>
  </aside>
  );
}

