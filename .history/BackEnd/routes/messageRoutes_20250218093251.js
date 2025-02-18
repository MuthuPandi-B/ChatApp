import express from 'express';
import { getPreviousMessages } from '../controllers/MessageController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();
router.get('/getPreviousMessages/:senderId/:recipientId', authMiddleware, getPreviousMessages);

export default router;
