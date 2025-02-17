import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { registerUser, loginUser, getUser } from '../controllers/userController.js';
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/',authMiddlewar,getUser);
export default router;
