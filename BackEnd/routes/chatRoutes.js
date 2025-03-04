import express from 'express';
import {  sendMessage } from '../controllers/chatController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();
// router.get('/', authMiddleware, getChats);
// router.get('/:userId', authMiddleware, getChat);
router.post('/send',authMiddleware,sendMessage);

export default router;
