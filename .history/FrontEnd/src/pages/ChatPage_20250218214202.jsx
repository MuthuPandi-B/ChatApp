
import React, { useState, useEffect } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatUser, setSelectedChatUser] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectChat = (userId, username) => {
    setSelectedChat(userId); // Set selected user for normal chat
    setSelectedChatUser(username); // Store the username for display
  };

  const handleBack = () => {
    setSelectedChat(null); // Go back to chat list
  };

  return (
    <div className="chat-page flex flex-col h-full overflow-hidden">
      {/* Main Content Area */}
      <div className="flex-1 flex md:flex-row flex-col overflow-hidden">
        {/* Chat List */}
        {!selectedChat || windowWidth >= 768 ? (
          <div className={`w-full md:w-1/3 ${selectedChat ? 'hidden md:block' : ''} border-r border-gray-300 overflow-y-auto`}>
            <ChatList onSelectChat={handleSelectChat} />
          </div>
        ) : null}

        {/* Chat Window */}
        {selectedChat && (
          <div className="w-full md:w-2/3 relative flex flex-col overflow-y-auto">
            <div className="flex items-center bg-blue-500 text-white px-4 py-2">
              {windowWidth < 768 && (
                <button className="mr-2 text-lg" onClick={handleBack}>
                  &#8592;
                </button>
              )}
              <h2 className="text-xl font-semibold truncate">{selectedChatUser}</h2>
            </div>
            <ChatWindow selectedChat={selectedChat}  />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

