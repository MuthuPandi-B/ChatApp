import Group from "../models/Group.js";
import User from "../models/User.js";

const groupSocket = (io, socket) => {
  socket.on("joinGroup", (groupId) => {
    socket.join(groupId);
  });

  socket.on("sendGroupMessage", async ({ groupId, userId, message }) => {
    try {
      const group = await Group.findById(groupId);
      const newMessage = { sender: userId, message };
      console.log("newMessage", newMessage);

      group.messages.push(newMessage);
      await group.save();

      io.to(groupId).emit("receiveGroupMessage", newMessage);
    } catch (error) {
      console.error("Error sending group message:", error);
    }
  });
}

export default groupSocket;