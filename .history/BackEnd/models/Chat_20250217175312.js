// import mongoose from 'mongoose';
// const chatSchema = new mongoose.Schema({
//   message: { type: String, required: true },
//   sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   timestamp: { type: Date, default: Date.now },
//   group: { type: Boolean, default: false },
// });
// export default mongoose.model('Chat', chatSchema);
// models/Message.js
import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', MessageSchema);

export default Message;
