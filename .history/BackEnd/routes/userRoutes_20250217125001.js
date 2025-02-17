import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/userController.js';
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/',authMiddlewaregetUser);
export default router;
