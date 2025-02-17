import { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import Api from '../Api';

const useChat = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = io('http://localhost:3000');

  useEffect(() => {
    // Fetch initial chat history
    const fetchChatHistory = async () => {
      try {
        const response = await Api.get('/api/chats', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history', error);
      }
    };

    fetchChatHistory();

    // Socket event listeners
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const sendMessage = (isGroup = false) => {
    if (newMessage.trim() === '') return;

    socket.emit('sendMessage', {
      message: newMessage,
      userId: user._id,
      isGroup,
    });

    setNewMessage('');
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    sendMessage,
  };
};

export default useChat;
