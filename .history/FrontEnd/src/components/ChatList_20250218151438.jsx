
import React, { useState, useEffect,useRef } from 'react';
import Api from '../Api/api';
import { useContext } from 'react';

const ChatList = ({ onSelectChat }) => {
  const useCo
  const [users, setUsers] = useState([]);
  const chatListRef = useRef(null);

  useEffect(() => {
    Api.get('/api/users')
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users', error);
      });
  }, []);

  useEffect(() => {
    chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  }, [users]);

  return (
    <div className="chat-list bg-gray-100 h-full overflow-y-auto flex-1">
      <h3 className="text-lg font-semibold px-4 py-2 border-b border-gray-300">Users</h3>
      <ul className="p-2">
        {users.map((user) => (
          <li
            key={user._id}
            className="px-4 py-2 border-b cursor-pointer hover:bg-gray-200"
            onClick={() => onSelectChat(user._id, user.username)}
          >
            {user.username}
          </li>
        ))}
        <div ref={chatListRef}/>
      </ul>
    </div>
  );
};

export default ChatList;



