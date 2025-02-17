import express from 'express';
import { getChats } from '../controllers/chatController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';
const router = express.Router();
router.get('/', authMiddleware, getChats);
router.get('/:user')

export default router;
