// controllers/groupChatController.js
import Group from '../models/Group'; // Assuming Group schema exists

export const sendGroupMessage = async (req, res) => {
  const { groupId, userId, message } = req.body;

  try {
    const group = await Group.findById(groupId);
    const newMessage = { sender: userId, message };

    group.messages.push(newMessage);
    await group.save();

    // Emit group message to all members
    io.to(groupId).emit('receiveGroupMessage', newMessage);

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error sending group message' });
  }
};
