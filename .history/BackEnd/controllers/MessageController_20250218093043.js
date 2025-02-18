import Message from "../models/Message";
//Fetch all messages
export Const getPreviousMessages = async (req, res) => {
    const{senderId, recipientId} = req.params;
    try {
        const messages = await Message.find({
            $or: [
                { sender: senderId, receiver: recipientId },
                { sender: recipientId, receiver: senderId },
            ],
        }).sort({timeStamp: 1}); //sort by timeStamp in ascending order
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching messages' });
    }
};