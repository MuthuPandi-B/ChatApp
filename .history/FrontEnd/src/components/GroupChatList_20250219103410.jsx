// components/GroupChatList.js
import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../contexts/AuthContext";
import Api from "../Api/api";

const GroupChatList = ({ onSelectGroup }) => {
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
  }, []);
  useEffect(() => {
    ChatListRef.current.scrollTop = ChatListRef.current.scrollHeight;
  },[groups]);

  return (
    <div className="group-chat-list">
      <h3>Groups</h3>
      <ul>
        {groups.map((group) => (
          <li key={group._id} onClick={() => onSelectGroup(group._id)}>
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupChatList;
