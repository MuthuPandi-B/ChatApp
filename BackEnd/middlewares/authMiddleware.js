
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js'; // Import your User model
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token with the same secret key

    // Fetch the full user data using the decoded user id
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach the full user object to req.user
    req.user = user;  // Now you have full user data in req.user

    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error);  // Log the error
    res.status(401).json({ message: 'Token is not valid' });
  }
};
