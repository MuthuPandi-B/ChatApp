// routes/groupRoutes.js
import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import {
  createGroup,
  getGroups,
  getGroupMessages,
  addGroupMember,
  removeGroupMember,
  deleteGroup,
  leaveGroup,
  // sendGroupMessage,
} from '../controllers/groupController.js';

const router = express.Router();

// Create a new group
router.post('/create', authMiddleware, createGroup);

// Get all groups for a user
router.get('/:userId', authMiddleware, getGroups);

// Get messages for a specific group
router.get('/:groupId/messages', authMiddleware, getGroupMessages);

// // Send a message to a specific group
// router.post('/:groupId/messages', authMiddleware, sendGroupMessage);

// Add a new member to a group (only admin can do this)
router.put('/:groupId/add-member', authMiddleware, addGroupMember);

// Remove a member from a group (only admin can do this)
router.put('/:groupId/remove-member', authMiddleware, removeGroupMember);

// Delete a group (only admin can do this)
router.delete('/:groupId', authMiddleware, deleteGroup);
//Leave a group
router.delete('/:groupId/leave/:userId', authMiddleware, leaveGroup);
//Edit Group
router.put("/:groupId/edit", authMiddleware, editGroup);

export default router;
