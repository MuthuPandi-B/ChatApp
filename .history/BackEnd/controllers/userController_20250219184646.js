import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { sendEmail } from '../Utils/emailServices.js';
dotenv.config();

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword }); // Include email here
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    console.error('Registration failed', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    //Generate and set reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    //Send email with reset link
    const restlink = `http://localhost:5173/reset-password/${resetToken}`;
    await sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      text: `Click on the link to reset your password: ${restlink}`,
    });
    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).send('Server error');
  }

};

export const resetPassword = async (req, res) => {
  try{
    const {newPassword} = req.body;
    const decoded = jwt.verify(req.params.resetToken, process.env.JWT_SECRET);

    const user=await User.findById(decoded.id);
    if(!user){
      return res.status(404).json({message:'User not found'});
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password=hashedPassword;
    await user.save();
    res.json({message:'Password reset successful'});
  }catch(error){
    res.status(500).send('Server error');
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
}


export const getUser = async (req, res) => {  
  const token = req.headers['authorization']?.split(' ')[1];  // Get token from Authorization header
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token with the secret key

    // Fetch user data
    console.log("Decoded:", decoded.id);
    const user = await User.findById(decoded.id);
    console.log("User:", user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Exclude the password before sending the user data
    const { password, ...userData } = user.toObject();  // Convert Mongoose document to plain object

    // Send the user data
    res.json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
