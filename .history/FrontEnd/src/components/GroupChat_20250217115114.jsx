import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import AuthContext from '../contexts/AuthContext';

const socket = io('http://localhost:3000');

const GroupChat = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', (newMessage) => {
      if (newMessage.group) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('sendMessage', {
        message,
        userId: user._id,
        isGroup: true,
      });
      setMessage('');
    }
  };

  return (
    <div className="group-chat">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === user._id ? 'own' : ''}`}>
            <span>{msg.sender}</span>
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

export default GroupChat;
