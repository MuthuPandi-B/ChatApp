import mongoose from "mongoose";
import Message from "../models/Message.js";
//Fetch all messages
export const getPreviousMessages = async (req, res) => {
    const{senderId, recipientId} = req.params;
    // console.log(senderId, recipientId);
    try {
        const senderObjectId = new mongoose.Types.ObjectId(senderId); //convert string to objectId
        const recipientObjectId = new mongoose.Types.ObjectId(recipientId); //convert string to objectId
        const messages = await Message.find({
            $or: [
                { sender:senderObjectId, recipient:recipientObjectId },
                { sender:recipientObjectId, recipient:senderObjectId }, 
            ],
        }).sort({timeStamp: 1}); //sort by timeStamp in ascending order
        // console.log(messages);
        res.json(messages);
       
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
};