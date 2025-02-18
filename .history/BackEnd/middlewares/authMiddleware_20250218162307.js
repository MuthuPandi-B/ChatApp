import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token with the same secret key
    console.log("Decoded:", decoded);
    req.user = decoded.user;  // Attach the decoded user data to the request
    
    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error);  // Log the error
    res.status(401).json({ message: 'Token is not valid' });
  }
};
