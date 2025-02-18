import Group from "../models/Group";
import User from "../models/User";

const getGroupChats = async (groupId) => {
  try {
    const group = await Group.findById(groupId).;
    return group;
  } catch (error) {
    console.error("Error getting group chats:", error);
    return null;
  }
}
