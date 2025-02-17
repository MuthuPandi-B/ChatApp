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
// import React, { useEffect, useState } from "react";
// import Api from "../Api/api";

// const ChatList = ({ onUserSelect, selectedUser }) => {
//   const [users, setUsers] = useState([]);

//   // Fetch users when the component mounts
//   useEffect(() => {
//     Api.get("/api/users")
//       .then((response) => {
//         setUsers(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching users", error);
//       });
//   }, []);

//   return (
//     <div>
//       <h3 className="p-4 text-lg font-semibold bg-gray-50">Users</h3>
//       <ul>
//         {users.map((user) => (
//           <li
//             key={user._id}
//             className={`p-3 hover:bg-gray-100 cursor-pointer ${
//               selectedUser?._id === user._id ? "bg-blue-50" : ""
//             }`}
//             onClick={() => onUserSelect(user)}
//           >
//             {user.username}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ChatList;
