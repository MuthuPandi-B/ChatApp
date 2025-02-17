import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token

  console.log('Received Token:', token);  // Log the token

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key'); // Verify the token
    req.user = decoded.user; // Attach the user data to the request
    next();
  } catch (error) {
    console.error('Error in authMiddleware:', error); // Log the error
    res.status(401).json({ message: 'Token is not valid' });
  }
};

