
import Message from '../models/Message.js';
const chatSocket = (io, socket) => {
  socket.on('sendMessage', async ({ message, userId, recipientId}) => {
    const chat = new Message({ message, sender: userId, recipient: recipientId });
    await chat.save();
    io.emit('receiveMessage', chat);
  });
};
export default chatSocket;

