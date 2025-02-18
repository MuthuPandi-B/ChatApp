// // components/GroupChatWindow.js
// import React, { useState, useEffect, useContext } from 'react';
// import io from 'socket.io-client';
// import AuthContext from '../contexts/AuthContext';

// const socket = io('http://localhost:5000');

// const GroupChatWindow = ({ selectedGroup }) => {
//   const { user } = useContext(AuthContext);
//   const [message, setMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     if (selectedGroup) {
//       socket.emit('joinGroup', selectedGroup);
//       socket.on('receiveGroupMessage', (newMessage) => {
//         setMessages((prevMessages) => [...prevMessages, newMessage]);
//       });

//       return () => {
//         socket.off('receiveGroupMessage');
//       };
//     }
//   }, [selectedGroup]);

//   const sendMessage = () => {
//     if (message.trim() !== '') {
//       socket.emit('sendGroupMessage', { groupId: selectedGroup, userId: user._id, message });
//       setMessage('');
//     }
//   };

//   return (
//     <div className="group-chat-window">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={`message ${msg.sender === user._id ? 'own' : ''}`}>
//             <span>{msg.sender === user._id ? 'You' : msg.sender}</span>
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

// export default GroupChatWindow;
