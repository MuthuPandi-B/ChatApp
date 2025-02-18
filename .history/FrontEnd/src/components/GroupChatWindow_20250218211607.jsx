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
import React, { useState, useEffect, useContext, useRef } from 'react';
import io from 'socket.io-client';
import AuthContext from '../contexts/AuthContext';
import Api from '../Api/api';

const socket = io('http://localhost:5000');

const GroupChatWindow = ({ selectedGroup }) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const userId = localStorage.getItem('userId');

  const fetchPreviousMessages = async (selectedGroup, userId) => {
    try {
      const response = await Api.get(`/api/groups/${selectedGroup}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching chat history', error);
    }
  }
  useEffect(() => {
    if (selectedGroup) {
      fetchPreviousMessages(selectedGroup, userId);
      socket.emit('joinGroup', selectedGroup);
      socket.on('receiveGroupMessage', (newMessage) => {
        console.log('receiveGroupMessage', newMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.off('receiveGroupMessage');
      };
    }
  }, [selectedGroup]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendGroupMessage', { groupId: selectedGroup, userId: user._id, message });
      console.log('sendGroupMessage', { groupId: selectedGroup, userId: user._id, message });
      setMessage('');
    }
  };

  return (
    <div className="group-chat-window flex flex-col h-full">
      <div className="messages flex-1 overflow-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === user._id ? 'own' : ''}`}>
            <span>{msg.sender === user._id ? 'You' : msg.sender}</span>
            <p>{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-box p-4 bg-gray-200">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <button onClick={sendMessage} className="mt-2 bg-blue-600 text-white py-2 px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChatWindow;
