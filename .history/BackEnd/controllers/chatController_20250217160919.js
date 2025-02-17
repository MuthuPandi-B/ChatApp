import Chat from '../models/Chat.js';
export const getChats = async (req, res) => {
  try {
    const chats = await Chat.find().populate('sender');
    res.json(chats);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const getChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id).populate('sender');
    res.json(chat);
  } catch (error) {
    res.status(500).send('Server error');
  }
}