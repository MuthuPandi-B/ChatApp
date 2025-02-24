
import Message from '../models/Message.js'; // Assuming Message schema exists

export const sendMessage = async (req, res) => {
  const { userId, recipientId, message } = req.body;

  try {
    const newMessage = new Message({ sender: userId, recipient: recipientId, message });
    await newMessage.save();

    // Emit message to recipient
    io.to(recipientId).emit('receiveMessage', newMessage);

    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
};

export const getMessagesandUsers = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).send('Server error');
  }
};
