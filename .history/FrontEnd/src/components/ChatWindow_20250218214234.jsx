import React, { useState, useEffect,useRef } from 'react';
import io from 'socket.io-client';
import Api from '../Api/api';

const socket = io('http://localhost:5000');

const ChatWindow = ({ selectedChat ,sende}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem('userId');
  const chatEndRef = useRef(null);

  const fetchPreviousMessages = async (selectedChat, userId) => {
    try {
      const response = await Api.get(`/api/messages/getPreviousMessages/${userId}/${selectedChat}`);
      setMessages(response.data);
      console.log(response.data)
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
    <div className="chat-window flex-1 p-4 bg-gray-100 flex flex-col h-full">
      {/* Messages container */}
      <div className="messages overflow-y-auto mb-4 flex-1 max-h-[calc(100vh-160px)]">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message flex flex-col mb-2 ${msg.sender === userId ? 'items-end' : 'items-start'}`}
          >
            <span className="text-sm text-gray-500">{msg.sender === userId ? 'You' : msg.sender.username}</span>
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
        <div ref={chatEndRef} />
      </div>
      <div className="input-box flex items-center">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
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

