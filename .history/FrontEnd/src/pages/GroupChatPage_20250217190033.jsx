// components/GroupChatPage.js
import React, { useState } from 'react';
import GroupChatList from '../components/GroupChatList';
import GroupChatWindow from './GroupChatWindow';

const GroupChatPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleSelectGroup = (groupId) => {
    setSelectedGroup(groupId); // Set selected group for group chat
  };

  return (
    <div className="group-chat-page">
      <div className="flex">
        <div className="w-1/3">
          <GroupChatList onSelectGroup={handleSelectGroup} />
        </div>
        <div className="w-2/3">
          {selectedGroup && <GroupChatWindow selectedGroup={selectedGroup} />}
        </div>
      </div>
    </div>
  );
};

export default GroupChatPage;
