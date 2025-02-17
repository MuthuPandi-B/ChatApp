import React, { useContext, useEffect, useState } from 'react';
import {  } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import io from 'socket.io-client';
import ChatWindow from '../components/ChatWindow';
import ChatList from '../components/ChatList';
imp

const socket = io('http://localhost:3000');

const ChatPage = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get('/api/chats').then(response => setMessages(response.data));
      axios.get('/api/users').then(response => setUsers(response.data));

      socket.on('receiveMessage', (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
      });
    }
  });

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="chat-page">
      <ChatList users={users} />
      <ChatWindow messages={messages} />
    </div>
  );
};    

export default ChatPage; 