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
import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import AuthContext from '../contexts/AuthContext';
import Api from '../Api/api';

const socket = io('http://localhost:5000');

const ChatWindow = ({ selectedUser, onBack }) => {
  console.log("user")
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  // Fetch messages for the selected user
  useEffect(() => {
    if (selectedUser) {
      Api.get(`/api/chats/${selectedUser._id}`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.error('Error fetching messages', error);
        });
    }
  }, [selectedUser]);

  // Send a new message
  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        sender: user._id,
        receiver: selectedUser._id,
        text: message,
      };

      // Emit the message to the server
      socket.emit('sendMessage', newMessage);

      // Add the message to the local state
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 bg-white border-b border-gray-200 flex items-center">
        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden mr-2 text-blue-500 hover:text-blue-600"
          >
            &larr; Back
          </button>
        )}
        <h2 className="text-lg font-semibold">{selectedUser.username}</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.sender === user._id ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.sender === user._id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="ml-2 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;