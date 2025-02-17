import express from 'express';
import { getChat, getChats } from '../controllers/chatController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.get('/', authMiddleware, getChats);
router.get('/:userId', authMiddleware, getChat);

export default router;
