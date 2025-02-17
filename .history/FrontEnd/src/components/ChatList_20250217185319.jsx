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
// components/ChatList.js
import React, { useState, useEffect, useContext } from 'react';

import AuthContext from '../contexts/AuthContext';
import API from '../Api/api';

const ChatList = ({ onSelectChat }) => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user) {
      
    consol
    API.get('/api/users',
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    .then((response) => {
      setUsers(response.data); // Using your existing user fetching logic
    })
    .catch((error) => {
      console.error('Error fetching users', error);
    });
  }
  
  }, [user]);

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


