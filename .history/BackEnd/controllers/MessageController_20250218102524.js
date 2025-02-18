import mongoose from "mongoose";
import Message from "../models/Message.js";
//Fetch all messages
export const getPreviousMessages = async (req, res) => {
    const{senderId, recipientId} = req.params;
    console.log(senderId, recipientId);
    try {
        const messages = await Message.find({
            $or: [
                { sender:mongoose.Types.ObjectId senderId, receiver: recipientId },
                { sender: recipientId, receiver: senderId },
            ],
        }).sort({timeStamp: 1}); //sort by timeStamp in ascending order
        console.log(messages);
        res.json(messages);
       
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
};