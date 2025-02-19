// components/GroupChatList.js
import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../contexts/AuthContext";
import Api from "../Api/api";

const GroupChatList = ({ onSelectGroup }) => {
  const userId = localStorage.getItem("userId");
  const 

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
  }, []);
  useEffect(() => {
    ChatListRef.current.scrollTop = ChatListRef.current.scrollHeight;
  }, [groups]);
  const handleLea

  return (
    <div className="group-chat-listm bg-gray-100 h-full overflow-y-auto flex-1">
      <h3 className="text-lg font-semibold px-4 py-2 border-b border-gray-300">
        Groups
      </h3>
      <ul className="p-2">
        {groups.map((group) => (
          <li
            key={group._id}
            className="px-4 py-2 border-b cursor-pointer hover:bg-gray-200"
            onClick={() => onSelectGroup(group._id ,group.name)}
          >
            {group.name}
          </li>
        ))}
        <div ref={ChatListRef} />
      </ul>
    </div>
  );
};

export default GroupChatList;
