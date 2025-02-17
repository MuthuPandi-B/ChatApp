import Chat from '../models/Chat.js';
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().populate('sender');
    res.json(chats);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export 