import Message from "../models/Message";
//f
export Const getPreviousMessages = async (req, res) => {
    const{senderId, recipientId} = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: recipientId },
                { sender: recipientId, receiver: senderId },
            ],
        }).sort('createdAt');
        res.json(messages);
    }