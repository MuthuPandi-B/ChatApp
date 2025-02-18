// import React, { useContext, useEffect, useState } from 'react';

// import AuthContext from '../contexts/AuthContext';
// import io from 'socket.io-client';
// import ChatWindow from '../components/ChatWindow';
// import ChatList from '../components/ChatList';
// import Api from '../Api/api';
// import { useNavigate } from 'react-router-dom';


// const socket = io('http://localhost:5000');

// const ChatPage = () => {
//   const Navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);


 
//   useEffect(() => {
//     if (user) {
//       Api.get('/api/chats').then(response => setMessages(response.data));
//       Api.get('/api/users').then(response => setUsers(response.data));

//       socket.on('receiveMessage', (message) => {
//         setMessages(prevMessages => [...prevMessages, message]);
//       });
//     }
//   });

//   return (
//     <div className="chat-page">
//       <ChatList users={users} />
//       <ChatWindow messages={messages} />
//     </div>
//   );
// };    

// export default ChatPage; 

// // components/ChatPage.js
// // components/ChatPage.js
// import React, { useState } from 'react';
// import ChatList from '../components/ChatList';
// import ChatWindow from '../components/ChatWindow';

// const ChatPage = () => {
//   const [selectedChat, setSelectedChat] = useState(null);

//   const handleSelectChat = (userId) => {
//     setSelectedChat(userId); // Set selected user for normal chat
//   };

//   return (
//     <div className="chat-page">
//       <div className="flex">
//         <div className="w-1/3">
//           <ChatList onSelectChat={handleSelectChat} />
//         </div>
//         <div className="w-2/3">
//           {selectedChat && <ChatWindow selectedChat={selectedChat} />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
import React, { useState, useEffect } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatUser, setSelectedChatUser] = useState('');

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
    <div className="chat-page h-screen flex flex-col overflow-hidden">
    {/* Main Content Area */}
    <div className="flex-1 flex md:flex-row flex-col overflow-hidden">
      {/* Chat List */}
      {!selectedChat || windowWidth >= 768 ? (
        <div className={`w-full md:w-1/3 ${selectedChat ? 'hidden md:block' : ''} border-r border-gray-300`}>
          <ChatList onSelectChat={handleSelectChat} />
        </div>
      ) : null}

      {/* Chat Window */}
      {selectedChat && (
        <div className="w-full md:w-2/3 relative flex flex-col overflow-hidden">
          <div className="flex items-center bg-blue-500 text-white px-4 py-2">
            {windowWidth < 768 && (
              <button className="mr-2 text-lg" onClick={handleBack}>
                &#8592;
              </button>
            )}
            <h2 className="text-xl font-semibold truncate">{selectedChatUser}</h2>
          </div>
          <ChatWindow selectedChat={selectedChat} />
        </div>
      )}
    </div>
  </div>
  );
};

export default ChatPage;

