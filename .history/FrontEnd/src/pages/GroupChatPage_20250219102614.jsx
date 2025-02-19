// import React, { useState } from 'react';
// import GroupChatList from '../components/GroupChatList';
// import GroupChatWindow from '../components/GroupChatWindow';
// import Api from '../Api/api';
// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';

// const GroupChatPage = () => {
//   const [selectedGroup, setSelectedGroup] = useState(null);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [groupName, setGroupName] = useState('');
//   const [members, setMembers] = useState('');
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSelectGroup = (groupId) => {
//     setSelectedGroup(groupId); // Set selected group for group chat
//   };
// useEffect(() => {
//   if(showCreateModal){
//     Api.get('/api/users')
//     .then((response) => {
//       console.log(response.data);
//       setUsers(response.data);
//     })
//     .catch((error) => {
//       console.error('Error fetching users', error);
//     });
//   }
// }, [showCreateModal]);
//   const handleCreateGroup = async (e) => {
//     e.preventDefault();

//     if (!groupName || !members) {
//       setError('Please fill all fields');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const response = await Api.post(
//         'api/groups/create', // Adjust API endpoint if necessary
//         {
//           name: groupName,
//           members: members, // List of members
//         },
//         // {
//         //   headers: {
//         //     Authorization: `Bearer ${token}`,
//         //   },
//         // }
//       );

//       // On success, close modal and reset form
//       setShowCreateModal(false);
//       setGroupName('');
//       setMembers('');
//       setError('');
//       // Redirect to the new group page or update group list
//       navigate(`/group/${response.data._id}`);
//     } catch (error) {
//       console.error('Error creating group:', error);
//       setError('Error creating group, please try again later.');
//     }
//   };
//  const handleMemberSelection = (userId) => {
//   const admin=localStorage.getItem('userId');
//   if (userId === admin) {
//     return;
//   }
//   if (members.includes(userId)) {
//     setMembers(members.filter((member) => member !== userId));
//   } else {
//     setMembers([...members, userId]);
//   }
// };
//   return (
//     <div className="group-chat-page">
//       <div className="flex">
//         <div className="w-1/3">
//           <GroupChatList onSelectGroup={handleSelectGroup} />
//           <button
//             onClick={() => setShowCreateModal(true)}
//             className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
//           >
//             Create Group
//           </button>
//         </div>
//         <div className="w-2/3">
//           {selectedGroup && <GroupChatWindow selectedGroup={selectedGroup} />}
//         </div>
//       </div>

//       {/* Modal for creating a group */}
//       {showCreateModal && (
//         <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
//           <div className="modal-content bg-white p-6 rounded-lg w-1/3">
//             <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
//             <form onSubmit={handleCreateGroup}>
//               <div className="mb-4">
//                 <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">
//                   Group Name
//                 </label>
//                 <input
//                   type="text"
//                   id="groupName"
//                   value={groupName}
//                   onChange={(e) => setGroupName(e.target.value)}
//                   className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label htmlFor="members" className="block text-sm font-medium text-gray-700">
//                   Members
//                 </label>
//                <div className='mt-1'>
//                 {users
//                 .filter((user) => user._id !== localStorage.getItem('userId'))
//                 .map((user) => (
//                   <div key={user._id}>
//                     <input
//                       type="checkbox"
//                       id={`user-${user._id}`}
//                       value={user._id}
//                       checked={members.includes(user._id)}
//                       onChange={() => handleMemberSelection(user._id)}
//                     />
//                     <label htmlFor={user._id}>{user.username}</label>
//                   </div>
//                 ))}

//                </div>
//               </div>
//               {error && <p className="text-red-500 text-sm">{error}</p>}
//               <div className="flex justify-end mt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowCreateModal(false)}
//                   className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Create Group
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GroupChatPage;

import React, { useState, useEffect } from "react";
import GroupChatList from "../components/GroupChatList";
import GroupChatWindow from "../components/GroupChatWindow";
import Api from "../Api/api";
import { useNavigate } from "react-router-dom";
import { use } from "react";

const GroupChatPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleSelectGroup = (groupId) => {
    setSelectedGroup(groupId); // Set selected group for group chat
  };
  const handleBack = () => {
    setSelectedGroup(null); // Go back to chat list
  };

  useEffect(() => {
    if (showCreateModal) {
      Api.get("/api/users")
        .then((response) => {
          console.log(response.data);
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching users", error);
        });
    }
  }, [showCreateModal]);

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!groupName || !members.length) {
      setError("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await Api.post(
        "api/groups/create",
        {
          name: groupName,
          members: members, // List of members
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      // On success, close modal and reset form
      setShowCreateModal(false);
      setGroupName("");
      setMembers([]);
      setError("");
      // Redirect to the new group page or update group list
      navigate(`/group/${response.data._id}`);
    } catch (error) {
      console.error("Error creating group:", error);
      setError("Error creating group, please try again later.");
    }
  };

  const handleMemberSelection = (userId) => {
    if (members.includes(userId)) {
      setMembers(members.filter((member) => member !== userId));
    } else {
      setMembers([...members, userId]);
    }
  };

  return (
    <div className="group-chat-page flex flex-col h-full overflow-hidden">
      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Group List */}
        {!selectedGroup || windowWidth >= 768 ? (
        <div className="w-full md:w-1/3">
          <GroupChatList onSelectGroup={handleSelectGroup} />
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
          >
            Create Group
          </button>
        </div>
        ) : null}
        {/* Group Chat Window */}
        {selectedGroup && (
          <div className="w-full md:w-2/3 relative flex flex-col overflow-y-auto">
            <div className="flex items-center bg-blue-500 text-white px-4 py-2">
              {windowWidth < 768 && (
                <button className="mr-2 text-lg" onClick={handleBack}>
                  &#8592;
                </button>
              )}
              <h2 className="text-lg font-semibold">Group Chat</h2>
            </div>

      {/* Modal for creating a group */}
      {showCreateModal && (
        <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
            <form onSubmit={handleCreateGroup}>
              <div className="mb-4">
                <label
                  htmlFor="groupName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Group Name
                </label>
                <input
                  type="text"
                  id="groupName"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="members"
                  className="block text-sm font-medium text-gray-700"
                >
                  Members
                </label>
                <div className="mt-1">
                  {users
                    .filter(
                      (user) => user._id !== localStorage.getItem("userId")
                    )
                    .map((user) => (
                      <div key={user._id}>
                        <input
                          type="checkbox"
                          id={`user-${user._id}`}
                          value={user._id}
                          checked={members.includes(user._id)}
                          onChange={() => handleMemberSelection(user._id)}
                        />
                        <label htmlFor={user._id}>{user.username}</label>
                      </div>
                    ))}
                </div>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupChatPage;
