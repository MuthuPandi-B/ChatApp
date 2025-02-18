// import Chat from '../models/Chat.js';
// const chatSocket = (io, socket) => {
//   socket.on('sendMessage', async ({ message, userId, isGroup }) => {
//     const chat = new Chat({ message, sender: userId, group: isGroup });
//     await chat.save();
//     io.emit('receiveMessage', chat);
//   });
// };
// export default chatSocket;


import Message from '../models/Message.js';
const chatSocket = (io, socket) => {
  socket.on('sendMessage', async ({ message, userId, recipientId, senderName}) => {
    const chat = new Message({ message, sender: userId, recipient: recipientId });
    await chat.save();
    io.emit('receiveMessage', chat);
  });
};
export default chatSocket;

