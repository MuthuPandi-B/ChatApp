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


// controllers/chatController.js (for normal chat)
import io from 'socket.io';
// import User from '../models/User'; // Assuming you have User model
import Message from '../models/'; // Assuming you have a Message model

// Controller for sending messages
export const sendMessage = async (req, res) => {
  const { userId, recipientId, message } = req.body;

  try {
    const newMessage = await Message.create({ sender: userId, recipient: recipientId, message });

    // Emit message to recipient via socket
    io.to(recipientId).emit('receiveMessage', newMessage);
    
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
};
