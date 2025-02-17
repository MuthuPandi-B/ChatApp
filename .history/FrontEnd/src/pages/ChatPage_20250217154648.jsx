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
// import React, { useContext, useEffect, useState } from 'react';
// import AuthContext from '../contexts/AuthContext';
// import io from 'socket.io-client';
// import ChatWindow from '../components/ChatWindow';
// import ChatList from '../components/ChatList';
// import Api from '../Api/api';
// import { useNavigate } from 'react-router-dom';

// const socket = io('http://localhost:5000');

// const ChatPage = () => {
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);
//   const [messages, setMessages] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null); // Track the selected user for chat
//   const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768); // Check if it's a mobile screen

//   // Fetch chats and users when the component mounts
//   useEffect(() => {
//     if (user) {
//       Api.get('/api/chats').then((response) => setMessages(response.data));
//       Api.get('/api/users').then((response) => setUsers(response.data));

//       socket.on('receiveMessage', (message) => {
//         setMessages((prevMessages) => [...prevMessages, message]);
//       });
//     } else {
//       // navigate('/login'); // Redirect to login if user is not authenticated
//     }
//   }, [user, navigate]);

//   // Handle window resize to toggle mobile/desktop view
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobileView(window.innerWidth < 768);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Handle user selection
//   const handleUserSelect = (user) => {
//     setSelectedUser(user);
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* User List (always visible on desktop, conditionally visible on mobile) */}
//       <div
//         className={`${
//           isMobileView && selectedUser ? 'hidden' : 'block'
//         } w-full md:w-1/4 bg-white border-r border-gray-200 overflow-y-auto`}
//       >
//         <ChatList
//           users={users}
//           currentUser={user}
//           onUserSelect={handleUserSelect}
//           selectedUser={selectedUser}
//         />
//       </div>

//       {/* Chat Window (conditionally visible on mobile, always visible on desktop) */}
//       <div
//         className={`${
//           isMobileView && !selectedUser ? 'hidden' : 'block'
//         } w-full md:w-3/4 bg-gray-50`}
//       >
//         {selectedUser ? (
//           <ChatWindow
//             messages={messages}
//             selectedUser={selectedUser}
//             currentUser={user}
//             onBack={() => setSelectedUser(null)} // Add a back button for mobile view
//           />
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-gray-500">Select a user to start chatting</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatPage;
import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* User List */}
      <ChatList onUserSelect={setSelectedUser} />

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <ChatWindow selectedUser={selectedUser} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;