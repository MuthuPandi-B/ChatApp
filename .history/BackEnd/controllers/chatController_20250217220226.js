// import Chat from '../models/Chat.js';
// export const getChats = async (req, res) => {
//   try {
//     const chats = await Chat.find().populate('sender');
//     res.json(chats);
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// };

// export const getChat = async (req, res) => {
//   try {
//     const messages = await Chat.find({
//       $or: [
//         { sender: req.user._id, receiver: req.params.userId },
//         { sender: req.params.userId, receiver: req.user._id },
//       ],
//     }).sort('createdAt');
//     res.json(messages);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching messages' });
//   }
// };

// export const sendMessage = async (req, res) => {
//   try {
//     const { receiverId, text } = req.body;
//     const newMessage = new Chat({
//       sender: req.user._id,
//       receiver: receiverId,
//       message: text,
//     });
//     await newMessage.save();
//     console.log("newMessage",newMessage)
//     res.json(newMessage);
//   } catch (error) {
//     res.status(500).json({ message: 'Error sending message' });
//   }
// };  

// controllers/chatController.js
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

export const 
