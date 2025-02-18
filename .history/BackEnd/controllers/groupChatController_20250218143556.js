import Group from "../models/Group";
import User from "../models/User";

const getGroupChats = async (req, res) => {
  try {
    const groups = await Group.find({ members: req.user._id }).populate({
      path: "members",
      model: User,
      select: "username email",