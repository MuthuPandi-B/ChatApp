import React, { useEffect, useState } from 'react';

import Api from '../Api/';

const ChatList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    Api.get('/api/users').then((response) => setUsers(response.data));
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
