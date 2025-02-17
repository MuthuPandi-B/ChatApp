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

// components/ChatPage.js
// components/ChatPage.js
import React, { useState } from 'react';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleSelectChat = (userId) => {
    setSelectedChat(userId); // Set selected user for normal chat
  };

  return (
    <div className="chat-page">
      <div className="flex">
        <div className="w-1/3">
          <ChatList onSelectChat={handleSelectChat} />
        </div>
        <div className="w-2/3">
          {selectedChat && <ChatWindow selectedChat={selectedChat} />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

