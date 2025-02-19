// components/GroupChatList.js
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import AuthContext from "../contexts/AuthContext";
import Api from "../Api/api";

const GroupChatList = ({ onSelectGroup,OnEditGroup }) => {
  const userId = localStorage.getItem("userId");


  const [groups, setGroups] = useState([]);
  const ChatListRef = useRef(null);

  useEffect(() => {
    // Assuming this endpoint fetches groups user is a member of
    Api.get(`/api/groups/${userId}`)
      .then((response) => {
        setGroups(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching groups:", error);
      });
  }, [userId]);
  useLaEffect(() => {
    ChatListRef.current.scrollTop = ChatListRef.current.scrollHeight;
  }, [groups]);
  const handleLeaveGroup = (groupId) => {
    Api.delete(`/api/groups/${groupId}/leave/${userId}`)
      .then((response) => {
        setGroups((prevGroups) => prevGroups.filter((group) => group._id !== groupId));
      })
      .catch((error) => {
        console.error("Error leaving group:", error);
        alert("Failed to leave group, please try again");
      });
  }
console.log(groups)


 return (
    <div className="group-chat-list bg-gray-100 h-full overflow-y-auto flex-1 ref={ChatListRef}>">
      <h3 className="text-lg font-semibold px-4 py-2 border-b border-gray-300">
        Groups
      </h3>
      <ul className="p-2">
        {groups.map((group) => (
          <li
            key={group._id}
            className="px-4 py-2 border-b flex justify-between items-center hover:bg-gray-200"
          >
            <div
            role="button"
            tabIndex={0}
            aria-label="Select Group ${group.name}"
              className="cursor-pointer"
              onClick={() => onSelectGroup(group._id, group.name)}
            >
              {group.name}
            </div>
            <div className="flex space-x-2">
              {/* Leave Button */}
              <button
                onClick={() => handleLeaveGroup(group._id)}
                className="bg-red-500 text-white px-2 py-1 rounded text-sm"
              >
                Leave
              </button>
  
              {/* Edit Button - Only for Admin */}
              {group?.admin?._id === userId && (
                <button
                  onClick={() => OnEditGroup(group)}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                >
                  Edit
                </button>
              )}
            </div>
          </li>
        ))}
    
      </ul>
    </div>
  );
  
};

export default GroupChatList;
