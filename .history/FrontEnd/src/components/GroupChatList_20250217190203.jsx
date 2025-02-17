// components/GroupChatList.js
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
impo

const GroupChatList = ({ onSelectGroup }) => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // Assuming this endpoint fetches groups user is a member of
    axios.get(`/api/groups/${user._id}`).then((response) => {
      setGroups(response.data);
    });
  }, [user._id]);

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
