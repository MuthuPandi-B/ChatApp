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
import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import AuthContext from '../contexts/AuthContext';

const socket = io('http://localhost:5000');

const ChatWindow = ({ selectedChat }) => {
  // const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedChat) {
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
      socket.emit('sendMessage', { userId: res, recipientId: selectedChat, message });
      setMessage('');
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === user._id ? 'own' : ''}`}>
            <span>{msg.sender === user._id ? 'You' : msg.sender}</span>
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;

