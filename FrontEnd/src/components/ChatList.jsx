import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChatList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/users').then((response) => setUsers(response.data));
  }, []);

  return (
    <div className="chat-list">
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
