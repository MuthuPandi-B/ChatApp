import React, { useState } from 'react';
import GroupChatList from '../components/GroupChatList';
import GroupChatWindow from '../components/GroupChatWindow';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GroupChatPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSelectGroup = (groupId) => {
    setSelectedGroup(groupId); // Set selected group for group chat
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!groupName || !members) {
      setError('Please fill all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/groups/create', // Adjust API endpoint if necessary
        {
          name: groupName,
          members: members.split(',').map((member) => member.trim()), // List of member IDs (separated by commas)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // On success, close modal and reset form
      setShowCreateModal(false);
      setGroupName('');
      setMembers('');
      setError('');
      // Redirect to the new group page or update group list
      navigate(`/group/${response.data._id}`);
    } catch (error) {
      console.error('Error creating group:', error);
      setError('Error creating group, please try again later.');
    }
  };

  return (
    <div className="group-chat-page">
      <div className="flex">
        <div className="w-1/3">
          <GroupChatList onSelectGroup={handleSelectGroup} />
          <button
            onClick={() => setShowCreateModal(true)}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
          >
            Create Group
          </button>
        </div>
        <div className="w-2/3">
          {selectedGroup && <GroupChatWindow selectedGroup={selectedGroup} />}
        </div>
      </div>

      {/* Modal for creating a group */}
      {showCreateModal && (
        <div className="modal fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="modal-content bg-white p-6 rounded-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Create New Group</h2>
            <form onSubmit={handleCreateGroup}>
              <div className="mb-4">
                <label htmlFor="groupName" className="block text-sm font-medium text-gray-700">
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
                <label htmlFor="members" className="block text-sm font-medium text-gray-700">
                  Members (Comma separated User IDs)
                </label>
                <input
                  type="text"
                  id="members"
                  value={members}
                  onChange={(e) => setMembers(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
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
