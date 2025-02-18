// controllers/groupController.js
import Group from '../models/Group.js';
import User from '../models/User.js';

export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    //Ensure members is always an Array(in case it's a single member)
    const memberArray= Array.isArray(members) ? members:[members];
 
    // Ensure the user is the admin and they are part of the members
    const admin = req.user._id;
    console.log(admin)
    const group = new Group({
      name,
      members: [admin, ...membersA],
      admin,
    });
console.log(admin, members)
    await group.save();

    res.status(201).json(group);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.params.id})
      .populate('admin', 'username')
      .populate('members', 'username');

    res.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId).populate('messages.sender', 'username');

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.json(group.messages);
  } catch (error) {
    console.error('Error fetching group messages:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// export const sendGroupMessage = async (req, res) => {
//   try {
//     const group = await Group.findById(req.params.groupId);

//     if (!group) {
//       return res.status(404).json({ message: 'Group not found' });
//     }

//     const { message } = req.body;
//     const newMessage = { message, sender: req.user._id };
//     group.messages.push(newMessage);

//     await group.save();
//     res.status(201).json(newMessage);
//   } catch (error) {
//     console.error('Error sending group message:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

export const addGroupMember = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only admin can add members' });
    }

    const { memberId } = req.body;
    const member = await User.findById(memberId);

    if (!member) {
      return res.status(404).json({ message: 'User not found' });
    }

    group.members.push(memberId);
    await group.save();

    res.status(200).json(group);
  } catch (error) {
    console.error('Error adding group member:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const removeGroupMember = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only admin can remove members' });
    }

    const { memberId } = req.body;
    group.members = group.members.filter((id) => id.toString() !== memberId);

    await group.save();
    res.status(200).json(group);
  } catch (error) {
    console.error('Error removing group member:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.admin.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Only admin can delete the group' });
    }

    await group.remove();
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
