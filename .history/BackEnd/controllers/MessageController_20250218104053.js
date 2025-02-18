import mongoose from "mongoose";
import Message from "../models/Message.js";
//Fetch all messages
export const getPreviousMessages = async (req, res) => {
    const{senderId, recipientId} = req.params;
    console.log(senderId, recipientId);
    try {
        const senderObjectId = new mongoose.Types.ObjectId.(senderId);
        const messages = await Message.find({
            $or: [
                { sender:new mongoose.Types.ObjectId (senderId), recipient:new mongoose.Types.ObjectId (recipientId) }, // Convert recipientId to ObjectId and add it to the query object},
                { sender:new mongoose.Types.ObjectId (recipientId), recipient:new mongoose.Types.ObjectId (senderId) }, // Convert senderId to ObjectId and add it to the query object
            ],
        }).sort({timeStamp: 1}); //sort by timeStamp in ascending order
        console.log(messages);
        res.json(messages);
       
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
};