import express from 'express';
import connetDB from './config/db.js';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import chatSocket from './sockets/chatSocket.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

dotenv.config();
// Connect to MongoDB
connetDB();
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true,
  }
));



// Use routes
app.use('/api/users', userRoutes);
app.use('/api/chats', chatRoutes);
app.use()

// Socket setup
io.on('connection', (socket) => {
  chatSocket(io, socket);
});

server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
