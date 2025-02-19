
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
      console.log(response.data);
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
      console.log('sendGroupMessage', { groupId: selectedGroup, userId: user._id, message });
      socket.emit('sendGroupMessage', { groupId: selectedGroup, userId: user._id, message });
      console.log('sendGroupMessage', { groupId: selectedGroup, userId: user._id, message });
      setMessage('');
    }
  };
console.log(message.sender)
  return (
    <div className="group-chat-window flex-1 p-4 bg-gray-100 flex flex-col h-full">
      <div className="messages overflow-y-auto mb-4 flex-1 max-h-[calc(100vh-160px)]">
        {messages.map((msg, index) => (
          <div key={index} className={`message flex flex-col mb-2 ${msg.sender._id === userId? 'items-end' :( msg.sender === userId? 'items-end' : 'items-start')}`}>
            <span className='text-sm text-gray-500'>{msg.sender._id === userId ? 'You' :( msg.sender === userId? 'You' : msg.sender.username) }</span>
            <p   className={`p-2 rounded-lg max-w-xs break-words ${msg.sender._id === userId
                ? 'bg-blue-500 text-white'
                :( msg.sender === userId? 'bg-blue-500 text-white' : 'bg-gray-300 text-black') 
              }`}
            >{msg.message}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-box p-4 bg-gray-200">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e)=>{
            if(e.k)
          }}
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
