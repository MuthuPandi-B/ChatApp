// import React, { useEffect, useState } from 'react';

// import Api from '../Api/api';

// const ChatList = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     Api.get('/api/users').then((response) => {
//       console.log(response.data);
//       setUsers(response.data );
//     })
//     .catch ((error) => {
//       console.error('Error fetching users', error);
//     });
//   }, []);

//   return (
//     <div className="chat-list">
//       <h3>Users</h3>
//       <ul>
//         {users.map((user) => (
//           <li key={user._id}>{user.username}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ChatList;
// components/ChatList.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext';
import Api from '../Api/api';

const ChatList = ({ onSelectChat }) => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all users for normal chat
    Api.get('/api/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className="chat-list">
      <h3>Users</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id} onClick={() => onSelectChat(user._id)}>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;

