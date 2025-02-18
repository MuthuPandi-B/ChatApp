// import React, { useState, useEffect, useContext } from 'react';
// import io from 'socket.io-client';
// import AuthContext from '../contexts/AuthContext';

// const socket = io('http://localhost:5000');

// const ChatWindow = () => {
//   const { user } = useContext(AuthContext);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on('receiveMessage', (newMessage) => {
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     return () => {
//       socket.off('receiveMessage');
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim() !== '') {
//       socket.emit('sendMessage', {
//         message,
//         userId: user._id,
//         isGroup: false, // change this if it's for group chat
//       });
//       setMessage('');
//     }
//   };

//   return (
//     <div className="chat-window">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender === user._id ? 'own' : ''}`}>
//             <span>{msg.sender}</span>
//             <p>{msg.message}</p>
//           </div>
//         ))}
//       </div>
//       <div className="input-box">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message"
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;
// components/ChatWindow.js
// components/ChatWindow.js
// import React, { useState, useEffect, useContext } from 'react';
// import io from 'socket.io-client';
// import Api from '../Api/api';

// const socket = io('http://localhost:5000');

// const ChatWindow = ({ selectedChat }) => {
//   // const { user } = useContext(AuthContext);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const userId= localStorage.getItem('userId');
//   const username = localStorage.getItem('username');

//   const fetchPreviousMessages = async (selectedChat,userId) => {
//     try {
//       console.log('userId', userId, 'selectedChat', selectedChat);
//       const response = await Api.get(`/api/messages/getPreviousMessages/${userId}/${selectedChat}`);
//       setMessages(response.data);
//       console.log('response.data', response.data);
//     } catch (error) {
//       console.error('Error fetching chat history', error);
//     }
//   }

//   useEffect(() => {
//     if (selectedChat) {
//       fetchPreviousMessages(selectedChat,userId);
//       socket.emit('joinChat', selectedChat);
//       socket.on('receiveMessage', (newMessage) => {
//         console.log('newMessage', newMessage);
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       });

//       return () => {
//         socket.off('receiveMessage');
//       };
//     }
//   }, [selectedChat]);

//   const sendMessage = () => {
//     if (message.trim() !== '') {
     
//       socket.emit('sendMessage', { userId, recipientId: selectedChat, message });
//       console.log('sendMessage', { userId, recipientId: selectedChat, message });
//       setMessage('');
//     }
//   };

//   return (
//     <div className="chat-window">
//       <div className="messages">
//         {messages.map((msg, index) => (
            
//           <div
//            key={index} 
//            className={`messageflex flex-col ${
//             msg.sender === userId ? 'items-end' : 'items-start'}`}>
        
//             <span className="text-sm text-gray-500"
//             >{msg.sender === userId? 'You' : msg.senderName}</span>
//             <p
//             className={`p-2 rounded-lg ${msg.sender === userId
//              ? 'bg-blue-500 text-white text-right'
//               : 'bg-gray-200 text-black text-left'
//               }`}>{msg.message}</p>
//           </div>
//         ))}
//       </div>
//       <div className="input-box">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message"
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;

import React, { useState, useEffect,useRef } from 'react';
import io from 'socket.io-client';
import Api from '../Api/api';

const socket = io('http://localhost:5000');

const ChatWindow = ({ selectedChat }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem('userId');
  const chatEndRef = useRef(null);

  const fetchPreviousMessages = async (selectedChat, userId) => {
    try {
      const response = await Api.get(`/api/messages/getPreviousMessages/${userId}/${selectedChat}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat history', error);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      fetchPreviousMessages(selectedChat, userId);
      socket.emit('joinChat', selectedChat);
      socket.on('receiveMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [selectedChat]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', { userId, recipientId: selectedChat, message });
      setMessage('');
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-window flex-1 p-4 bg-gray-100 flex flex-col justify-between h-full">
      <div className="messages overflow-y-auto mb-4 flex-1 ">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message flex flex-col mb-2 ${msg.sender === userId ? 'items-end' : 'items-start'}`}
          >
            <span className="text-sm text-gray-500">{msg.sender === userId ? 'You' : msg.senderName}</span>
            <p
              className={`p-2 rounded-lg max-w-xs break-words ${msg.sender === userId
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-black'
              }`}
            >
              {msg.message}
            </p>
          </div>
        ))}
      </div>
      <div className="input-box flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;

