import Message from "../models/Message";
export Const getPreviousMessages = async (req, res) => {
    const{senderId, recipientId} = req.pa;
    try {