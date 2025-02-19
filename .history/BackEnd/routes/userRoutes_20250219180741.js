import express, { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { registerUser, loginUser,  getAllUsers, getUser } from '../controllers/userController.js';
const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me/:id',authMiddleware,getUser)
router.get('/',authMiddleware,getAllUsers);
router.
export default router;
